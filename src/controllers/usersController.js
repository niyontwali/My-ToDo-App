/* eslint-disable no-unused-expressions */
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../../models";

dotenv.config();

class Users {
  static create(req, res) {
    const { fullname, email } = req.body;
    const password = bcrypt.hashSync(
      req.body.password,
      Number.parseInt(process.env.SALT_ROUNDS, 10)
    );
    if (fullname === "" || email === "" || password === "") {
      return res.status(500).json({
        message: "The email and password field must not be empty",
      });
    }
    return User.findOne({
      where: {
        email,
      },
    })
      .then((emailExists) => {
        if (emailExists) {
          return res.status(400).json({
            message: "User with the email exists",
          });
        }
        return User.create({
          fullname,
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
      })
      .catch((err) =>
        res.status(400).json({
          error: err.message,
        })
      );
  }

  static allUsers(req, res) {
    return User.findAll({
      attributes: {
        exclude: ["password"],
      },
    })
      .then((users) => {
        if (users.length === 0) {
          return res.status(404).json({
            message: "There are no users registered yet!",
          });
        }
        return res.status(200).json({
          users,
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err.message,
        });
      });
  }

  static findOneUser(req, res) {
    const { id } = req.params;
    return User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["password"],
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            message: "User with that id does not exist",
          });
        }
        return res.status(200).json({
          user,
        });
      })
      .catch((err) =>
        res.status(400).json({
          error: "invalid input id, it must be a number" || err.message,
        })
      );
  }

  static update(req, res) {
    const { id } = req.params;
    const { fullname } = req.body;
    return User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["password"],
      },
    }).then((user) => {
      if (!user) {
        return res.status(400).json({
          message: `The user with id of ${id} does not exist`,
        });
      }
      return user
        .update({
          fullname: fullname || user.fullname,
        })
        .then((updatedUser) => {
          res.status(200).json({
            message: `User with ${id} was updated successfully`,
            updatedUser: {
              fullname: updatedUser.fullname,
              email: updatedUser.email,
            },
          });
        });
    });
  }

  static delete(req, res) {
    const { id } = req.params;
    return User.findOne({
      where: {
        id,
      },
    }).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: `User with id of ${id} does not exist`,
        });
      }
      return user.destroy().then(() => {
        res.status(200).json({
          message: `User with id of ${id} successfully deleted`,
        });
      });
    });
  }
}

export default Users;
