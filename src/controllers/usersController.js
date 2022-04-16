/* eslint-disable no-unused-expressions */
import { User } from "../../models";

class Users {
  static create(req, res) {
    const { email, password } = req.body;
    if (email === "" || password === "") {
      res.status(500).json({
        message: "The email and password field must not be empty",
      });
    }
    User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        if (user) {
          res.status(400).json({
            message: "User with the email exists",
          });
        } else {
          User.create({
            email,
            password,
          })
            .then((userData) => {
              if (userData) {
                res.status(200).json({
                  message: "User successfully created",
                  userData,
                });
              }
            })
            .catch((err) =>
              res.status(400).json({
                error: err.message,
              })
            );
        }
      })
      .catch((err) =>
        res.status(400).json({
          error: err.message,
        })
      );
  }
}

export default Users;
