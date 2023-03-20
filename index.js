const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const UserRouter = require("./routes/auth/user");

const PORT = 8080;

async function main() {
	try {
		await mongoose.connect("mongodb+srv://alok8bb:10bK105@cluster0.m0rhxon.mongodb.net/?retryWrites=true&w=majority");
		console.log("[INFO] Database connected successfully!");
	} catch (err) {
		return console.error(err);
	}

	app.use(cors());
	app.use(express.json());

	app.get("/", (req, res) => {
		res.send("Hei");
	});
	app.use("/user", UserRouter);

	app.use((err, req, res, next) => {
		if (res.headersSent) {
			return next(err);
		}

		res.status(500).json({
			error: err,
		});
	});

	app.listen(PORT, () => {
		console.log(`[INFO] Server started on ${PORT}`);
	});
}

main();
