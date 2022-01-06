const client = require("../model");
// const db = require("../model");
require("dotenv").config();
const createConnectionPool = require("@databases/pg");
const { sql } = require("@databases/pg");
// const dateFormat = require("dateformat");
const moment = require("moment");

// async function run() {
// N.B. you will need to replace this connection
// string with the correct string for your database.
const db = createConnectionPool(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_DATABASE}`
);

// async function run() {
//   // N.B. you will need to replace this connection
//   // string with the correct string for your database.
//   const db = createConnectionPool(
//     `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_DATABASE}`,
//   );

//   const results = await db.query(sql`
//     SELECT 1 + 1 as result;
//   `);

//   console.log(results);
//   // => [{result: 2}]

//   await db.dispose();
// }

// run().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });

// run();

exports.timeserie = async (req, res, next) => {
  // const results = await Promise.all(
  //   (await db.query(
  //     sql`
  //       SELECT u.user_id AS id, u.display_name, u.manager_id
  //       FROM newusers u
  //     `,
  //   )).map(async ({manager_id, ...user}) => ({
  //     ...user,
  //     manager:
  //       (await db.query(
  //         sql`
  //           SELECT u.user_id AS id, u.display_name
  //           FROM newusers u
  //           WHERE u.user_id=${manager_id}
  //         `,
  //       ))[0] || null,
  //     teams: await db.query(
  //       sql`
  //         SELECT t.team_id AS id, t.display_name
  //         FROM user_teams ut
  //         JOIN teams t USING (team_id)
  //         WHERE ut.user_id = ${user.id}
  //       `,
  //     ),
  //   })),
  // );
  // console.log(results);
  // const date = await db.query(
  //       sql`
  //         SELECT date from daily_report ORDER BY date DESC limit 1
  //       `,
  //     )
  client.query(
    `select tested_positive, death, tested, cured, name,date from daily_report join districts on daily_report.district_id = districts.id where date > CURRENT_DATE - 7;`,
    (err, rows, fie9lds) => {
      if (err) {
        res.status(500).json({
          message: "Some thing wend wrong",
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Successful",
          success: true,
          data: rows.rows,
        });
      }
    }
  );
};
// async function lastUpdate() {
//   const results = await db.query(sql`
//     SELECT date from daily_report ORDER BY date DESC limit 1
//     `);
//     await db.dispose();
//     console.log(results);
//   return results[0];
// }
// console.log(lastUpdate())

// console.log(moment().subtract(1, 'days').endOf('day').toString());

// console.log(moment().subtract(1, 'days').startOf('day').toString());

// console.log(moment().subtract(1, 'day').format("YYYY-MM-DD"));

// console.log(moment().subtract(1, 'day'));

// console.log(moment('2017/11/6', 'YYYY/MM/DD').subtract(1, 'days').toString());
exports.cumilate = async (req, res, next) => {
  // const result = await db.query(
  //   sql`
  //     SELECT TO_CHAR(date::DATE, 'yyyy-mm-dd')AS date from daily_report WHERE verified=true ORDER BY date DESC limit 2
  //   `
  // );
  // const date = result[1].date;
  const date = moment().subtract(1, 'day').format("YYYY-MM-DD");

  client.query(
    `select sum(cumulative_positive)as positive, sum(cumulative_cured)as cured , sum(cumulative_deaths) as death from daily_report where date = '${date}' `,
    (err, rows, fields) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong",
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Successful",
          success: true,
          data: rows.rows,
        });
      }
    }
  );
};

exports.daily = async (req, res) => {
  var result = [];
  // const dateresult = await db.query(
  //   sql`
  //     SELECT TO_CHAR(date::DATE, 'yyyy-mm-dd')AS date from daily_report WHERE verified=true ORDER BY date DESC limit 1
  //   `
  // );
  // const date = dateresult[0].date;
  const date = moment().subtract(1, 'day').format("YYYY-MM-DD");
  // console.log(date);

  var map_query = `select sum(health_facilities_tested)as dtest, sum(active_case)as active, sum(check_gate_tested)as ctest, sum(cured)as cured, sum(death)as deceased, sum(tested_positive)as positive,sum(ccc_beds-(ccc_o2_occupied+ccc_non_o2_occupied)) as cccb, sum(covid_hospital_beds-(covid_hospitals_icu_bed_occupied+covid_hospital_o2_bed_occupied+covid_hospital_non_o2_bed_occupied)) as dchb,sum(dchc_beds-(dchc_icu_beds_occupied+dchc_o2_occupied+dchc_non_o2_beds_occupied))as dchcb from daily_report where date = '${date}' and verified=true`;

  var query = client.query(map_query);
  query.on("row", function (row) {
    result.push(row);
  });
  query.on("end", function () {
    return res.json(result);
  });
};

