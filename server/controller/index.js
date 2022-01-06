var client = require('../model');
var moment = require('moment');

// 
exports.visitors_get_all = (req, res, next) =>{
    var result =[];
    var query=client.query(` 
    select initcap(visitors.name)as name, initcap(father_name)as father_name, age_group, phone_number, 
    coming_from_place, going_to_district_id, going_to_place, id_card_type,
    id_card_number, visited_other_place, travel_history, temprature, cough, 
    sore_throat, difficulty_breathing, suspected, initcap(driver_name)driver_name, driver_phone, vehicle_number,
    remarks, user_id, entry_date,(entry_gate.name)as gate_name,(states.name)as state,(districts.name)as district,
    gender, difficult_breathing_details, occupation, occupation_details, is_domicile, domicile_district, cough_details,
    sore_throat_details, test_result, doctors_recommandation
    from visitors join users on visitors.user_id=users.id join entry_gate on users.check_gate_id = entry_gate.id 
    join districts on districts.id = visitors.going_to_district_id join states on visitors.coming_from_state_id = states.id 
    ORDER BY entry_date DESC
`);
    query.on('row', function(row){      
        if(row.suspected && row.cough && row.sore_throat && row.difficulty_breathing && row.visited_other_place){
            row.suspected= row.cough =row.sore_throat = row.difficulty_breathing = row.visited_other_place ='Yes';
            // row.cough = 'Yes';
        } else{
            row.suspected= row.cough = row.sore_throat = row.difficulty_breathing = row.visited_other_place ='No';
            // row.cough = 'No';
        }
        row.date=moment(row.entry_date).format('YYYY-MM-DD');       
        result.push(row); 
    });

    query.on('end', function(){
        return res.json(result);
    });
};

// 
exports.visitors_suspected_visitors = (req, res, next) =>{
    var result =[];
    var query=client.query(` SELECT visitors.*,(entry_gate.name)as gate_name, (districts.name)as districts from visitors join users on visitors.user_id=users.id join entry_gate on users.check_gate_id = entry_gate.id join districts on districts.id = visitors.going_to_district_id where suspected = true`);
    query.on('row', function(row){  
        row.entry_date=moment(row.entry_date).format('YYYY-MM-DD');       
        result.push(row); 
    });

    query.on('end', function(){
        return res.json(result);
    });
};

// 
exports.visitors_suspected_visitors_count = (req, res, next) =>{
    var result =[];
    var query=client.query(` select count(id)as screened,(select count(id) as suspected from visitors where suspected = true) from visitors`);
    query.on('row', function(row){        
        result.push(row); 
    });

    query.on('end', function(){
        return res.json(result);
    });
};

exports.webtotal_visiter = (req, res, next) =>{
    var result =[];
    client.query(`UPDATE public.web_visitor_count_log SET count=count+1`);
        var query=client.query(` select count from web_visitor_count_log `);
        query.on('row', function(row){        
            result.push(row); 
        });

        query.on('end', function(){
            return res.json(result);
        });
}

exports.webtotal_visiter_admin = (req, res, next) =>{
    var result =[];
    var query=client.query(` select count from web_visitor_count_log `);
    query.on('row', function(row){        
        result.push(row); 
    });

    query.on('end', function(){
        return res.json(result);
    });
}