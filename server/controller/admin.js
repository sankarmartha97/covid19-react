var client = require("../model");
// const jwt = require("jsonwebtoken");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const moment = require("moment");
// const { v4: uuid4 } = require("uuid");
const createConnectionPool = require("@databases/pg");
const { sql } = require("@databases/pg");

const db = createConnectionPool(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_DATABASE}`
);

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// Upload Single file Size 100Mb Max
let upload = multer({
  storage: storage,
  limit: { fileSize: 1000000 * 100 },
}).single("myfile");

function dateFormating(params) {
  const data = params;
  data.forEach((element) => {
    element.date = moment(element.date).format("YYYY-MM-DD");
  });
  return data;
}

exports.WaitingForApproval = (req, res, next) => {
  const district = req.query.district || null;
  var date = req.query.date || "null";
  if (date != "null") {
    date = `'` + date + `'`;
  }

  client.query(
    `select dr.id, check_gate_tested, health_facilities_tested, tested, tested_negative, tested_positive, cured, death, district_id, cumulative_positive, cumulative_cured, active_case, cumulative_deaths, covid_hospitals, covid_hospital_beds, covid_hospital_admitted, covid_hospital_icu_beds, covid_hospitals_icu_bed_occupied, covid_hospital_o2_beds, covid_hospital_o2_bed_occupied, covid_hospital_non_o2_beds, covid_hospital_non_o2_bed_occupied, dchc, dchc_beds, dchc_admitted, dchc_icu_beds, dchc_icu_beds_occupied, dchc_o2_beds, dchc_o2_occupied, dchc_non_o2_beds, dchc_non_o2_beds_occupied, ccc, ccc_beds, ccc_admitted, home_isolation, flw_1st_dose_received, flw_fully_inoculated, hcw_1st_dose_received, hcw_fully_inoculated, "45years_fully_inoculated" as fully_inoculated_45years, "45years_1st_dose_received" as fst_dose_recived_45years, "18_to_44years_received_1st_dose" as fst_dose_recived_18_to_44years, "18_to_44years_fully_inoculated" as fully_inoculated_18_to_44years, total_registered_for_vaccination, total_received_1st_dose, total_fully_inoculated, create_at, date,violations_reported_today, cumulative_violations_reported, fine_imposed_today,cumulative_tested, cumulative_fine_imposed,ccc_o2_beds, ccc_o2_occupied, ccc_non_o2_beds, ccc_non_o2_occupied, name from daily_report dr join districts d ON d.id = dr.district_id where verified = false
    and (${date} is null OR date= ${date}) and
		('${district}' = 'null' OR d.id= ${district})`,
    (err, rows, fields) => {
      if (err) {
        res.status(500).json({
          message: "Some thing wend wrong",
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Sus",
          success: true,
          data: dateFormating(rows.rows),
        });
      }
    }
  );
};

exports.verify_old = (req, res, next) => {
  const { id, verified } = req.body;

  client.query(
    `update daily_report set verified = $1 where id = $2 `,
    [verified, id],
    (err, rows, fields) => {
      if (err) {
        res.status(500).json({
          message: "Some thing wend wrong",
          status: 500,
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Successfully Updated",
          status: 200,
          success: true,
        });
      }
    }
  );
};

exports.citienData = async (req, res) => {
  const { flws, hsws, citizensbetween18to44, citizensmorethen45 } = req.body;
  client.query(
    `UPDATE public.citizen_master
	    SET flws= $1, hsws= $2, citizensbetween18to44= $3, citizensmorethen45= $4 RETURNING *; `,
    [flws, hsws, citizensbetween18to44, citizensmorethen45],
    (err, rows, fields) => {
      if (err) {
        res.status(500).json({
          message: "Some thing wend wrong",
          status: 500,
          error: err,
        });
      } else {
        res.status(201).json({
          message: "Successfully Created",
          status: 201,
          data: rows,
          success: true,
        });
      }
    }
  );
  // client.query(
  //   `INSERT INTO public.citizen_master(
  //     flws, hsws, citizensbetween18to44, citizensmorethen45)
  //     VALUES ($1, $2, $3, $4); `,
  //   [flws, hsws, citizensbetween18to44, citizensmorethen45],
  //   (err, rows, fields) => {
  //     if (err) {
  //       res.status(500).json({
  //         message: "Some thing wend wrong",
  //         status: 500,
  //         error: err,
  //       });
  //     } else {
  //       res.status(201).json({
  //         message: "Successfully Created",
  //         status: 201,
  //         success: true,
  //       });
  //     }
  //   }
  // );
};

