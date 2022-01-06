var client = require("../model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { v4: uuid4 } = require("uuid");
const generator = require("generate-password");

dotenv.config();

//
exports.users_mobile_get_all = (req, res, next) => {
  var result = [];
  var query = client.query(
    ` SELECT * from users WHERE status = false and mobile_user = true and rejected = false`
  );
  query.on("row", function (row) {
    result.push(row);
    // console.log(result);
  });

  query.on("end", function () {
    return res.json(result);
  });
};

//
exports.user_verify_status = (req, res, next) => {
  const userid = req.params.id;
  const { status, registraion } = req.body;
  // if(status =='false'){
  //     console.log(userid,status,rejected_status);
  //     rejected_status = true;
  // }

  // if(!status){
  //     console.log(!status);
  // }else{
  //     console.log(status);
  // }

  client.query(
    ` UPDATE public.users SET updated_date=now(), status=${status},rejected=${!status} WHERE id=${userid} `,
    (err, result) => {
      if (!err) {
        if (status) {
          client.query(`
            INSERT INTO public.users_apperval_log(
                user_id, name, phone, check_gate_id, email)
                select id,name,phone,check_gate_id,email from users where id=${userid}
            `);
        }
        var result = [];
        if (!registraion) {
          var query = client.query(
            `  SELECT * from users WHERE status = true and mobile_user = true and rejected = false`
          );
        } else {
          var query = client.query(
            `  SELECT * from users WHERE status = false and mobile_user = true and rejected = false`
          );
        }
        query.on("row", function (row) {
          result.push(row);
        });
        query.on("end", function () {
          return res.json(result);
        });
      } else {
        console.log(err);
      }
    }
  );
};

//
exports.user_mobile_aproved_get_all = (req, res, next) => {
  var result = [];
  var query = client.query(` 
    SELECT users.id,users.name,phone, email,(entry_gate.name) as check_gate from users join entry_gate on entry_gate.id = users.check_gate_id WHERE status = true and mobile_user = true and rejected = false
    `);
  query.on("row", function (row) {
    result.push(row);
  });

  query.on("end", function () {
    return res.json(result);
  });
};

//
exports.login = (req, res, next) => {
  const { username, password } = req.body;
  // if(username =="Admin"){
  //     return res.status(404).json({
  //         message: 'Admin account is not created yet.',
  //         error: false,
  //         login: false
  //     });
  // }
  client
    .query(
      `select * from users where username ='${username}'`,
      (err, result, fields) => {
        if (result.rows.length < 1) {
          return res.status(401).json({
            message: "Unauthorized Access",
            error: true,
          });
        }
        const user = result;
        bcrypt.compare(password, result.rows[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Unauthorized Access",
              error: true,
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                username: user.rows[0].name,
                userId: user.rows[0].id,
                password: user.rows[0].password,
                email: user.rows[0].email,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: 120000,
              }
            );
            return res.status(200).json({
              message: "Authorization successful",
              error: false,
              token: token,
              key: user.rows[0].key,
              requestId: user.rows[0].district_id,
              type: user.rows[0].role,
              name: user.rows[0].name
            });
          }
          res.status(401).json({
            message: "Unauthorized Access",
            error: true,
          });
        });
      }
    )
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

//
exports.singup = (req, res, next) => {
  const { name, username, district, userphone, email } = req.body;
  let role = req.body.role;
  if (!req.body.role) {
    role = "district_admin";
  }
  var password = generator.generate({
    length: 10,
    numbers: true,
  });
  // console.log(password);
  // console.log(req.body);
  // console.log(uuid4());
  // bcrypt.hash(req.body.password, 10, (err,hash) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      // console.log(`INSERT INTO public.users(
      //     name, password, phone, email, district_id, key, row_password, role, username)
      //     VALUES ('${name}', '${hash}', '${userphone}','${email}','${district}','${uuid4()}','${password}','${role}', '${username}')`)
      client.query(
        `INSERT INTO public.users(
                name, password, phone, email, district_id, key, row_password, role, username)
                VALUES ('${name}', '${hash}', '${userphone}','${email}','${district}','${uuid4()}','${password}','${role}', '${username}')`,
        (err, rows, fields) => {
          if (err) {
            res.status(500).json({
              message: "User not created",
              error: err,
            });
          } else {
            res.status(201).json({
              message: "User created",
              error: err,
            });
          }
        }
      );
    }
  });
};

exports.user_delete = (req, res, next) => {
  const userid = req.params.id;
  const status = false;
  client.query(
    ` UPDATE public.users SET updated_date=now(), 	email='', status=${status},rejected=${!status} WHERE id=${userid} `,
    (err, result) => {
      if (!err) {
        var result = [];
        var query =
          client.query(`  SELECT users.id,users.name,phone, email,(entry_gate.name) as check_gate from users join entry_gate on entry_gate.id = users.check_gate_id WHERE status = true and mobile_user = true and rejected = false 
            order by users.updated_date `);
        query.on("row", function (row) {
          result.push(row);
        });
        query.on("end", function () {
          return res.json(result);
        });
      } else {
        console.log(err);
      }
    }
  );
};
