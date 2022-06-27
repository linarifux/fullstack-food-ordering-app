const User = require('../model/userModel')
const bcrypt = require('bcryptjs')

const createUser = async (req,res) => {
    try{
        const user = new User(req.body)
        user.generateToken()
        res.status(201).send(user)
    }catch(e){
        res.status(500).send(e.message)
    }
}

const loginUser = async (req,res) => {
    const {email,password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).send('Invalid Email or Password')
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            throw new Error('Invalid Email or Password')
        }
        const userObject = user.toObject()
        delete userObject.password
        res.status(200).send(userObject)
    }catch(e){
        res.status(500).send(e)
    }
}

// update user by ID

const updateUserById = async (req, res) => {
    try{
        console.log(req.body);
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).send('No user Found!')
        }
        user.isAvailable = req.body.isAvailable
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(500).send(e)
    }
}


// get user by id

const getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
}


// get users by Type
const getUsersByType = async (req, res) => {
    try{
        const users = await User.find({userType: req.params.type})
        if(users.length === 0){
            return res.status(404).send('No user found')
        }
        const filteredUsers = users.filter(user => user.isAvailable === true)
        res.status(200).send(filteredUsers)
    }catch(e){
        res.status(500).send(e)
    }
}

module.exports = {createUser, loginUser, updateUserById, getUsersByType, getUserById}