exports.citienDataNew = async (req, res) => {
  console.log(req.user);
  const user = req.user.username;
  const { district, populationAsPerElectoralRoll } = req.body;

  client.query(
    `UPDATE public.citizen_master_new
	    SET populationasperelectoralroll=$1,modified_by=$2 WHERE district_id=$3 RETURNING *; `,
    [populationAsPerElectoralRoll, user, district],
    (err, rows, fields) => {
      if (err) {
        res.status(500).json({
          message: "Some thing wend wrong",
          status: 500,
          error: err,
        });
      } else {
        res.status(201).json({
          message: "Successfully Created",
          status: 201,
          data: rows,
          success: true,
        });
      }
    }
  );
};

exports.insertCitienData = async (req, res) => {
  // const { flws, hsws, citizensbetween18to44, citizensmorethen45 } = req.body;
  for (var i = 1; i < 27; i++) {
    client.query(
      `INSERT INTO public.citizen_master_new(
         district_id, populationasperelectoralroll)
        VALUES (${i},0);`,
      (err, rows, fields) => {
        if (err) {
          res.status(500).json({
            message: "Some thing wend wrong",
            status: 500,
            error: err,
          });
        }
      }
    );
  }
  res.status(201).json({
    message: "Successfully Created",
    status: 201,
    success: true,
  });
};

exports.currentCitienStatus = (req, res) => {
  var result = [];
  // console.log('Users',req.user.userId);
  // const result = await db.query(
  //   sql`
  //     SELECT sum(populationasperelectoralroll)
  //     FROM citizen_master_new
  //   `
  // );
  // result[0].name = "Arunachal Pradesh";

  var query = client.query(
    `select name, populationasperelectoralroll from citizen_master_new cm join districts d on d.id = cm.district_id`
  );
  query.on("row", function (row) {
    result.push(row);
  });

  query.on("end", function () {
    return res.json(result);
  });
};

exports.approvedReports = (req, res) => {
  const district = req.query.district || null;
  var date = req.query.date || "null";
  if (date != "null") {
    date = `'` + date + `'`;
  }

  client.query(
    `SELECT name,check_gate_tested, health_facilities_tested, tested, tested_negative, tested_positive, cured, death, 
    cumulative_positive, cumulative_cured, active_case, cumulative_deaths, covid_hospitals,
    covid_hospital_beds, covid_hospital_admitted, covid_hospital_icu_beds, covid_hospitals_icu_bed_occupied, 
    covid_hospital_o2_beds, covid_hospital_o2_bed_occupied, covid_hospital_non_o2_beds, covid_hospital_non_o2_bed_occupied, 
    dchc, dchc_beds, dchc_admitted, dchc_icu_beds, dchc_icu_beds_occupied, dchc_o2_beds, dchc_o2_occupied, dchc_non_o2_beds, 
    dchc_non_o2_beds_occupied, ccc, ccc_beds, ccc_admitted, home_isolation, flw_1st_dose_received, flw_fully_inoculated, 
    hcw_1st_dose_received, hcw_fully_inoculated, "45years_fully_inoculated", "45years_1st_dose_received", 
    "18_to_44years_received_1st_dose", "18_to_44years_fully_inoculated", total_registered_for_vaccination, 
    total_received_1st_dose, total_fully_inoculated, create_at,violations_reported_today, cumulative_violations_reported, fine_imposed_today, cumulative_fine_imposed,
    date, ccc_o2_beds, ccc_o2_occupied, ccc_non_o2_beds, ccc_non_o2_occupied, cumulative_tested,modified,modified_by 
    FROM daily_report dr JOIN districts d ON d.id = dr.district_id
    WHERE verified = true and (${date} is null OR date= ${date}) and
		('${district}' = 'null' OR d.name= '${district}')
    ORDER BY date DESC`,
    (err, rows, fields) => {
      if (err) {
        res.status(500).json({
          message: "Some thing wend wrong",
          status: 500,
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Successfully Created",
          status: 200,
          data: dateFormating(rows.rows),
          success: true,
        });
      }
    }
  );
};

