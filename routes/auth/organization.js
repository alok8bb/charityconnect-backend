const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
    const {name, description, pincode, unique_id, type, website, phone, address} = req.body;
    
});

module.exports = router;