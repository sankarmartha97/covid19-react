const client = require("../model");
require("dotenv").config();
const moment = require("moment");
const createConnectionPool = require("@databases/pg");
const { sql } = require("@databases/pg");

const db = createConnectionPool(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_DATABASE}`
);

function dateFormating(params) {
  const data = params;
  data.forEach((element) => {
    element.date = moment(element.date).format("YYYY-MM-DD");
  });
  return data;
}

exports.recentapproved = async (req, res, next) => {
  // IT_SECRETARY

  const district = req.query.district || null;
  var date = req.query.date || moment().subtract(1, "day").format("YYYY-MM-DD");
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
  date, dr.id, ccc_o2_beds, ccc_o2_occupied, ccc_non_o2_beds, ccc_non_o2_occupied, cumulative_tested,modified,modified_by 
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

exports.recheckReport = async (req, res, next) => {
  const id = req.body.id;

  const findReport = await db.query(
    sql` SELECT * FROM daily_report WHERE id = ${id}`
  );
  console.log(findReport);
  if (findReport.length === 0) {
    res.status(200).json({
      message: "Report not found",
      status: 500,
      success: true,
    });
    return;
  }

  // if(req.user)
  const diff = moment().diff(moment(findReport[0].date, "YYYY-MM-DD"), "days");

  if (
    moment().diff(moment(findReport[0].date, "YYYY-MM-DD"), "days") > 2 &&
    req.user.username != "IT_SECRETARY"
  ) {
    res.status(200).json({
      message: "Not Allowed More then 2 days before Report Please contact to you superAdmin IT_SECRETARY",
      status: 500,
      success: true,
    });
    return;
  }

  const updateReport = await db.query(
    sql`update daily_report set verified = false where id=${id}`
  );
  // await db.dispose();

  res.status(200).json({
    message: "Report Unapproved Successfully",
    status: 200,
    success: true,
  });
};
