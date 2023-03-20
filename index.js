const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserRouter = require("./routes/auth/user");

const PORT = 8080;

async function main() {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/ngo");
		console.log("[INFO] Database connected successfully!");
	} catch (err) {
		return console.error(err);
	}

	app.use(express.json());
	app.use("/user", UserRouter);
	app.listen(PORT, () => {
		console.log(`[INFO] Server started on ${PORT}`);
	});
}

main();
