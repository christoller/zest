
declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

import express from "express";
const User = require('../models/userSchema')
const bcrypt = require('bcrypt');
require('dotenv');

const sessionRouter = express.Router();

sessionRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user)

    if (user && bcrypt.compareSync(password, user.password)) {
        const sessionUser = {
            id: user.id,
            username: user.username,
    };
      req.session.user = sessionUser;
      res.send(req.session.user)
      console.log(req.session)
    } else {
      throw new Error('Invalid login credentials');
    }
  } catch (err) {
    res.status(401).send(err);
  }
});

// sessionRouter.delete("/", (req, res) => {
//     const user = req.session.user;
//     if (user) {

//       req.session.destroy((err) => {
//       res.redirect('/') // will always fire after session is destroyed
//     })
      
//     } else {
//       throw new Error('Something went wrong');
//     }
//   } 
// );

sessionRouter.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) return next(err)
    res.status(200).send('logged out')
  })
})

sessionRouter.get("/", async (req, res) => {
    if(req.session.user){
        let userId = req.session.user
        res.send(userId.username)
    } else {
        res.status(401).json({
            message: 'Not logged in',
        });
      }  
    })



export default sessionRouter;