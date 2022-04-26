
declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

require('dotenv');
import express from "express";
const User = require('../models/userSchema')
const bcrypt = require('bcrypt');


const sessionRouter = express.Router();

sessionRouter.post("/", async (req, res) => {
  function incorrectResponse(res) {
        res.status(400).json({
            message: 'Incorrect username or password',
        });
    }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
        const sessionUser = {
            id: user.id,
            username: user.username,
    } ;
      req.session.user = sessionUser;
      res.send(req.session.user)
    } else {
      incorrectResponse(res)
    }
  } catch (err) {
    incorrectResponse(res)
  }
});


sessionRouter.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) return next(err)
    res.status(200).send('logged out')
  })
})

sessionRouter.get("/", async (req, res) => {
    if(req.session.user){
        let userId = req.session.user.id
        res.send(userId)
    } else {
        res.status(401).json({
            message: 'Not logged in',
        });
      }  
    })


export default sessionRouter;