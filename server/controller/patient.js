var client = require("../model");
var moment = require("moment");
const {sql} = require('@databases/pg');
const createConnectionPool = require('@databases/pg');

const db = createConnectionPool(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_DATABASE}`,
); 

//
exports.old_add_Corna_Status = (req, res, next) => {
  const { confirmed, recovered, deceased, quarantined, user } = req.body;
  var district = req.body.district;

  client.query(
    `select id FROM districts where name = '${district}'`,
    (err, rows, fields) => {
      if (rows.rowCount > 0) {
        district = rows.rows[0].id;
        client.query(
          `select EXISTS (select districts_id FROM cov_patient_details where districts_id = ${district})`,
          (err, rows, fields) => {
            if (rows.rows[0].exists) {
              client.query(
                ` 
                  UPDATE public.cov_patient_details
                  SET  districts_id=${district}, confirmed=${confirmed}, recovered=${recovered}, deceased=${deceased}, quarantined=${quarantined},  user_id=${user} 
                  WHERE districts_id=${district}`,
                (err, rows, fields) => {
                  if (err) {
                    res.status(500).json({
                      message: "Status not Updated !!",
                      error: err,
                    });
                  } else {
                    // res.status(200).json({
                    //     message: 'New Status Updated...',
                    //     error:false
                    // });
                    // var result =[];
                    // var query=client.query(`
                    // select sum(confirmed)as confirmed,sum(recovered)as recovered, sum(active)as active , sum(deceased)as deceased, sum(quarantined)as quarantined , sum(isolated)as isolated  from cov_patient_details `);
                    // query.on('row', function(row){
                    //     result.push(row);
                    // });
                    // query.on('end', function(){
                    //     return res.json(result);
                    // });
                    client.query(
                      `INSERT INTO public.cov_patient_details_update_log(
                        user_id, districts_id, confirmed, recovered, deceased, quarantined)
                        VALUES (${user},${district}, ${confirmed}, ${recovered}, ${deceased}, ${quarantined})`,
                      (err) => {
                        if (err) {
                          res.status(500).json({
                            message: "Status not Updated !!",
                            error: err,
                          });
                        } else {
                          var result = [];
                          var query = client.query(` 
                            select sum(confirmed)as confirmed,sum(recovered)as recovered, sum(active)as active , sum(deceased)as deceased, sum(quarantined)as quarantined , sum(isolated)as isolated  from cov_patient_details `);
                          query.on("row", function (row) {
                            result.push(row);
                          });
                          query.on("end", function () {
                            return res.json(result);
                          });
                          // res.status(201).json({
                          //     message: 'New Status Updated...',
                          //     error:false
                          // });
                        }
                      }
                    );
                  }
                }
              );
            } else {
              client.query(
                ` 
                    INSERT INTO public.cov_patient_details(
                        districts_id, confirmed, recovered, deceased, quarantined, user_id)
                        VALUES (${district}, ${confirmed}, ${recovered}, ${deceased}, ${quarantined}, ${user})`,
                (err, rows, fields) => {
                  if (err) {
                    res.status(500).json({
                      message: "Status not Updated !!",
                      error: err,
                    });
                  } else {
                    client.query(
                      `INSERT INTO public.cov_patient_details_update_log(
                        user_id, districts_id, confirmed, recovered, deceased, quarantined)
                        VALUES (${user},${district}, ${confirmed}, ${recovered}, ${deceased}, ${quarantined})`,
                      (err) => {
                        if (err) {
                          res.status(500).json({
                            message: "Status not Updated !!",
                            error: err,
                          });
                        } else {
                          res.status(201).json({
                            message: "New Status Updated...",
                            error: false,
                          });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

// update districts details by date if districtsand date data EXISTS before.
exports.add_Corna_Status_update_if_exits = (req, res, next) => {
  const {
    user,
    confirmed,
    recovered,
    deceased,
    quarantined,
    screened,
    suspected,
    sampleCollected,
    negative,
    resultAwaited,
    isolation,
  } = req.body;
  var date = moment(req.body.date).format("YYYY-MM-DD");
  var district = req.body.district;
  client.query(
    `select id FROM districts where name = '${district}'`,
    (err, rows, fields) => {
      if (rows.rowCount > 0) {
        district = rows.rows[0].id;
        // check is date wise update of the district is avalable or not
        client.query(
          `select EXISTS (select districts_id FROM cov_patient_details where districts_id = ${district} and date ='${date}')`,
          (err, rows, fields) => {
            if (rows.rows[0].exists) {
              // collect all the privious data
              client.query(
                `select id,confirmed, recovered, deceased, quarantined, isolated, 
                    citizenscreened, suspected, samplecollected, negative, resultawaited FROM cov_patient_details where districts_id =${district} 
                    and date ='${date}' and date >'01-04-2020'`,
                (err, rows, fields) => {
                  if (err) {
                    res.status(500).json({
                      message: "Status not Updated !!",
                      error: err,
                    });
                  } else {
                    // update all data
                    var tempconfirmed =
                      rows.rows[0].confirmed + Number(confirmed);
                    var temprecovered =
                      rows.rows[0].recovered + Number(recovered);
                    var tempdeceased = rows.rows[0].deceased + Number(deceased);
                    var tempquarantined =
                      rows.rows[0].quarantined + Number(quarantined);
                    var tempscreened =
                      rows.rows[0].citizenscreened + Number(screened);
                    var tempsuspected =
                      rows.rows[0].suspected + Number(suspected);
                    var tempsampleCollected =
                      rows.rows[0].samplecollected + Number(sampleCollected);
                    var tempnegative = rows.rows[0].negative;
                    var tempresultAwaited =
                      rows.rows[0].resultawaited + Number(resultAwaited);
                    var tempisolation =
                      rows.rows[0].isolated + Number(isolation);
                    client.query(
                      `UPDATE public.cov_patient_details
                            SET confirmed = ${tempconfirmed}, recovered = ${temprecovered}, deceased = ${tempdeceased}, quarantined = ${tempquarantined}, 
                            isolated = ${tempisolation}, citizenscreened = ${tempscreened}, suspected = ${tempsuspected}, samplecollected = ${tempsampleCollected}, 
                            negative = ${tempnegative}, resultawaited = ${tempresultAwaited}
                            WHERE id=${rows.rows[0].id}`,
                      (err, rows, fields) => {
                        if (err) {
                          res.status(500).json({
                            message: "Status not Updated !!",
                            error: err,
                          });
                        } else {
                          client.query(
                            `INSERT INTO public.cov_patient_details_update_log(
                              user_id, districts_id, confirmed, recovered, deceased, isolated, 
                              quarantined, citizenscreened, suspected, samplecollected, negative, resultawaited )
                              VALUES ( ${user}, ${district}, ${confirmed}, ${recovered}, ${deceased},  
                                  ${isolation}, ${quarantined}, ${screened}, ${suspected},
                                  ${sampleCollected}, ${negative}, ${resultAwaited})`,
                            (err) => {
                              if (err) {
                                res.status(500).json({
                                  message: "Status not Updated !!",
                                  error: err,
                                });
                              } else {
                                res.status(201).json({
                                  message: "New Status Updated...",
                                  error: false,
                                  susses: true,
                                });
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            } else {
              client.query(
                ` 
                  INSERT INTO public.cov_patient_details(
                  districts_id, confirmed, recovered, deceased, quarantined, isolated, 
                  citizenscreened, suspected, samplecollected, negative, resultawaited, 
                  date, user_id)
                  VALUES (${district}, ${confirmed}, ${recovered}, ${deceased}, ${quarantined}, 
                          ${isolation}, ${screened}, ${suspected},
                            ${sampleCollected}, ${negative}, ${resultAwaited}, '${date}', ${user})`,
                (err, rows, fields) => {
                  if (err) {
                    res.status(500).json({
                      message: "Status not Updated !!",
                      error: err,
                    });
                  } else {
                    client.query(
                      `INSERT INTO public.cov_patient_details_update_log(
                        user_id, districts_id, confirmed, recovered, deceased, isolated, 
                        quarantined, citizenscreened, suspected, samplecollected, negative, resultawaited )
                        VALUES ( ${user}, ${district}, ${confirmed}, ${recovered}, ${deceased},  
                            ${isolation}, ${quarantined}, ${screened}, ${suspected},
                            ${sampleCollected}, ${negative}, ${resultAwaited})`,
                      (err) => {
                        if (err) {
                          res.status(500).json({
                            message: "Status not Updated !!",
                            error: err,
                          });
                        } else {
                          res.status(201).json({
                            message: "New Status Updated...",
                            error: false,
                            susses: true,
                          });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      } else {
        res.status(500).json({
          message: "Internal Server error !!",
          error: err,
        });
      }
    }
  );
};

exports.add_Corna_Status = (req, res, next) => {
  const {
    // user,
    // confirmed,
    // recovered,
    // active,
    // deceased,
    // quarantined,
    // screened,
    // suspected,
    // sampleCollected,
    // negative,
    // resultAwaited,
    // isolation,
    active,
    // date,
    checkGateTested,
    healthFacilitiesTested,
    testedToday,
    testedTillDate,
    testedNegativeToday,
    testedPositiveToday,
    positive,
    curd,
    curdTillDate,
    death,
    deathTillDate,
    dch,
    dchBed,
    dchAdmitted,
    dchIcu,
    dchIcuOccupied,
    dchO2bed,
    dchO2bedOccupied,
    dchNonO2beds,
    dchNonO2bedsOccupied,
    dchc,
    dchcBed,
    dchcAdmitted,
    dchcIcuBed,
    dchcIcuBedOccupied,
    dchcO2Bed,
    dchcO2bedOccupied,
    dchcNonO2Bed,
    dchcNonO2BedOccupied,
    ccc,
    cccBed,
    cccAdmitted,
    cccO2Bed,
    cccO2bedOccupied,
    cccNonO2Bed,
    cccNonO2BedOccupied,
    homeIsolation,
    // flwsFistDoseRicived,
    // flwsFulyInoculated,
    // hcwsFistDoseRicived,
    // hcwsFullyInoculated,
    // fistDoseReceivedaboub45year,
    // fullyInoculatedAboub45year,
    // fistDoseReceived18and45,
    // fullyInoculated18and45,
    // registorForVaccination,
    totalFastDoseRecived,
    totalFullyIncolated,
    violations_reported_today,
    cumulative_violations_reported,
    fine_imposed_today,
    cumulative_fine_imposed,
    key,
    query,
  } = req.body;

  const date = moment(req.body.date).format("YYYY-MM-DD");
  client.query(
    `INSERT INTO public.daily_report(check_gate_tested, health_facilities_tested, tested, tested_negative, tested_positive, 
    cured, death, district_id, cumulative_positive, cumulative_cured, active_case, 
    cumulative_deaths, covid_hospitals, covid_hospital_beds, covid_hospital_admitted, covid_hospital_icu_beds, 
    covid_hospitals_icu_bed_occupied, covid_hospital_o2_beds, covid_hospital_o2_bed_occupied, 
    covid_hospital_non_o2_beds, covid_hospital_non_o2_bed_occupied, dchc, dchc_beds, dchc_admitted, dchc_icu_beds, 
    dchc_icu_beds_occupied, dchc_o2_beds, dchc_o2_occupied, dchc_non_o2_beds, dchc_non_o2_beds_occupied, 
    ccc, ccc_beds, ccc_admitted, home_isolation,
    total_received_1st_dose, total_fully_inoculated, date, ccc_o2_beds, ccc_o2_occupied, ccc_non_o2_beds, ccc_non_o2_occupied,cumulative_tested,violations_reported_today, cumulative_violations_reported, fine_imposed_today, cumulative_fine_imposed)
    VALUES(${checkGateTested},${healthFacilitiesTested},${testedToday},${testedNegativeToday},${testedPositiveToday},${curd},${death},${query},${positive},${curdTillDate},${active},${deathTillDate},${dch},${dchBed},${dchAdmitted},${dchIcu},${dchIcuOccupied},${dchO2bed},${dchO2bedOccupied},${dchNonO2beds},${dchNonO2bedsOccupied},${dchc},${dchcBed},${dchcAdmitted},${dchcIcuBed},${dchcIcuBedOccupied},${dchcO2Bed},${dchcO2bedOccupied},${dchcNonO2Bed},${dchcNonO2BedOccupied},${ccc},${cccBed},${cccAdmitted},${homeIsolation},${totalFastDoseRecived},${totalFullyIncolated},'${date}',${cccO2Bed},${cccO2bedOccupied},${cccNonO2Bed},${cccNonO2BedOccupied} ,${testedTillDate} ,${violations_reported_today},${cumulative_violations_reported},${fine_imposed_today},${cumulative_fine_imposed})`,
    (err, rows, fields) => {
      if (err) {
        res.status(500).json({
          message: "Status not Updated !!",
          error: err,
        });
      } else {
        res.status(201).json({
          message: "New Record inserted successfully",
          error: false,
          success: true,
        });
      }
    }
  );
};

//
exports.corna_Analysis_Status = async (req, res, next) => {
  var result = [];
  district_id = req.query.q;
  const dateresult = await db.query(
    sql`
      SELECT TO_CHAR(date::DATE, 'yyyy-mm-dd')AS date from daily_report WHERE district_id= ${district_id} ORDER BY date DESC limit 1
    `, 
  );
  const date = dateresult[0].date;
  
  // console.log(`SELECT tested as tested_today,tested_positive as positive_today,cured as cured_today,death as death_today,active_case as active_today,tested_negative as negative_today from daily_report WHERE verified=true and district_id= ${district_id} and date= ${date}`);

  const oneDayChangeData = await db.query(
    sql`
      SELECT tested as tested_today,tested_positive as positive_today,cured as cured_today,death as death_today,active_case as active_today,tested_negative as negative_today,
      check_gate_tested, health_facilities_tested, tested, 
      tested_negative, tested_positive, cured, death, district_id, 
      verified, cumulative_positive, cumulative_cured, active_case,
      cumulative_deaths, covid_hospitals, covid_hospital_beds, 
      covid_hospital_admitted, covid_hospital_icu_beds, 
      covid_hospitals_icu_bed_occupied, covid_hospital_o2_beds, 
      covid_hospital_o2_bed_occupied, covid_hospital_non_o2_beds, 
      covid_hospital_non_o2_bed_occupied, dchc, dchc_beds, dchc_admitted,
      dchc_icu_beds, dchc_icu_beds_occupied, dchc_o2_beds, dchc_o2_occupied,
      dchc_non_o2_beds, dchc_non_o2_beds_occupied, ccc, 
      ccc_beds, ccc_admitted, home_isolation, flw_1st_dose_received,
      flw_fully_inoculated, hcw_1st_dose_received, hcw_fully_inoculated, 
      "45years_fully_inoculated" as received_vaccination_45years, "45years_1st_dose_received" as fully_inoculated_45years, 
      "18_to_44years_received_1st_dose" as received_1st_dose_18_to_44years, "18_to_44years_fully_inoculated" as fully_inoculated_18_to_44years, 
      total_registered_for_vaccination, total_received_1st_dose, 
      total_fully_inoculated, create_at, date, ccc_o2_beds, 
      ccc_o2_occupied, ccc_non_o2_beds, ccc_non_o2_occupied, 
      cumulative_tested, violations_reported_today, 
      cumulative_violations_reported, fine_imposed_today, 
      cumulative_fine_imposed,cumulative_tested
      from daily_report WHERE district_id= ${district_id} and date= ${date}
    `, 
  );

  var query =
    client.query(`select sum(check_gate_tested)as check_gate_tested, sum(health_facilities_tested) as health_facilities_tested, sum(tested) as tested, 
    sum(tested_negative) as tested_negative, sum(tested_positive) as tested_positive, 
    sum(cured) as cured, sum(death) as death, sum(cumulative_positive)as cumulative_positive, sum(cumulative_cured) as cumulative_cured, 
    sum(active_case) as active, sum(cumulative_deaths) as cumulative_deaths,sum(covid_hospitals) as covid_hospitals, 
    sum(covid_hospital_beds) as covid_hospital_beds, sum(covid_hospital_admitted) as covid_hospital_admitted, sum(covid_hospital_icu_beds) as covid_hospital_icu_beds, 
    sum (covid_hospitals_icu_bed_occupied) as covid_hospitals_icu_bed_occupied, sum(covid_hospital_o2_beds) as covid_hospital_o2_beds, 
    sum(covid_hospital_o2_bed_occupied) as covid_hospital_o2_bed_occupied, sum(covid_hospital_non_o2_beds) as covid_hospital_non_o2_beds, sum(covid_hospital_non_o2_bed_occupied) as covid_hospital_non_o2_bed_occupied,
    sum(dchc)as dchc, sum(dchc_beds) as dchc_beds, sum(dchc_admitted) as dchc_admitted, sum(dchc_icu_beds) as dchc_icu_beds, 
    sum(dchc_icu_beds_occupied) as dchc_icu_beds_occupied, sum(dchc_o2_beds) as dchc_o2_beds, sum(dchc_o2_occupied) as dchc_o2_occupied,
    sum(dchc_non_o2_beds) as dchc_non_o2_beds, sum(dchc_non_o2_beds_occupied) as dchc_non_o2_beds_occupied, 
    sum(ccc) as ccc, sum(ccc_beds) as ccc_beds, sum(ccc_admitted) as ccc_admitted, sum(home_isolation) as home_isolation, 
    sum(flw_1st_dose_received) as flw_1st_dose_received, sum(flw_fully_inoculated) as flw_fully_inoculated, 
    sum(hcw_1st_dose_received) as hcw_1st_dose_received, sum(hcw_fully_inoculated) as hcw_fully_inoculated,
    sum("45years_fully_inoculated") as "fully_inoculated_45years" , sum("45years_1st_dose_received") as "received_vaccination_45years", 
    sum("18_to_44years_received_1st_dose") as "received_1st_dose_18_to_44years",sum("18_to_44years_fully_inoculated") as "fully_inoculated_18_to_44years",
    sum(total_registered_for_vaccination) as total_registered_for_vaccination,sum(total_received_1st_dose) as total_received_1st_dose,
    sum(ccc_o2_beds) as ccc_o2_beds,sum(ccc_o2_occupied) as ccc_o2_occupied, sum(ccc_non_o2_beds) as ccc_non_o2_beds, sum(ccc_non_o2_occupied) as ccc_non_o2_occupied,
    sum(total_fully_inoculated) as total_fully_inoculated,sum(violations_reported_today)as violations_reported_today, sum(cumulative_violations_reported) as cumulative_violations_reported, sum(fine_imposed_today) as fine_imposed_today, sum(cumulative_fine_imposed) as cumulative_fine_imposed from daily_report where district_id= ${district_id}`);
  query.on("row", function (row) {
    result.push(row);
  });

  query.on("end", function () {
    result.push(oneDayChangeData[0]);
    return res.json(result);
  });
};

//
exports.corna_Analysis_Status_Districts = (req, res, next) => {
  var result = [];
  var totalSampleCollected = 0,
    totalNegative = 0,
    totalConfirmed = 0,
    totalActive = 0;
  var query = client.query(` 
    select sum(confirmed)as confirmed,sum(recovered)as recovered, sum(active)as active , sum(deceased)as deceased, sum(quarantined)as quarantined , sum(isolated)as isolated,
    sum(negative)as negative,sum(samplecollected) as samplecollected, (districts.name)as district  from cov_patient_details join districts on  districts.id= cov_patient_details.districts_id group by districts.name order by districts.name
 `);
  query.on("row", function (row) {
    totalConfirmed = Number(row.confirmed) + totalConfirmed;
    totalNegative = Number(row.negative) + totalNegative;
    totalSampleCollected = Number(row.samplecollected) + totalSampleCollected;
    totalActive = Number(row.active) + totalActive;
    result.push(row);
  });

  query.on("end", function () {
    var obj = {
      district: "Total",
      confirmed: totalConfirmed,
      negative: totalNegative,
      samplecollected: totalSampleCollected,
      active: totalActive,
    };
    result.push(obj);
    return res.json(result);
  });
};

//
exports.update_log = (req, res, next) => {
  const { confirmed, recovered, deceased, quarantined, district, user } =
    req.body;

  client.query(
    `INSERT INTO public.cov_patient_details_update_log(
            user_id, districts_id, confirmed, recovered, deceased, quarantined)
            VALUES (${user},${district}, ${confirmed}, ${recovered}, ${deceased}, ${quarantined})`,
    (err) => {
      if (err) {
        res.status(500).json({
          message: "Status not Updated !!",
          error: err,
        });
      } else {
        res.status(201).json({
          message: "New Status Updated...",
          error: false,
        });
      }
    }
  );
};

//
exports.lastUpdated = (req, res, next) => {
  var result = [];
  var query = client.query(
    // `SELECT (create_at)as lastUpdated 
    // FROM daily_report 
    // ORDER BY id DESC 
    // LIMIT 1`
    `
      SELECT TO_CHAR(date ::DATE, 'yyyy-mm-dd')AS latestDataVerificationDate, (modified) as lastUpdated from daily_report WHERE verified = true ORDER BY date DESC limit 1
    `
  );
  query.on("row", function (row) {
    console.log(row);
    result.push(row.lastupdated = moment(row.lastupdated).format("YYYY-MM-DD HH:mm:ss"));
    result.push(row.latestdataverificationdate);
  });

  query.on("end", function () {
    return res.json(result);
  });
};

exports.corna_Analysis_Status_Districts_Report = (req, res, next) => {
  var result = [];
  var date = req.params.date;
  var district = req.params.district;
  if (date != "null") {
    date = `'` + date + `'`;
  }
  var query = client.query(` 
    select date ,sum(confirmed)as confirmed,sum(recovered)as recovered, sum(deceased)as deceased, sum(quarantined)as quarantined , sum(isolated)as isolated,
    sum(negative)as negative,sum(samplecollected) as samplecollected, 
	sum(citizenscreened)as citizenscreened, sum(suspected)as suspected,sum(resultawaited)as resultawaited,(districts.name)as district  from cov_patient_details join districts on  districts.id= cov_patient_details.districts_id 
	where (${date} is null or date= ${date}) and
		('${district}' = 'null' or districts.name= '${district}')
	group by districts.name ,date order by districts.name,date
 `);
  query.on("row", function (row) {
    row.date = moment(row.date).format("YYYY-MM-DD");
    result.push(row);
  });

  query.on("end", function () {
    return res.json(result);
  });
};
