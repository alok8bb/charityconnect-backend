const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const UserRouter = require("./routes/auth/user");

const PORT = 8080;

async function main() {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/ngo");
		console.log("[INFO] Database connected successfully!");
	} catch (err) {
		return console.error(err);
	}

	app.use(cors);
	app.use(express.json());
	app.use("/user", UserRouter);

	app.use("/", (req, res) => {
		res.send("hi");});
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
