const {registrationSchema,loginSchema} = require('../validator/authValidatator')
const User = require('../models/user-model')
const ContactUser = require('../models/contact-module')
const bcrypt = require('bcrypt');
const Service = require('../models/service.model')

const home = async(req, res) => {
    try {
        res.status(200).send('home page')
    } catch (error) {
        console.log('home page error', error)
        res.status(500).json({error: 'internal server error'})
    }
}

const registration = async(req, res) => {
    try {
        const validate = registrationSchema.safeParse(req.body)
        if(!validate.success) {
            return res.status(400).json({error: validate.error.errors})
        }
        const {username,email,phone,password,isAdmin} = validate.data;
        const userExist = await User.findOne({email});
        if(userExist) {
            return res.status(400).json({msg:"user already exists"});
        }
        const newUser = new User({
            username,
            email,
            phone,
            password,
            isAdmin
        })
        await newUser.save()
        const token = newUser.generateAuthToken();

        res.status(200).json({msg:'registration succcesful',token})
    } catch (error) {
        console.log('home page error', error)
    }
}

const login = async(req, res) => {
    try {
        const validate = loginSchema.safeParse(req.body)
        if(!validate.success) {
            return res.status(400).json({errors: validate.error.errors})
        }
       const {email, password} = validate.data;
       const user = await User.findOne({email})
       
       if(!user || !(await user.comparePassword(password))) {
        return res.status(400).json({error: 'invalid usrename or password'})
       }
       const token = user.generateAuthToken();

       res.status(200).json({token, message: 'login succesful'})
    } catch (error) {
        res.status(500).json({error: 'internal server Error'})
        console.log(error)
    }
};

const contact = async(req, res) => {
try {
    const {email, username, message} = req.body;
    const newUser = new ContactUser({
        email,
        username,
        message
    })
    await newUser.save();
    res.status(200).json({msg: 'message send succesfuly'})
} catch (error) {
    console.error(error.message)
    res.status(500).json({messge: 'message not send'})
}
}

const user = (req, res) => {
    try {
        // const userData = req.user
        // console.log(userData)
        // return res.status(200).json({msg: userData})
        res.json({
            username: req.user.username,
            email: req.user.email,
            phone:req.user.phone,
            isAdmin: req.user.isAdmin
        })
        
    } catch (error) {
        console.log('user route ',error)
    }
}

const service = async(req, res) => {
    try {
        const response = await Service.find();
        if(!response) {
            res.status(404).json({msg: 'no service found'});
            return;
        }
        res.status(200).json({msg: response})
    } catch (error) {
        console.error(error.message)
    }
}
    
module.exports = {home, registration,login,contact,user, service}


