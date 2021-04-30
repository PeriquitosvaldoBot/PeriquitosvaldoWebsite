const express = require("express");
const firebase = require("firebase");
const paypal = require("paypal-rest-sdk");
const fetch = require("node-fetch");
const config = require("../../json/config.json");

const router = express.Router();
const database = firebase.database();

router.use(require("express-session")(config.session));

paypal.configure({
    mode: "sandbox",
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET
});

router.post("/pay", (request, response) => {
    if (!request.session.bearer_token) {
        return response.redirect("/login");
    } else {
        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal"
            },
            redirect_urls: {
                return_url: `${config.domain}/pay/success`,
                cancel_url: `${config.domain}/pay/cancel`
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "item",
                        "sku": "item",
                        "price": "10.00",
                        "currency": "BRL",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "BRL",
                    "total": "10.00"
                },
                "description": "This is the payment description."
            }]
        };

        paypal.payment.create(create_payment_json, (error, payment) => {
            if (error) {
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === "approval_url") {
                        response.redirect(payment.links[i].href);
                    };
                };
            };
        });
    };
});

router.get("/pay/success", async (request, response) => {
    if (!request.session.bearer_token) {
        return response.redirect("/login");
    } else {
        const payerId = request.query.PayerID;
        const paymentId = request.query.paymentId;

        const execute_payment_json = {
            payer_id: payerId,
            transactions: [{
                amount: {
                    currency: "BRL",
                    total: "10.00"
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
            if (error) {
                response.redirect("/");
            } else {
                const json = request.session.user_info;

                database.ref(`admin/social/${json.id}`).once("value").then(async function (db) {
                    if (db.val() == null) {
                        database.ref(`admin/social/${json.id}`).set({
                            background: "https://cdn.shopify.com/s/files/1/1003/7610/products/Black_Hexagon_Pattern_Wallpaper_Mural_a_700x.jpg",
                            aboutme: "Amo o Periquitosvaldo! Para mudar essa descrição, use 'p.sobremem'.",
                            model: "default",
                            money: 100000
                        });
                    } else {
                        database.ref(`admin/social/${json.id}`).update({
                            money: db.val().money + 100000
                        });
                    };
                });

                let amount_payments = payment.transactions[0].amount;

                require("../../routers/payments/webhook/embeds.js").bronze(json, amount_payments);

                response.redirect("/");
            };
        });
    };
});

router.get("/pay/cancel", (request, response) => {
    if (!request.session.bearer_token) {
        return response.redirect("/login");
    } else {
        response.status(200).send("Cancelled");
    };
});

module.exports = router;