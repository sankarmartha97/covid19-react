var client = require('../model');
var moment = require('moment');

// exports.total_vs_suspected_data = (req, res, next) => {
//     var result =[];
//     var query=client.query(` select count(id) as total,Date(entry_date),(select count(id) from visitors where suspected=true)as suspected from visitors group by Date(entry_date)   `);
//     query.on('row', function(row){    
//         row.date=moment(row.date).format('DD-MM-YYYY');
//         result.push(row);
//     });
//     query.on('end', function(){
//         return res.json(result);
//     });
// };

// 
exports.total_vs_suspected_data = (req, res, next) => {
    var result =[];
    var query=client.query(` select sum(citizenscreened)as citizenscreened,sum(quarantined)as quarantined,date from cov_patient_details group by date order by date
    `);
    query.on('row', function(row){    
        row.date=moment(row.date).format('DD-MM-YYYY');
        result.push(row);
    });

    query.on('end', function(){
        return res.json(result);
    });
};


// exports.suspected_vs_chechpoint = (req, res, next) => {
//     var result =[];
//     var query=client.query(` select count(visitors.id)as suspected,visitors.user_id,entry_gate.name from visitors join users on visitors.user_id=users.id join entry_gate on users.check_gate_id = entry_gate.id where suspected=true group by user_id,entry_gate.name  `);
//     query.on('row', function(row){        
//         result.push(row);
//     });

//     query.on('end', function(){
//         return res.json(result);
//     });
// };


// 
exports.suspected_vs_chechpoint = (req, res, next) => {
    var result =[];
    var query=client.query(` 
    select sum(recovered)as recovered, sum(active)as active,sum(confirmed)as confirmed, 
    sum(deceased)as deceased from cov_patient_details  `);
    query.on('row', function(row){        
        result.push(row);
    });

    query.on('end', function(){
        return res.json(result);
    });
};
