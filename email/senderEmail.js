const nodemailer = require("nodemailer");

module.exports = async (json) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailSent = await transporter.sendMail({
        text: "[Periquitosvaldo Bot]",
        subject: "Primeira vez no Website do Periquitosvaldo?",
        from: "Periquitosvaldo Bot - iNsaNy Developers <insany.developers@gmail.com",
        to: json.email,
        html: `<!DOCTYPE html>
        <head>
            <style>
                .container {
                    display: block;
                    width: 100%;
                    max-width: 220px;
                    height: 100%;
                    background-color: orchid;
                    border-radius: 10px;
                    padding-bottom: 12px;
                }
        
                .container .parrot {
                    padding: 5px 10px 5px 10px;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    background-color: midnightblue;
                    margin-bottom: 5%;
                }
        
                .container .parrot .logo {
                    display: block;
                    width: 15%;
                    margin-left: auto;
                    margin-right: auto;
                    border-radius: 50%;
                }
        
                .container .card-welcome {
                    display: block;
                    width: 90%;
                    margin-left: auto;
                    margin-right: auto;
                    max-width: 200px;
                    height: 100%;
                    background-color: rgb(41, 41, 133);
                    border-radius: 10px;
                }
        
                .container .card-welcome .card-img {
                    padding-top: 25px;
                }
        
                .container .card-welcome .card-img img {
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                    padding: 5px;
                    border-radius: 50%;
                    border: 2px solid gray;
                    width: 70%;
                }
        
                .container .card-welcome .card-img img:hover {
                    border: 2px solid #fff;
                }
        
                .container .card-welcome .card-content {
                    margin-top: 15px;
                    padding: 10px;
                    text-align: center;
                    background-color: midnightblue;
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;
                }
        
                .container .card-welcome .card-content h2 {
                    display: block;
                    font-size: 100%;
                    font-family: Arial, Helvetica, sans-serif;
                    color: #fff;
                }
        
                .container .card-welcome .card-content p {
                    display: block;
                    font-size: 80%;
                    font-family: Arial, Helvetica, sans-serif;
                    color: rgb(202, 202, 202);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="parrot">
                    <img src="https://cdn.discordapp.com/avatars/719557072429252618/e8b67685bc1a2686a7de6873d5861b5e.png?size=2048" alt="Periquitosvaldo" class="logo">
                </div>
                <div class="card-welcome">
                    <div class="card-img">
                        <img src="https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}.png?size=1024" alt="${json.username}">
                    </div>
                    <div class="card-content">
                        <h2 class="username">${json.username}</h2>
                        <p>Seja Bem-Vindo ao Website do Periquitosvaldo!</p>
                    </div>
                </div>
            </div>
        </body>
        </html>`,
    });
};