exports.districtReportsview = (req, res) => {
  const district = req.query.district;
  const start = req.query.date1;
  const end = req.query.date2;
  const status = req.query.status || null;
  var query = `SELECT name,check_gate_tested, health_facilities_tested, tested, tested_negative, tested_positive, cured, death, 
  cumulative_positive, cumulative_cured, active_case, cumulative_deaths, covid_hospitals,
  covid_hospital_beds, covid_hospital_admitted, covid_hospital_icu_beds, covid_hospitals_icu_bed_occupied, 
  covid_hospital_o2_beds, covid_hospital_o2_bed_occupied, covid_hospital_non_o2_beds, covid_hospital_non_o2_bed_occupied, 
  dchc, dchc_beds, dchc_admitted, dchc_icu_beds, dchc_icu_beds_occupied, dchc_o2_beds, dchc_o2_occupied, dchc_non_o2_beds, 
  dchc_non_o2_beds_occupied, ccc, ccc_beds, ccc_admitted, home_isolation, flw_1st_dose_received, flw_fully_inoculated, 
  hcw_1st_dose_received, hcw_fully_inoculated, "45years_fully_inoculated", "45years_1st_dose_received", 
  "18_to_44years_received_1st_dose", "18_to_44years_fully_inoculated", total_registered_for_vaccination, 
  total_received_1st_dose, total_fully_inoculated, create_at,violations_reported_today, cumulative_violations_reported, fine_imposed_today, cumulative_fine_imposed,
  to_date(date::TEXT, 'YYYY-MM-DD') as date, ccc_o2_beds, ccc_o2_occupied, ccc_non_o2_beds, ccc_non_o2_occupied, cumulative_tested 
  FROM daily_report dr JOIN districts d ON d.id = dr.district_id
  WHERE (${status} is null OR verified = ${status}) AND ('${district}' = 'null' OR d.name= '${district}') `;

  if (start != "null") {
    query =
      query + `AND date BETWEEN '${start}' AND '${end}' ORDER BY date DESC`;
  } else {
    query = query + `ORDER BY date DESC`;
  }

  // console.log(query);

  client.query(query, (err, rows, fields) => {
    if (err) {
      res.status(500).json({
        message: "Some thing wend wrong",
        status: 500,
        error: err,
      });
    } else {
      res.status(200).json({
        message: "Successfully Created",
        status: 200,
        data: dateFormating(rows.rows),
        success: true,
      });
    }
  });
};

exports.order = (req, res) => {
  upload(req, res, (err) => {
    const { name, date, district } = req.body;
    // Validate reuest
    if (!req.file || !name || !date || !district) {
      return res.json({
        message: `All fields are required`,
        success: false,
        status: 500,
      });
    }
    if (err) {
      return res.status(500).send({ error: err.message });
    }

    var query = `INSERT INTO orders (name, date, access) 
    VALUES('${name}', '${date}', ARRAY [ ${district} ]) RETURNING name,date, access;`;

    client.query(query, (err, rows, fields) => {
      // console.log(rows);
      if (err) {
        res.status(200).json({
          message: "Some thing wend wrong",
          status: 500,
          success: false,
        });
      } else {
        res.status(200).json({
          message: " Order Uploaded Successfully",
          status: 200,
          data: rows.rows,
          success: true,
        });
      }
    });
  });
};