exports.cumulativeBeds = async (req, res) => {
  // const dateresult = await db.query(
  //   sql`
  //     SELECT TO_CHAR(date::DATE, 'yyyy-mm-dd')AS date from daily_report WHERE verified=true ORDER BY date DESC limit 1
  //   `
  // );
  // const date = dateresult[0].date;
  const date = moment().subtract(1, 'day').format("YYYY-MM-DD");

  client.query(
    `select sum((ccc_o2_beds+ccc_non_o2_beds)-(ccc_o2_occupied+ccc_non_o2_occupied)) as cccb, sum((covid_hospital_o2_beds+covid_hospital_non_o2_beds+covid_hospital_icu_beds)-(covid_hospitals_icu_bed_occupied+covid_hospital_o2_bed_occupied+covid_hospital_non_o2_bed_occupied)) as dchb, sum((dchc_icu_beds+dchc_o2_beds+dchc_non_o2_beds)-(dchc_icu_beds_occupied+dchc_o2_occupied+dchc_non_o2_beds_occupied))as dchcb 
    from daily_report where date = '${date}' and verified=true`,
    (err, rows, fields) => {
      if (err) {
        res.status(500).json({
          message: "Some thing wend wrong",
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Successful",
          success: true,
          data: rows.rows,
        });
      }
    }
  );
};

exports.bedsAvailability = async (req, res) => {
  // const dateresult = await db.query(
  //   sql`
  //     SELECT TO_CHAR(date::DATE, 'yyyy-mm-dd')AS date from daily_report WHERE verified=true ORDER BY date DESC limit 1
  //   `
  // );
  // const date = dateresult[0].date;
  const date = moment().subtract(1, 'day').format("YYYY-MM-DD");

  client.query(
    `select sum(ccc_o2_beds - ccc_o2_occupied)as cccO2Beds,sum(ccc_non_o2_beds - ccc_non_o2_occupied)as cccNonO2Beds,sum(covid_hospital_o2_beds - covid_hospital_o2_bed_occupied)as dchO2Beds,
    sum(covid_hospital_non_o2_beds - covid_hospital_non_o2_bed_occupied)as dchNonO2Beds,
    sum(covid_hospital_icu_beds - covid_hospitals_icu_bed_occupied)as dchIcuBeds,
    sum(dchc_icu_beds - dchc_icu_beds_occupied)as dchcIcuBeds,
    sum(dchc_o2_beds - dchc_o2_occupied)as dchcO2beds,
    sum(dchc_non_o2_beds - dchc_non_o2_beds_occupied)as dchcNonO2Beds 
    from daily_report where date = '${date}' and verified=true`,
    (err, rows, fields) => {
      if (err) {
        res.status(500).json({
          message: "Some thing wend wrong",
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Successful",
          success: true,
          data: rows.rows,
        });
      }
    }
  );
};

exports.vaccination = async (req, res) => {
  const result = await db.query(
    sql`
      SELECT TO_CHAR(date::DATE, 'yyyy-mm-dd')AS date from daily_report WHERE verified=true ORDER BY date DESC limit 1
    `
  );
  const date = result[0].date;
  client.query(
    `select sum(total_received_1st_dose)as vaccinated1,
    sum(total_fully_inoculated)as vaccinated2, 
    sum(total_received_1st_dose+total_fully_inoculated)as total from daily_report 
    WHERE verified=true and date = '${date}'`,
    (err, rows, fields) => {
      if (err) {
        res.status(500).json({
          message: "Some thing wend wrong",
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Successful",
          success: true,
          data: rows.rows,
        });
      }
    }
  );
};

