var client = require("../model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { v4: uuid4 } = require("uuid");
const generator = require("generate-password");

dotenv.config();

exports.changePassword = (req, res) => {
  const key = req.body.key;
  const currentPassword = req.body.currentPassword;
  // console.log(key, currentPassword);

  client
    .query(
      `select * from users where key = '${key}'`,
      (err, result, fields) => {
        if (result.rows.length < 1) {
          return res.status(401).json({
            message: "Unauthorized Access",
            error: true,
          });
        }
        bcrypt.compare(
          currentPassword,
          result.rows[0].password,
          (err, result) => {
            const newpassword = generator.generate({
              length: 20,
              numbers: true,
              symbols: true,
            });
            // console.log(newpassword, result)
            const newkey = uuid4();
            if (err) {
              return res.status(401).json({
                message: "Unauthorized Access",
                error: true,
              });
            }
            if (result) {
              bcrypt.hash(newpassword, 10, (err, hash) => {
                // console.log(hash);
                if (err) {
                  return res.status(500).json({
                    error: err,
                  });
                } else {
                  client.query(`
                    update public.users set password = '${hash}',row_password = '${newpassword}',key='${newkey}' where key = '${key}'
                  `,(err, result, fields) => {
                    // console.log(result);
                    if (err) {
                      res.status(500).json({
                        message: "Some thing wend wrong",
                        error: err,
                      });
                    } else {
                      res.status(200).json({
                        message: "Password Changed",
                        success: true
                      });
                    }
                  })
                }
              })
            }
          }
        );
      }
    )
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};
