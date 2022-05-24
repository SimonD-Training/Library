const express = require("express");
const body_parser = require("body-parser");
const { compare } = require("bcrypt");
const database = require("../lib/db/database");
const cookieParser = require("cookie-parser");
const session = require("express-session");

let router = express.Router();
router.use(body_parser.json());
router.use(cookieParser());
router.use(
  session({
    secret: "2n3r2y983rwnw0r9n20r20r8yc20r2n",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 120000 },
  })
);

router.post("/login", (req, res) => {
  // req.body.password
  // req.body.email
  database.query(
    `SELECT password FROM librarians WHERE email = ${req.body.email}`,
    (err, rows) => {
      if (err) throw err;
      else {
        if (rows.length == 1) {
          compare(
            req.body.password,
            Buffer.from(rows[0].password, "binary").toString(),
            (err, same) => {
              if (err) throw err;
              else if (same) {
                res.status(200).send(true);
                req.session.loggedIn = true;
              } else {
                res.status(401).send(false);
              }
            }
          );
        } else {
          res.sendStatus(409);
        }
      }
    }
  );
});

router.post("/request", (req, res) => {
  // req.body.student_id
  // req.body.book_id
  database.query(
    `INSERT INTO requests (student_id, book_id, date_requested) VALUES ( ${
      req.body.student_id
    }, ${req.body.book_id}, '${new Date().toISOString().slice(0, 10)}')`,
    (err, rows) => {
      if (err) throw err;
      else {
        res.status(200).send(true);
      }
    }
  );
});

router.get("/api/requests", (req, res) => {
  if (req.session.loggedIn == true) {
    database.query("SELECT * FROM requests", (err, rows) => {
      if (err) throw err;
      else {
        res.status(200).send(rows);
      }
    });
  } else {
      res.status(401).end();
  }
});

router.put("/request/approval", (req, res) => {
  // req.body.id
  let now = new Date();
  database.query(
    `UPDATE requests (state, date_due) SET ( 1, ${now.setDate(
      now.getDate() + 14
    )}) WHERE id = ${req.body.id}`,
    (err, rows) => {
      if (err) throw err;
      else {
        res.status(200).send(true);
      }
    }
  );
});

router.put("/request/disapproval", (req, res) => {
  // req.body.id
  let now = new Date();
  database.query(
    `UPDATE requests (state, date_due) SET ( 0, null) WHERE id = ${req.body.id}`,
    (err, rows) => {
      if (err) throw err;
      else {
        res.status(200).send(true);
      }
    }
  );
});

module.exports = router;