exports.cumulative = async (req, res) => {
  const dateresult = await db.query(
    sql`
      SELECT DISTINCT TO_CHAR(date::DATE, 'yyyy-mm-dd')AS date from daily_report WHERE verified=true ORDER BY date DESC limit 1
    `
  );
  const date = dateresult[0].date;
  // const lastupdated = dateresult[1].date;
  // const date = moment().subtract(1, 'day').format("YYYY-MM-DD");

  const cumulative = await db.query(
    sql`
      SELECT sum(cumulative_positive)as confirmed,sum(cumulative_cured)as recovered,sum(cumulative_deaths)as deceased,sum(cumulative_tested) as tested from daily_report WHERE verified=true and date = ${date}
    `
  );
  // client.query(
  //   `select sum(tested) as tested, sum(cured) as recovered, sum(death) as deceased, sum(tested_positive) as confirmed from daily_report WHERE verified = true and date='${date}'`,
  //   (err, rows, fields) => {
  //     if (err) {
  //       res.status(500).json({
  //         message: "Some thing wend wrong",
  //         error: err,
  //       });
  //     } else {
  //       res.status(200).json({
  //         message: "Successful",
  //         success: true,
  //         data: rows.rows,
  //         total: cumulative,
  //       });
  //     }
  //   }
  // );
  res.status(200).json({
    message: "Successful",
    success: true,
    total: cumulative,
  });
};

exports.cumlativevaccination = async (req, res) => {
  const result = await db.query(
    sql`
      SELECT sum(hcw_1st_dose_received)as hcw_vcn1,
      sum(flw_1st_dose_received)as flw_vcn1,
      sum("45years_1st_dose_received")as "vcn1_45year",
      sum("18_to_44years_received_1st_dose")as "vcn1_18to44",
      sum(flw_fully_inoculated)as flw_vcn2,
      sum(hcw_fully_inoculated)as hcw_vcn2,
      sum("45years_fully_inoculated")as "vcn2_45year",
      sum("18_to_44years_fully_inoculated")as "vcn2_18to44"
      FROM daily_report
    `
  );
  result[0].name = "Arunachal Pradesh";

  client.query(
    `SELECT name, sum(flw_1st_dose_received)as flw_vcn1,
      sum(hcw_1st_dose_received)as hcw_vcn1,
      sum("45years_1st_dose_received")as "vcn1_45year",
      sum("18_to_44years_received_1st_dose")as "vcn1_18to44",
      sum(flw_fully_inoculated)as flw_vcn2,
      sum(hcw_fully_inoculated)as hcw_vcn2,
      sum("45years_fully_inoculated")as "vcn2_45year",
      sum("18_to_44years_fully_inoculated")as "vcn2_18to44"
      FROM daily_report r 
      JOIN districts d on r.district_id = d.id 
      WHERE verified=true
      group by name; `,
    (err, rows, fields) => {
      if (err) {
        res.status(500).json({
          message: "Some thing wend wrong",
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Successful",
          success: true,
          data: rows.rows,
          stateData: result,
        });
      }
    }
  );
};

exports.citizens = async (req, res, next) => {
  client.query(
    `SELECT flws, hsws, citizensbetween18to44, citizensmorethen45
    FROM public.citizen_master; `,
    (err, rows, fields) => {
      if (err) {
        res.status(500).json({
          message: "Some thing wend wrong",
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Successful",
          success: true,
          data: rows.rows,
        });
      }
    }
  );
};