exports.verify = async (req, res) => {
  const updatedFile = req.body.body;
  const user = req.user.username;
  for (var i = 0; i < updatedFile.length; i++) {
    await client.query(
      `UPDATE public.daily_report
       SET check_gate_tested=${updatedFile[i].check_gate_tested}, health_facilities_tested=${updatedFile[i].health_facilities_tested}, tested=${updatedFile[i].tested}, tested_negative=${updatedFile[i].tested_negative}, tested_positive=${updatedFile[i].tested_positive}, cured=${updatedFile[i].cured}, death=${updatedFile[i].death}, verified=true, cumulative_positive=${updatedFile[i].cumulative_positive}, cumulative_cured=${updatedFile[i].cumulative_cured}, active_case=${updatedFile[i].active_case}, cumulative_deaths=${updatedFile[i].cumulative_deaths}, covid_hospitals=${updatedFile[i].covid_hospitals}, covid_hospital_beds=${updatedFile[i].covid_hospital_beds}, covid_hospital_admitted=${updatedFile[i].covid_hospital_admitted}, covid_hospital_icu_beds=${updatedFile[i].covid_hospital_icu_beds}, covid_hospitals_icu_bed_occupied=${updatedFile[i].covid_hospitals_icu_bed_occupied}, covid_hospital_o2_beds=${updatedFile[i].covid_hospital_o2_beds}, covid_hospital_o2_bed_occupied=${updatedFile[i].covid_hospital_o2_bed_occupied}, covid_hospital_non_o2_beds=${updatedFile[i].covid_hospital_non_o2_beds}, covid_hospital_non_o2_bed_occupied=${updatedFile[i].covid_hospital_non_o2_bed_occupied}, dchc=${updatedFile[i].dchc}, dchc_beds=${updatedFile[i].dchc_beds}, dchc_admitted=${updatedFile[i].dchc_admitted}, dchc_icu_beds=${updatedFile[i].dchc_icu_beds}, dchc_icu_beds_occupied=${updatedFile[i].dchc_icu_beds_occupied}, dchc_o2_beds=${updatedFile[i].dchc_o2_beds}, dchc_o2_occupied=${updatedFile[i].dchc_o2_occupied}, dchc_non_o2_beds=${updatedFile[i].dchc_non_o2_beds}, dchc_non_o2_beds_occupied=${updatedFile[i].dchc_non_o2_beds_occupied}, ccc=${updatedFile[i].ccc}, ccc_beds=${updatedFile[i].ccc_beds}, ccc_admitted=${updatedFile[i].ccc_admitted}, home_isolation=${updatedFile[i].home_isolation}, flw_1st_dose_received=${updatedFile[i].flw_1st_dose_received}, flw_fully_inoculated=${updatedFile[i].flw_fully_inoculated}, hcw_1st_dose_received=${updatedFile[i].hcw_1st_dose_received}, hcw_fully_inoculated=${updatedFile[i].hcw_fully_inoculated}, "45years_fully_inoculated"=${updatedFile[i].fully_inoculated_45years}, "45years_1st_dose_received"=${updatedFile[i].fst_dose_recived_45years}, "18_to_44years_received_1st_dose"=${updatedFile[i].fst_dose_recived_18_to_44years}, "18_to_44years_fully_inoculated"=${updatedFile[i].fully_inoculated_18_to_44years}, total_registered_for_vaccination=${updatedFile[i].total_registered_for_vaccination}, total_received_1st_dose=${updatedFile[i].total_received_1st_dose}, total_fully_inoculated=${updatedFile[i].total_fully_inoculated},  ccc_o2_beds=${updatedFile[i].ccc_o2_beds}, ccc_o2_occupied=${updatedFile[i].ccc_o2_occupied}, ccc_non_o2_beds=${updatedFile[i].ccc_non_o2_beds}, ccc_non_o2_occupied=${updatedFile[i].ccc_non_o2_occupied}, cumulative_tested=${updatedFile[i].cumulative_tested}, violations_reported_today=${updatedFile[i].violations_reported_today}, cumulative_violations_reported=${updatedFile[i].cumulative_violations_reported}, fine_imposed_today=${updatedFile[i].fine_imposed_today}, cumulative_fine_imposed=${updatedFile[i].cumulative_fine_imposed},modified_by='${user}'
       WHERE id =${updatedFile[i].id}`,
      (err, rows) => {
        if (err) {
          var msg = "Something went wrong. Please try again later.";
          // console.log(err.message);
          if (err.message === "integer out of range") {
            msg = "Data Entered is Incorrect. Please try again";
          }
          res.json({
            message: msg,
            status: 500,
            success: false,
          });
        }
      }
    );
  }

  res.json({
    message: "Submitted and Approved Successfully",
    status: 200,
    success: true,
  });
};

