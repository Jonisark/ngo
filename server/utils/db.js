// const mongoose = require('mongoose');

// const URI = process.env.MONGODB_URI;

// const connectDb = async() => {
//     try {
//         await mongoose.connect(URI)
//         console.log('connection succesfull to db')
//     } catch (error) {
//         console.log(error)
//         process.exit(0)
//     }
// }

// module.exports = connectDb

const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

const connectDB = async() => {
    try {
        await mongoose.connect(URI);
        console.log('connection succesful to db')
    } catch (error) {
        console.log('database ',error)
        process.exit(0)
    }
}

module.exports = connectDB;