import userCreateValidator from "../validations/createUserValidator";

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema')

const userRoutes = express.Router();

userRoutes.post('/', userCreateValidator, async (req, res, next) => {
    console.log(req.body.username)
     try {
      let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync())
      const user = new User({
        username: req.body.username,
        password: password,
        email: req.body.email
      })
      await user.save()
       
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

export default userRoutes