exports.districtPositivityRate = async (req, res) => {
  const start = req.query.start;
  const end = req.query.end;
  // const result = await db.query(
  //   sql`
  //     SELECT TO_CHAR(date ::DATE, 'yyyy-mm-dd')AS date from daily_report WHERE verified = true ORDER BY date DESC limit 1
  //   `
  // );
  // const to = result[0].date;
  const to = moment().subtract(1, 'day').format("YYYY-MM-DD");

  // const date = new Date(to);
  // const from = dateFormat(date.setDate(date.getDate() - 7), "isoDate");

  var a = moment(end, "DD-MM-YYYY");
  var b = moment(start, "DD-MM-YYYY");

  const durection = a.diff(b, "days") + 1;
  const results = await Promise.all(
    (
      await db.query(
        sql`
          SELECT d.id, d.name
          FROM public.districts d;
        `
      )
    ).map(async ({ id, ...district }) => ({
      ...district,
      date: await db.query(
        sql`
              SELECT TO_CHAR(date::DATE, 'dd Mon yyyy')AS date, sum(tested)as tested, sum(cured)as recovered, sum(active_case)as active, sum(death)as deceased, sum(tested_positive)as confirmed 
              FROM daily_report where date BETWEEN ${start} AND ${end} 
              and district_id = ${id} AND verified=true
              GROUP BY date
            `
      ),
      total: await db.query(
        sql`
              select sum(tested)as tested, sum(cured)as recovered, sum(death)as deceased,sum(active_case)as active,sum(tested_positive)as confirmed from daily_report WHERE date BETWEEN ${start} AND ${end} AND verified=true and district_id = ${id}
            `
      ),
      average: await db.query(
        sql`
            SELECT ROUND(sum(active_case)/${durection}::decimal,2)as active, ROUND(SUM(tested)/${durection}::decimal,2) AS tested, ROUND(sum(cured)/${durection}::decimal,2)AS recovered, 
            ROUND(sum(death)/${durection}::decimal,2)AS deceased, ROUND(sum(tested_positive)/${durection}::decimal,2)AS confirmed 
            FROM daily_report WHERE district_id = ${id} AND verified=true AND date BETWEEN ${start} AND ${end}
          `
      ),
    }))
  );

  res.status(200).json({
    message: "Successful",
    success: true,
    data: results,
    endDate: to,
  });
};

exports.statetPositivityRate = async (req, res) => {
  const start = req.query.start;
  // TO_CHAR(NOW() :: DATE, 'dd/mm/yyyy')
  const end = req.query.end;
  
  const results = await Promise.all(
    await db.query(
      // sql`
      //     SELECT TO_CHAR(date::DATE, 'dd Mon yyyy')AS date, date as dt, sum(tested_positive)AS confirmed, sum(tested)AS tested FROM daily_report where date BETWEEN ${start} AND ${end} 
      //     GROUP BY date ORDER BY dt asc
      //     `
      sql`
          SELECT TO_CHAR(date::DATE, 'dd Mon yyyy')AS date, date as dt, sum(tested_positive)AS confirmed, sum(health_facilities_tested+check_gate_tested)AS tested FROM daily_report where date BETWEEN ${start} AND ${end} AND verified = true
          GROUP BY date ORDER BY dt asc
          `
    )
  );

  res.status(200).json({
    message: "Successful",
    success: true,
    data: results,
  });
};

exports.vaccinationChartNew = async (req, res) => {
  const result = await db.query(
    sql`
      SELECT TO_CHAR(date::DATE, 'yyyy-mm-dd')AS date from daily_report WHERE verified=true ORDER BY date DESC limit 1
    `
  );
  const date = result[0].date;
  const results = await Promise.all(
    await db.query(
      sql`
      select name,populationasperelectoralroll,sum(total_received_1st_dose)as fstdose,sum(total_fully_inoculated)as snddose 
      from daily_report dr join districts d on dr.district_id = d.id join citizen_master_new cm on d.id = cm.district_id where date = ${date} 
      group by name,populationasperelectoralroll,d.id order by name
          `
    )
  );

  res.status(200).json({
    message: "Successful",
    success: true,
    data: results,
  });
}

exports.inappropriateBehaviour = async (req,res) => {
  const result = await db.query(
    sql`
      SELECT TO_CHAR(date::DATE, 'yyyy-mm-dd')AS date from daily_report WHERE verified=true ORDER BY date DESC limit 1
    `
  );

  const date = result[0].date;  
  const results = await Promise.all(
    await db.query(
      sql`
      select sum(violations_reported_today)as vcase,sum(cumulative_violations_reported)as cvcase,sum(fine_imposed_today) as fine,sum(cumulative_fine_imposed) as cfine 
      from daily_report where date = ${date} 
      `
    )
  );

  res.status(200).json({
    message: "Successful",
    success: true,
    data: results,
  });
}