function jsonConverter(data) {
  // var json = [
  //   { label: "check_gate_tested", date1: data[0].check_gate_tested, date2: data[1].check_gate_tested },
  //   {
  //     label: "health_facilities_tested",
  //     date1: data[0].health_facilities_tested,
  //     date2: data[1].health_facilities_tested,
  //   },
  //   { label: "tested", date1: data[0].tested, date2: data[1].tested },
  //   { label: "tested_negative", date1: data[0].tested_negative, date2: data[1].tested_negative },
  //   { label: "tested_positive", date1: data[0].tested_positive, date2: data[1].tested_positive },
  //   { label: "cured", date1: data[0].cured, date2: data[1].cured },
  //   { label: "death", date1: data[0].death, date2: data[1].death },
  //   { label: "cumulative_positive", date1: data[0].cumulative_positive, date2: data[1].cumulative_positive },
  //   { label: "cumulative_cured", date1: data[0].cumulative_cured, date2: data[1].cumulative_cured },
  //   { label: "active_case", date1: data[0].active_case, date2: data[1].active_case },
  //   { label: "cumulative_deaths", date1: data[0].cumulative_deaths, date2: data[1].cumulative_deaths },
  //   { label: "covid_hospitals", date1: data[0].covid_hospitals, date2: data[1].covid_hospitals },
  //   { label: "covid_hospital_beds", date1: data[0].covid_hospital_beds, date2: data[1].covid_hospital_beds },
  //   { label: "covid_hospital_admitted", date1: data[0].covid_hospital_admitted, date2: data[1].covid_hospital_admitted },
  //   { label: "covid_hospital_icu_beds", date1: data[0].covid_hospital_icu_beds, date2: data[1].covid_hospital_icu_beds },
  //   {
  //     label: "covid_hospitals_icu_bed_occupied",
  //     date1: data[0].covid_hospitals_icu_bed_occupied, date2: data[1].covid_hospitals_icu_bed_occupied
  //   },
  //   { label: "covid_hospital_o2_beds", date1: data[0].covid_hospital_o2_beds, date2: data[1].covid_hospital_o2_beds },
  //   {
  //     label: "covid_hospital_o2_bed_occupied",
  //     date1:data[0].covid_hospital_o2_bed_occupied, date2: data[1].covid_hospital_o2_bed_occupied,
  //   },
  //   { label: "covid_hospital_non_o2_beds", date1: data[0].covid_hospital_non_o2_beds, date2: data[1].covid_hospital_non_o2_beds },
  //   {
  //     label: "covid_hospital_non_o2_bed_occupied",
  //     date1: data[0].covid_hospital_non_o2_bed_occupied,
  //     date2: data[1].covid_hospital_non_o2_bed_occupied,
  //   },
  //   { label: "dchc", date1: data[0].dchc, date2: data[1].dchc },
  //   { label: "dchc_beds", date1: data[0].dchc_beds, date2: data[1].dchc_beds },
  //   { label: "dchc_admitted", date1: data[0].dchc_admitted, date2: data[1].dchc_admitted },
  //   { label: "dchc_icu_beds", date1: data[0].dchc_icu_beds, date2: data[1]._icu_dchc_icu_beds },
  //   { label: "dchc_icu_beds_occupied", date1: data[0].dchc_icu_beds_occupied, date2: data[1].dchc_icu_beds_occupied },
  //   { label: "dchc_o2_beds", date1: data[0].dchc_o2_beds, date2: data[1].dchc_o2_beds },
  //   { label: "dchc_o2_occupied", date1: data[0].dchc_o2_occupied, date2: data[1].dchc_o2_occupied },
  //   { label: "dchc_non_o2_beds", date1: data[0].dchc_non_o2_beds, date2: data[1].dchc_non_o2_beds },
  //   { label: "dchc_non_o2_beds_occupied", date1: data[0].dchc_non_o2_beds_occupied, date2: data[1].dchc_non_o2_beds_occupied },
  //   { label: "ccc", date1: data[0].ccc, date2: data[1].ccc },
  //   { label: "ccc_beds", date1: data[0].ccc_beds, date2: data[1].ccc_beds },
  //   { label: "ccc_admitted", date1: data[0].ccc_admitted, date2: data[1].ccc_admitted },
  //   { label: "home_isolation", date1: data[0].home_isolation, date2: data[1].home_isolation },
  //   { label: "flw_1st_dose_received", date1: data[0].flw_1st_dose_received, date2: data[1].flw_1st_dose_received },
  //   { label: "flw_fully_inoculated", date1: data[0].flw_fully_inoculated, date2: data[1].flw_fully_inoculated },
  //   { label: "hcw_1st_dose_received", date1: data[0].hcw_1st_dose_received, date2: data[1].hcw_1st_dose_received },
  //   { label: "hcw_fully_inoculated", date1: data[0].hcw_fully_inoculated, date2: data[1].hcw_fully_inoculated },
  //   { label: "45years_fully_inoculated", date1: data[0].dchc, date2: data[1].dchc },
  //   { label: "45years_1st_dose_received", date1: data[0].dchc, date2: data[1].dchc },
  //   {
  //     label: "18_to_44years_received_1st_dose",
  //     date1: data[0].dchc, date2: data[1].dchc
  //   },
  //   {
  //     label: "18_to_44years_fully_inoculated",
  //     date1: data[0].dchc, date2: data[1].dchc
  //   },
  //   {
  //     label: "total_registered_for_vaccination",
  //     date1: data[0].total_registered_for_vaccination, date2: data[1].total_registered_for_vaccination
  //   },
  //   {
  //     label: "total_received_1st_dose",
  //     date1: data[0].total_received_1st_dose, date2: data[1].total_received_1st_dose
  //   },
  //   {
  //     label: "total_fully_inoculated",
  //     date1: data[0].total_fully_inoculated, date2: data[1].total_fully_inoculated
  //   },
  //   {
  //     label: "date",
  //     date1: data[0].date, date2: data[1].date
  //   },
  //   { label: "ccc_o2_beds", date1: data[0].ccc_o2_beds, date2: data[1].ccc_o2_beds },
  //   { label: "ccc_non_o2_beds", date1: data[0].ccc_non_o2_beds, date2: data[1].ccc_non_o2_beds },
  //   { label: "ccc_non_o2_occupied", date1: data[0].ccc_non_o2_occupied, date2: data[1].ccc_non_o2_occupied },
  //   { label: "cumulative_tested", date1: data[0].cumulative_tested, date2: data[1].cumulative_tested },
  //   { label: "violations_reported_today", date1: data[0].violations_reported_today, date2: data[1].violations_reported_today },
  //   {
  //     label: "cumulative_violations_reported",
  //     date1: data[0].cumulative_violations_reported, date2: data[1].cumulative_violations_reported
  //   },
  //   { label: "fine_imposed_today", date1: data[0].fine_imposed_today, date2: data[1].fine_imposed_today },
  //   {
  //     label: "cumulative_fine_imposed",
  //     date1: data[0].cumulative_fine_imposed, date2: data[1].cumulative_fine_imposed
  //   },
  // ];

  // console.log(json);

  // var json = new Object();
  // var array = new Array();
  // for (const [key, value] of Object.entries(data[0])) {
  //   var item = new Object();
  //   let keyName = key;
  //   (item.label = key),
  //   (item.date1 = value),
  //   (item.date2 = data[1][keyName]),
  //   array.push(item);
  // }
  // console.log(array);

  return json;
}

