const express = require("express");
const router = express.Router();

router.get("/add", (request, response) => {
    response.redirect("https://discord.com/oauth2/authorize?client_id=719557072429252618&permissions=8&scope=bot");
});

router.get("/support", (request, response) => {
    response.redirect("https://discord.gg/syBGTmcJJq");
});

router.get("/twitter", (request, response) => {
    response.redirect("https://twitter.com/TiaGoiNsaNy");
});

router.get("/github", (request, response) => {
    response.redirect("https://github.com/TiaGoiNsaNy");
});

router.get("/donate", (request, response) => {
	response.redirect("https://www.paypal.com/donate?business=K4DA7PQ8N2NDY&item_name=Bot%C3%A3o+para+Doa%C3%A7%C3%B5es+do+Periquitosvaldo+Bot%21&currency_code=BRL");
});

module.exports = router;