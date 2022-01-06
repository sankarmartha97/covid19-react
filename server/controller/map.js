var client = require("../model");
const createConnectionPool = require("@databases/pg");
const { sql } = require("@databases/pg");
const shp = require("./shp");
const moment = require("moment");

const db = createConnectionPool(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_DATABASE}`
);
//
exports.check_point_get_all = (req, res, next) => {
  var result = [];
  var map_query = `  SELECT (SELECT row_to_json(fc)
                    FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                    FROM (SELECT 'Feature' As type, ST_AsGeoJSON((lg.geom), 4)::json As geometry ,
                    row_to_json((SELECT l FROM (SELECT id,name ) As l
                            )) As properties
                    FROM entry_gate  As lg ) As f ) As fc) as geojson`;

  var query = client.query(map_query);
  query.on("row", function (row) {
    result.push(row);
  });
  query.on("end", function () {
    return res.json(result[0].geojson);
  });
};

//
exports.isolation_get_all = (req, res, next) => {
  var result = [];
  var map_query = ` SELECT (SELECT row_to_json(fc)
                    FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                    FROM (SELECT 'Feature' As type, ST_AsGeoJSON((lg.geom), 4)::json As geometry ,
                    row_to_json((SELECT l FROM (SELECT id,name_of_ho,capacity,quaratine ) As l
                            )) As properties
                    FROM hospital  As lg ) As f ) As fc) as geojson`;

  var query = client.query(map_query);
  query.on("row", function (row) {
    result.push(row);
  });
  query.on("end", function () {
    return res.json(result[0].geojson);
  });
};

//
exports.quarantine_get_all = (req, res, next) => {
  var result = [];
  var map_query = ` SELECT (SELECT row_to_json(fc)
                    FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
                    FROM (SELECT 'Feature' As type, ST_AsGeoJSON((lg.geom), 4)::json As geometry ,
                    row_to_json((SELECT l FROM (SELECT id,name_of_ho,capacity,quaratine ) As l
                            )) As properties
                    FROM quarantine  As lg ) As f ) As fc) as geojson`;

  var query = client.query(map_query);
  query.on("row", function (row) {
    result.push(row);
  });
  query.on("end", function () {
    return res.json(result[0].geojson);
  });
};

//
// exports.districts_boundary = (req, res, next) => {
//   var result =[];
//   //   var map_query=` SELECT (SELECT row_to_json(fc)
// //                   FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
// //                   FROM (SELECT 'Feature' As type, ST_AsGeoJSON((lg.geom), 4)::json As geometry ,
// //                   row_to_json((SELECT l FROM (SELECT id,name,chack_gate,quarantine,isolation ) As l
// //                           )) As properties
// //                   FROM districts  As lg ) As f ) As fc) as geojson`;

//     var map_query=  `SELECT (SELECT row_to_json(fc)
//     FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
//     FROM (SELECT 'Feature' As type, ST_AsGeoJSON((lg.geom), 4)::json As geometry ,
//     row_to_json(lp) As properties
//     FROM districts As lg INNER JOIN (
//     SELECT (districts.id)as id,name,chack_gate,quarantine,isolation,sum(confirmed)as confirmed,sum(recovered)as recovered, sum(deceased)as deceased
//     , sum(active)as active  FROM districts join cov_patient_details on districts.id = cov_patient_details.districts_id group by
//                 districts.id,name,chack_gate,quarantine,isolation) As lp ON lg.id = lp.id order by lp.confirmed DESC
//     )As f ) As fc) as geojson`;

//     var query = client.query(map_query);
//     query.on('row',function(row){
//         result.push(row);
//     });
//     query.on('end',function(){
//         return res.json(result[0].geojson);
//     });
// };

// SELECT (SELECT row_to_json(fc)
//       FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
//       FROM (SELECT 'Feature' As type, ST_AsGeoJSON((lg.geom), 4)::json As geometry ,
//       row_to_json(lp) As properties
//       FROM districts As lg INNER JOIN (
//       SELECT (districts.id)as id,name,sum(tested_positive)as confirmed,sum(cured)as recovered, sum(health_facilities_tested+check_gate_tested)as tested,
//         sum(death)as deceased, sum(active_case)as active  FROM districts join daily_report on districts.id = daily_report.district_id
//         where daily_report.date='${date}' and verified=true group by
//         districts.id,name) As lp ON lg.id = lp.id order by lp.confirmed DESC
//       )As f ) As fc) as geojson

exports.districts_boundary = (req, res, next) => {
  var result = [];

  var map_query = `SELECT (SELECT row_to_json(fc)
      FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
      FROM (SELECT 'Feature' As type, ST_AsGeoJSON((lg.geom), 4)::json As geometry ,
      row_to_json(lp) As properties
      FROM districts As lg INNER JOIN (
      SELECT (districts.id)as id,name,sum(tested_positive)as confirmed,sum(cured)as recovered, sum(tested)as tested, 
          sum(death)as deceased, sum(active_case)as active  FROM districts join daily_report on districts.id = daily_report.district_id group by 
                  districts.id,name) As lp ON lg.id = lp.id order by lp.confirmed DESC
      )As f ) As fc) as geojson`;

  var query = client.query(map_query);
  query.on("row", function (row) {
    result.push(row);
  });
  query.on("end", function () {
    return res.json(result[0].geojson);
  });
};

exports.districts_boundary_new = async (req, res, next) => {
  var result = [];

  // const dateresult = await db.query(
  //   sql`
  //     SELECT DISTINCT TO_CHAR(date::DATE, 'yyyy-mm-dd')AS date from daily_report WHERE verified=true ORDER BY date DESC limit 2
  //   `
  // );

  // const date = dateresult[0].date;
  // const lastupdated = dateresult[1].date;

  const date = moment().subtract(1, 'day').format("YYYY-MM-DD");

  const cummulative = await db.query(
    sql`
      SELECT district_id, sum(cumulative_positive)as confirmed,sum(cumulative_cured)as recovered,sum(cumulative_deaths)as deceased,sum(cumulative_tested) as tested from daily_report WHERE verified=true and date= ${date} GROUP BY district_id
    `, 
  );

  const total = await db.query(
      sql`
         select district_id, sum(tested) as tested, sum(cured) as recovered, sum(death) as deceased, sum(tested_positive) as confirmed from daily_report WHERE verified = true and date=${date} GROUP BY district_id
      `,
  )
  

  var map_query = `SELECT (SELECT row_to_json(fc)
  FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
  FROM (SELECT 'Feature' As type, ST_AsGeoJSON((lg.geom), 4)::json As geometry ,
  row_to_json(lp) As properties
  FROM districts As lg FULL OUTER JOIN (
  SELECT (districts.id)as id,name,sum(tested_positive)as confirmed,sum(cured)as recovered, sum(health_facilities_tested+check_gate_tested)as tested,
  sum(death)as deceased, sum(active_case)as active,

  (sum(ccc_o2_beds - ccc_o2_occupied)+sum(covid_hospital_o2_beds - covid_hospital_o2_bed_occupied)+sum(dchc_o2_beds - dchc_o2_occupied))as o2beds,

  (sum(ccc_non_o2_beds - ccc_non_o2_occupied)+sum(covid_hospital_non_o2_beds - covid_hospital_non_o2_bed_occupied)+sum(dchc_non_o2_beds - dchc_non_o2_beds_occupied))as NonO2Beds,

  (sum(covid_hospital_icu_beds - covid_hospitals_icu_bed_occupied)+sum(dchc_icu_beds - dchc_icu_beds_occupied))as IcuBeds

  FROM districts join daily_report on districts.id = daily_report.district_id
  where daily_report.date='${date}' and verified=true group by
  districts.id,name) As lp ON lg.id = lp.id order by lp.name
  )As f ) As fc) as geojson`;

  var query = client.query(map_query);
  query.on("row", function (row) {
    result.push(row);
  });
  query.on("end", function async () {
  for  (let index = 0; index < result[0].geojson.features.length; index++) {
      const element = result[0].geojson.features[index];
      // console.log(index);
      // console.log(result[0].geojson.features[index].properties);
      for (let index2 = 0; index2 < shp.features.length; index2++) {

      if (JSON.stringify(shp.features[index2].geometry.coordinates) === JSON.stringify(element.geometry.coordinates)) {     
        // console.log(result[0].geojson.features[index].properties);
          if (result[0].geojson.features[index].properties == null){
          // result[0].geojson.features[index]['properties'] = 
          //       {
            // name: shp.features[index2].properties.name,
          //           id:  shp.features[index2].properties.id,
          //           confirmed: 0,
          //           recovered: 0,
          //           tested: 0,
          //           deceased: 0,
          //           active:0,
          //       }
          //     }
            result[0].geojson.features[index].properties = {}
            result[0].geojson.features[index]['properties']['name'] = shp.features[index2].properties.name;
            result[0].geojson.features[index]['properties']['id'] = shp.features[index2].properties.id;
          
            result[0].geojson.features[index]['properties']['confirmed'] = 0;
            result[0].geojson.features[index]['properties']['recovered'] = 0;
            result[0].geojson.features[index]['properties']['tested'] = 0;
            result[0].geojson.features[index]['properties']['deceased'] = 0;
            result[0].geojson.features[index]['properties']['active'] = 0;
            result[0].geojson.features[index].properties['icubeds']= 0;
            result[0].geojson.features[index].properties['o2beds']= 0;
            result[0].geojson.features[index].properties['nono2beds']= 0;
          }
          result[0].geojson.features[index].properties['cumConfirmed']= 0;
          result[0].geojson.features[index].properties['cumRecovered']= 0;
          result[0].geojson.features[index].properties['cumDeceased']= 0;
          result[0].geojson.features[index].properties['cumTested']= 0;
        }
      }
      // console.log( result[0].geojson.features[index] );
    }
    for(let index = 0; index < result[0].geojson.features.length; index++) {
        for(let j=0; j < cummulative.length; j++){
            if (result[0].geojson.features[index].properties.id  === cummulative[j].district_id){
                result[0].geojson.features[index].properties['cumConfirmed'] += cummulative[j].confirmed;
                result[0].geojson.features[index].properties['cumRecovered'] += cummulative[j].recovered;
                result[0].geojson.features[index].properties['cumDeceased'] += cummulative[j].deceased;
                result[0].geojson.features[index].properties['cumTested'] += cummulative[j].tested;
            }
          }
            for(k=0; k < total.length; k++){
            if (result[0].geojson.features[index].properties.id  === total[k].district_id){
                result[0].geojson.features[index].properties['cumConfirmed'] += total[k].confirmed;
                result[0].geojson.features[index].properties['cumRecovered'] += total[k].recovered;
                result[0].geojson.features[index].properties['cumDeceased'] += total[k].deceased;
                result[0].geojson.features[index].properties['cumTested'] += total[k].tested;
            }
        }
    }    
    return res.json(result[0].geojson);
  });
};

exports.districts_boundary_new_error = async (req, res, next) => {
  var result = [];

  const dateresult = await db.query(
    sql`
      SELECT DISTINCT TO_CHAR(date::DATE, 'yyyy-mm-dd')AS date from daily_report WHERE verified=true ORDER BY date DESC limit 2
    `
  );

  const date = dateresult[0].date;
  const lastupdated = dateresult[1].date;

  const cummulative = await db.query(
    sql`
      SELECT district_id, sum(cumulative_positive)as confirmed,sum(cumulative_cured)as recovered,sum(cumulative_deaths)as deceased,sum(cumulative_tested) as tested from daily_report WHERE verified=true and date= ${lastupdated} GROUP BY district_id
    `, 
  );

  const total = await db.query(
      sql`
         select district_id, sum(tested) as tested, sum(cured) as recovered, sum(death) as deceased, sum(tested_positive) as confirmed from daily_report WHERE verified = true and date=${date} GROUP BY district_id
      `,
  )
  

  var map_query = `SELECT (SELECT row_to_json(fc)
  FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
  FROM (SELECT 'Feature' As type, ST_AsGeoJSON((lg.geom), 4)::json As geometry ,
  row_to_json(lp) As properties
  FROM districts As lg FULL OUTER JOIN (
  SELECT (districts.id)as id,name,sum(tested_positive)as confirmed,sum(cured)as recovered, sum(health_facilities_tested+check_gate_tested)as tested,
  sum(death)as deceased, sum(active_case)as active,
  (sum(ccc_o2_beds - ccc_o2_occupied)+sum(covid_hospital_o2_beds - covid_hospital_o2_bed_occupied)+sum(dchc_o2_beds - dchc_o2_occupied))as o2beds,
  (sum(ccc_non_o2_beds - ccc_non_o2_occupied)+sum(covid_hospital_non_o2_beds - covid_hospital_non_o2_bed_occupied)+sum(dchc_non_o2_beds - dchc_non_o2_beds_occupied))as NonO2Beds,
  (sum(covid_hospital_icu_beds - covid_hospitals_icu_bed_occupied)+sum(dchc_icu_beds - dchc_icu_beds_occupied))as IcuBeds
  FROM districts join daily_report on districts.id = daily_report.district_id
  where daily_report.date='${date}' and verified=true group by
  districts.id,name) As lp ON lg.id = lp.id order by lp.name 
  )As f ) As fc) as geojson`;

  var query = client.query(map_query);
  query.on("row", function (row) {
    result.push(row);
  });
  query.on("end", function async () {
  for  (let index = 0; index < result[0].geojson.features.length; index++) {
      const element = result[0].geojson.features[index];
      for (let index2 = 0; index2 < shp.features.length; index2++) {
        if (
          shp.features[index2].geometry.coordinates.length ===
          element.geometry.coordinates.length
        ) {
            
          if (result[0].geojson.features[index].properties === null)
            result[0].geojson.features[index].properties = {
              name: shp.features[index].properties.name,
              id:  shp.features[index].properties.id,
              confirmed: 0,
              recovered: 0,
              tested: 0,
              deceased: 0,
              active:0,


            };
            result[0].geojson.features[index].properties['cumConfirmed']= 0;
            result[0].geojson.features[index].properties['cumRecovered']= 0;
            result[0].geojson.features[index].properties['cumDeceased']= 0;
            result[0].geojson.features[index].properties['cumTested']= 0;
       
        }
      }
    }

    for(let index = 0; index < result[0].geojson.features.length; index++) {
        const element = result[0].geojson.features[index];
        for(j=0; j < cummulative.length; j++){
            if (result[0].geojson.features[index].properties.id  === cummulative[j].district_id){
                result[0].geojson.features[index].properties['cumConfirmed'] += cummulative[j].confirmed;
                result[0].geojson.features[index].properties['cumRecovered'] += cummulative[j].recovered;
                result[0].geojson.features[index].properties['cumDeceased'] += cummulative[j].deceased;
                result[0].geojson.features[index].properties['cumTested'] += cummulative[j].tested;
            }
            if (result[0].geojson.features[index].properties.id  === total[j].district_id){
                result[0].geojson.features[index].properties['cumConfirmed'] += total[j].confirmed;
                result[0].geojson.features[index].properties['cumRecovered'] += total[j].recovered;
                result[0].geojson.features[index].properties['cumDeceased'] += total[j].deceased;
                result[0].geojson.features[index].properties['cumTested'] += total[j].tested;
            }
        }
    }
    return res.json(result[0].geojson);
  });
};


//
exports.district_list = (req, res, next) => {
  var result = [];
  var data_query = ` SELECT id, name FROM districts order by name`;

  var query = client.query(data_query);
  query.on("row", function (row) {
    result.push(row);
  });
  query.on("end", function () {
    return res.json(result);
  });
};
