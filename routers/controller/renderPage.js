const express = require("express");
const firebase = require("firebase");
const fetch = require("node-fetch");

const router = express.Router();
const database = firebase.database();
const config = require("../../json/config.json");
const features = require("../../json/features.json");

router.use(require("express-session")(config.session));

router.get("/", async (request, response) => {
    if (!request.session.bearer_token) {
        response.status(200).render("pages/session-off/home", {
            features: features.list,
            root: "./views/"
        });
    } else {
        response.status(200).render("pages/session-on/home", {
            user: request.session.user_info,
            features: features.list,
            root: "./views/"
        });
    };
});

router.get("/commands", async (request, response) => {
    if (!request.session.bearer_token) {
        let cmds = await database.ref(`admin/commands/category`).once("value").then(async function (db) {
            return db.val();
        });

        response.status(200).render("pages/session-off/commands", {
            cmd: cmds,
            conversion: require("../../json/category.json"), 
            root: "./views/"
        });
    } else {
        let cmds = await database.ref(`admin/commands/category`).once("value").then(async function (db) {
            return db.val();
        });

        response.status(200).render("pages/session-on/commands", {
            user: request.session.user_info,
            cmd: cmds,
            conversion: require("../../json/category.json"), 
            root: "./views/"
        });
    };
});

router.get("/about", async (request, response) => {
    if (!request.session.bearer_token) {
        response.status(200).render("pages/session-off/about", {
            root: "./views"
        });
    } else {
        response.status(200).render("pages/session-on/about", {
            user: request.session.user_info,
            root: "./views"
        });
    };
});

module.exports = router;