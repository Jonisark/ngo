

// const mongoose = require('mongoose');


// const jwtTokenKey = process.env.JWT_SECRET_KEY

// const UserSchema = new mongoose.Schema({
//     username:{
//         type:String,
//         required:true,
//     },
//     email: {
//         type: String,
//         required: true,
//     },
//     phone: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     isAdmin: {
//         type: String,
//         default: false,
//     }
// })

// UserSchema.methods.generateAuthToken = function() {
//     const payload = {
//         _id: this.id,
//         username: this.username,
//         email: this.email
//     }
//     return jwt.sign(payload,jwtTokenKey,{expiresIn: '30d'})
// }

// UserSchema.pre('save', async function (next) {
//     try {
//         if(!this.isModified('password')) return next();
//         const salt = await bcrypt.genSalt(10);
//         const hash_password = await bcrypt.hash(this.password, salt)
//         this.password = hash_password;
//         next()
//     } catch (error) {
//         next(error)
//     }
// })

// const User = mongoose.model('User',UserSchema)

// module.exports = User;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});

UserSchema.pre('save',async function (next) {
    try {
        if(!this.isModified('password')) {
            return next()
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error)
    }
});

UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
};

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({id: this._id, username: this.username, email:this.email,isAdmin:this.isAdmin},JWT_SECRET_KEY,{
        expiresIn: '30d'
    });
    return token;
};

const User = mongoose.model('User',UserSchema);

module.exports = User;
