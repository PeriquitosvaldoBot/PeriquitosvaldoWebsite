const firebase = require("firebase");
const colors = require("colors");

module.exports = () => {
    const firebaseConfig = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MSG_SENDER_ID,
        appId: process.env.APP_ID
    };

    try {
        firebase.initializeApp(firebaseConfig);
        console.log(colors.yellow(`[DATABASE] - Firebase Realtime Database foi Conectado com Sucesso!`));
    } catch (error) {
        return console.log(colors.red(`[DATABASE] - Ocorreu um Erro ao Conectar ao Firebase Realtime Database:\n${error}`));
    };
};