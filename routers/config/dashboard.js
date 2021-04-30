const express = require("express");
const { Permissions } = require("discord.js");
const firebase = require("firebase");
const fetch = require("node-fetch");
const ms = require("parse-ms");

const router = express.Router();
const database = firebase.database();
const config = require("../../json/config.json");

router.use(require("express-session")(config.session));

router.get("/", async (request, response) => {
	if (!request.session.bearer_token) {
		response.redirect("/login");
	} else {
        response.status(200).render("pages/session-on/dashboard", {
            user: request.session.user_info,
            root: "./views/"
        });
	};
});

router.get("/user", async (request, response) => {
    if (!request.session.bearer_token) {
        response.redirect("/login");
    } else {
        response.status(200).render("pages/session-on/dashboard/error", {
            user: user,
            title: "Infelizmente esse local está bloqueado!",
            link: "/",
            root: "./views/"
        });
    };
});

router.get("/daily", async (request, response) => {
    if (!request.session.bearer_token) {
        response.redirect("/login");
    } else {
        let user = request.session.user_info;
        let amount = Math.floor(Math.random() * 1000) + 2000; 

        database.ref(`admin/daily/${user.id}`).once("value").then(async function (db) {
            if (db.val() == null) {
                database.ref(`admin/daily/${user.id}`).set({
                    daily: Date.now()
                });

                database.ref(`admin/social/${user.id}`).once("value").then(async function(data) {
                    if (data.val() == null) {
                        database.ref(`admin/social/${user.id}`).set({
                            aboutme: "Amo o Periquitosvaldo! Para mudar essa descrição, use 'sobremim'.",
                            background: "https://cdn.shopify.com/s/files/1/1003/7610/products/Black_Hexagon_Pattern_Wallpaper_Mural_a_700x.jpg",
                            model: "default",
                            money: amount
                        });
                    } else {
                        database.ref(`admin/social/${user.id}`).update({
                            money: data.val().money + amount
                        });
                    };
                });

                response.status(200).render("pages/session-on/dashboard/daily", {
                    user: user,
                    amount: amount,
                    link: "/dashboard",
                    root: "./views/"
                });
            } else {
                if (86400000 - (Date.now() - db.val().daily) > 0) {
                    let time = ms(86400000 - (Date.now() - db.val().daily));

                    let stringTime = `${time.hours} Horas, ${time.minutes} Minutos e ${time.seconds} Segundos`;

                    response.status(200).render("pages/session-on/dashboard/dailyNoTime", {
                        user: user,
                        title: `Volte daqui á ${stringTime}!`,
                        link: "/dashboard",
                        root: "./views/"
                    });
                } else {
                    database.ref(`admin/daily/${user.id}`).set({
                        daily: Date.now()
                    });

                    database.ref(`admin/social/${user.id}`).once("value").then(async function(data) {
                        if (data.val() == null) {
                            database.ref(`admin/social/${user.id}`).set({
                                aboutme: "Amo o Periquitosvaldo! Para mudar essa descrição, use 'sobremim'.",
                                background: "https://cdn.shopify.com/s/files/1/1003/7610/products/Black_Hexagon_Pattern_Wallpaper_Mural_a_700x.jpg",
                                model: "default",
                                money: amount
                            });
                        } else {
                            database.ref(`admin/social/${user.id}`).update({
                                money: data.val().money + amount
                            });
                        };
                    });

                    response.status(200).render("pages/session-on/dashboard/daily", {
                        user: user,
                        amount: amount,
                        link: "/dashboard",
                        root: "./views/"
                    });
                };
            };
        });
    };
});

module.exports = router;