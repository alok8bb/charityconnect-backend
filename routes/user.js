const express = require("express");
const uuid = require("uuid");
const router = express.Router();

const User = require("../models/user");

router.post("/register", async (req, res) => {
	const { email, password, phone, name } = req.body;
	if (!phone || !name || !password || !email) {
		return res.status(400).json({
			error: "invalid request body!",
		});
	}

	if (!/^\S+@\S+\.\S+$/.test(email)) {
		return res.status(400).send({
			error: "invalid email!",
		});
	}

	if (password.length < 8) {
		return res.status(400).json({
			error: "password should contain more than 8 characters!",
		});
	}

	const user = await User.findOne({
		email: email,
	});

	if (user) {
		return res
			.status(404)
			.json({ error: "user with email already exists!" });
	}

	await User.create({
		email: email,
		password: password,
		phone: phone,
		name: name,
	});

	res.status(200).json({
		message: "user registered successfully!",
	});
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
    if (!email || !password) {
		return res.status(400).send({
			error: "invalid request body!",
		});
    }

	if (!/^\S+@\S+\.\S+$/.test(email)) {
		return res.status(400).send({
			error: "invalid email!",
		});
	}

	if (password.length < 8) {
		return res.status(400).json({
			error: "password should contain more than 8 characters!",
		});
	}

	const user = await User.findOne({ email });
	if (!user) {
		return res
			.status(404)
			.json({ error: "user with specified email does not exist!" });
	}

	if (user.password != password) {
		return res.status(401).json({
			error: "invalid email or password",
		});
	}

	const token = uuid.v4();
	user.token = token;
    await user.save();

	return res
		.status(200)
		.json({ message: "user login successful!", token: token });
});

module.exports = router;
