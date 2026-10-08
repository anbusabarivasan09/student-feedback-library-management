const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");

const Book = require("./models/Book");

dotenv.config({ path: path.join(__dirname, "models", ".env") });

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/ping", (req, res) => {
    res.send("pong");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error.message);
    });

app.post("/books", async (req, res) => {
    try {
        const book = new Book(req.body);

        await book.save();

        res.status(201).json({
            message: "Book inserted successfully",
            book: book
        });
    } catch (error) {
        res.status(400).json({
            message: "Error inserting book",
            error: error.message
        });
    }
});

app.put("/books/:bookId", async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate(
            { bookId: req.params.bookId },
            { availableCopies: req.body.availableCopies },
            { new: true }
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.json({
            message: "Available copies updated successfully",
            book: book
        });
    } catch (error) {
        res.status(400).json({
            message: "Error updating book",
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});