// jsonConverter();

exports.report = async (req, res) => {
  let queryDate = req.query.q;
  // if (req.query.qt === "current") {
  //   const result = await db.query(
  //     sql`
  //       SELECT TO_CHAR(date ::DATE, 'yyyy-mm-dd')AS date from daily_report WHERE verified = true ORDER BY date DESC limit 1
  //     `
  //   );
  //   queryDate = result[0].date;
  // } else {
  //   queryDate = req.query.q;
  // }

  client.query(
    `select sum(check_gate_tested) as check_gate_tested, sum(health_facilities_tested) as health_facilities_tested, sum(tested) as tested, sum(tested_negative) as tested_negative, sum(tested_positive) as tested_positive, sum(cured) as cured, sum(death) as death,sum(cumulative_positive) as cumulative_positive, sum(cumulative_cured) as cumulative_cured, sum(active_case) as active_case, sum(cumulative_deaths) as cumulative_deaths, sum(covid_hospitals) as covid_hospitals, sum(covid_hospital_beds) as covid_hospital_beds, sum(covid_hospital_admitted) as covid_hospital_admitted, sum(covid_hospital_icu_beds) as covid_hospital_icu_beds, sum(covid_hospitals_icu_bed_occupied) as covid_hospitals_icu_bed_occupied, sum(covid_hospital_o2_beds) as covid_hospital_o2_beds, sum(covid_hospital_o2_bed_occupied) as covid_hospital_o2_bed_occupied, sum(covid_hospital_non_o2_beds) as covid_hospital_non_o2_beds, sum(covid_hospital_non_o2_bed_occupied) as covid_hospital_non_o2_bed_occupied, sum(dchc) as dchc, sum(dchc_beds) as dchc_beds, sum(dchc_admitted) as dchc_admitted, sum(dchc_icu_beds)as dchc_icu_beds, sum(dchc_icu_beds_occupied) as dchc_icu_beds_occupied, sum(dchc_o2_beds) as dchc_o2_beds, sum(dchc_o2_occupied)as dchc_o2_occupied, sum(dchc_non_o2_beds) as dchc_non_o2_beds, sum(dchc_non_o2_beds_occupied) as dchc_non_o2_beds_occupied, sum(ccc) as ccc, sum(ccc_beds) as ccc_beds, sum(ccc_admitted) as ccc_admitted, sum(home_isolation) as home_isolation, sum(flw_1st_dose_received) as flw_1st_dose_received, sum(flw_fully_inoculated) as flw_fully_inoculated, sum(hcw_1st_dose_received)as hcw_1st_dose_received, sum(hcw_fully_inoculated) as hcw_fully_inoculated, sum("45years_fully_inoculated") as "45years_fully_inoculated", sum("45years_1st_dose_received") as "45years_1st_dose_received", sum("18_to_44years_received_1st_dose") as "18_to_44years_received_1st_dose", sum("18_to_44years_fully_inoculated") as "18_to_44years_fully_inoculated", sum(total_registered_for_vaccination) as total_registered_for_vaccination, sum(total_received_1st_dose) as total_received_1st_dose, sum(total_fully_inoculated) as total_fully_inoculated, date, sum(ccc_o2_beds) as ccc_o2_beds, sum(ccc_o2_occupied) as ccc_o2_beds, sum(ccc_non_o2_beds) as ccc_non_o2_beds,sum(ccc_non_o2_occupied)as ccc_non_o2_occupied, sum(cumulative_tested) as cumulative_tested, sum(violations_reported_today)as violations_reported_today, sum(cumulative_violations_reported) as cumulative_violations_reported, sum(fine_imposed_today) as fine_imposed_today, sum(cumulative_fine_imposed)as cumulative_fine_imposed from daily_report WHERE verified=true and date<='${queryDate}' group by date order by date desc limit 2`,
    (err, rows, fields) => {
      // console.log(rows);
      if (err) {
        res.status(200).json({
          message: "Some thing wend wrong",
          status: 500,
          success: false,
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Report",
          status: 200,
          data: rows.rows,
          success: true,
        });
      }
    }
  );
};
