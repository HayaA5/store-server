// מטרת קובץ זה :
// התחברות לשרת MONGO מרוחק - atlas / או לשרת מקומי

const mongoose = require('mongoose');

const MONGO_URL ='mongodb+srv://Haya:hayA1989@cluster0.cc8ykh2.mongodb.net/test1?retryWrites=true&w=majority'
// 'mongodb+srv://Admin:Admin123@cluster0.zyg0zzq.mongodb.net/test1?retryWrites=true&w=majority'

const connect = async () => {
    try {
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true }, (err) => {
            if (err) { throw err }

            console.log("Connection Success, State:", mongoose.connection.readyState);
        })
    }
    catch (e) {
        console.log('error mongoose: ', e);
    }
}

module.exports = { connect };

