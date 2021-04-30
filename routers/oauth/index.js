const express = require("express");
const expressSession = require("express-session");
const firebase = require("firebase");
const fetch = require("node-fetch");
const FormData = require("form-data");

const router = express.Router();
const database = firebase.database();
const config = require("../../json/config.json");

router.use(expressSession(config.session));

router.get("/login/callback", async (request, response) => {
    const accessCode = request.query.code;

    if (!accessCode) return response.redirect("/");

    const data = new FormData();

    data.append("client_id", config.oauth2.client_id);
    data.append("client_secret", process.env.CLIENT_SECRET);
    data.append("grant_type", "authorization_code");
    data.append("redirect_uri", config.oauth2.redirect_uri);
    data.append("scope", "identify");
    data.append("code", accessCode);

    const json = await (await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        body: data
    })).json();

    const userJson = await (await fetch("https://discord.com/api/users/@me", {
        headers: {
            authorization: `${json.token_type} ${json.access_token}`,
        },
    })).json();

    request.session.user_info = userJson;
    request.session.bearer_token = json.access_token;

    response.redirect("/");
});

router.get("/login", (request, response) => {
    response.redirect(`https://discord.com/api/oauth2/authorize` +
        `?client_id=${config.oauth2.client_id}` +
        `&redirect_uri=${encodeURIComponent(config.oauth2.redirect_uri)}` +
        `&response_type=code&scope=${encodeURIComponent(config.oauth2.scopes.join(" "))}`);
});

router.get("/logout", (request, response) => {
    if (!request.session.bearer_token) {
        response.redirect("/");
    } else {
        request.session.destroy();
        response.redirect("/");
    };
});

module.exports = router;