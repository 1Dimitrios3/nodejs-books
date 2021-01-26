// const { Router } = require("express");
const express = require("express");
const router = express.Router();
const dbconnection = require("../lib/db");
const Book = require("../models/book");

// GET - READ
router.get("/list/:message?", (req, res, next) => {
  const query = "SELECT * FROM books";
  const fullUrl = req.protocol + "://" + req.get("host") + req.baseUrl;
  dbconnection.query(query, function (err, rows) {
    if (err) {
      res.render("books", {
        title: "Books - ERROR",
        books: "",
        message: req.params.message,
      });
    } else {
      res.render("books", {
        title: "My Books",
        books: rows,
        message: req.params.message,
        url: fullUrl,
      });
    }
  });
});

// shows the actual form for the model book in order to
// collect data from the client and send them to the backend
router.get("/add", (req, res, next) => {
  res.render("books_new", { title: "Books - Add New", books: "", message: "" });
});

// POST
router.post("/add", (req, res, next) => {
  let book = new Book(undefined, req.body.title, req.body.author);
  // const query =
  //   "INSERT INTO `books` (`title`, `author`) VALUES ('" +
  //   book.title +
  //   "', '" +
  //   book.author +
  //   "')";

  // const query2 = `INSERT INTO books (title, author) VALUES('${book.title}', '${book.author}');`;

  const query3 = "INSERT INTO books (title, author) VALUES (  ?, ?)";
  dbconnection.execute(
    query3,
    [book.title, book.author],
    (err, result, fields) => {
      // Not OK - Error!!!
      if (err) {
        res.render("books_new", {
          title: "Books - Add New",
          message: "Error inserting data to the database!",
        });
      }
      // All OK!!!
      else {
        res.redirect("/books/list/All OK!!!");
      }
    }
  );
});

// fix delete with invalid id ???
// DELETE
// http://localhost:3000/books/delete/1   <--- we delete the record with id = 1;

router.get("/delete/:id", (req, res, next) => {
  const query = "DELETE FROM `books` WHERE `id` = ?";
  const bookId = req.params.id;
  const fullUrl = req.protocol + "://" + req.get("host") + req.baseUrl;
  dbconnection.execute(query, [bookId], (err, result, fields) => {
    if (err) {
      res.render("books_error", {
        title: "error_page",
        book: "",
        message: "Could not delete this book!",
        url: fullUrl,
      });
    } else {
      res.redirect("/books/list/Book with id " + bookId + " is deleted!");
    }
  });
});

// fix edit with invalid id ???
// UPDATE
// show form with data filled

router.get("/edit/:id", (req, res, next) => {
  const bookId = req.params.id;
  const query = "SELECT * FROM `book` WHERE `id` = ?";
  dbconnection.execute(query, [bookId], (err, result, fields) => {
    if (err) {
      res.render("books_edit", {
        title: "Books - Edit",
        message: "There was an error editing this book!",
        book: "",
      });
    } else {
      console.log(result[0]);
      let book = new Book(result[0].id, result[0].title, result[0].author);
      console.log(book);
      res.render("books_edit", {
        title: "Books - Edit",
        message: "",
        book: book,
      });
    }
  });
});

// UPDATE
// call router.post('/update/:id') // do this at home

router.post("/update", (req, res, next) => {
  let book = new Book(req.body.id, req.body.title, req.body.author);
  const query = "UPDATE `books` SET title = ?, author = ? WHERE id = ?";
  dbconnection.execute(
    query,
    [book.title, book.author, book.id],
    (err, result, fields) => {
      if (err) {
        res.render("books_edit", {
          title: "Books - Edit",
          message: "Update failed! Check the values again!",
          book: book,
        });
      } else {
        res.redirect(
          "/books/list/Book with id " + req.body.id + " is updated!"
        );
      }
    }
  );
});

module.exports = router;
