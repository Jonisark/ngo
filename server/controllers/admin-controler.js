 const User = require('../models/user-model')
const ContactUser = require('../models/contact-module')

const getAllUsers = async(req, res) => {
    try {
        const users = await User.find({},{password: 0});
        console.log(users)
        if(!users || users.length === 0) {
            return res.status(404).json({message: 'No users found'})
        }
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
    }
}

const deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({message: 'user deleted succsfully'})
    } catch (error) {
      console.log(error)  
    }
}

const getAllContacts = async(req,res) => {
    try {
        const contacts = await ContactUser.find();
        if(!contacts || contacts.length===0) {
            return res.status(404).json({message: 'No user found'})
        }
        return res.status(200).json({contacts})
    } catch (error) {
        console.error(error)
    }
}
const getUserById = async(req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({_id:id},{password: 0})
        return res.status(200).json(data)
    } catch (error) {
      console.log(error)  
    }
}

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;
        const updateUser = await User.updateOne({_id:id}, {
            $set: updateUserData
        })
        res.status(200).json(updateUser)
    } catch (error) {
        console.log(error)
    }
}

const deleteContactById = async(req, res) => {
    try {
        const id = req.params.id;
        await ContactUser.deleteOne({_id:id});
        return res.status(200).json({message: 'user deleted succsfully'})
    } catch (error) {
      console.log(error)  
    }
}

module.exports = {getAllUsers, getAllContacts, deleteUser,getUserById,updateUserById,deleteContactById};