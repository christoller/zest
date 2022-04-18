const express = require('express');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/userSchema')

const userRoutes = express.Router();

userRoutes.post('/', async (req, res, next) => {
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
    
// Add Items to Pantry
userRoutes.patch('/:id/pantry', async (req, res) => {
    const user = {
        _id: ObjectId(req.params.id),
    };
    const { ingredient, supplier, unitSize, costPerUnit, costPerGram } = req.body;
    console.log(req.body)

    const pantryItem = {
                ingredient: ingredient,
                supplier: supplier,
                unitSize: unitSize,
                costPerUnit: costPerUnit,
                costPerGram: costPerGram
            }

    await User.updateOne(
      { _id: user._id}, 
      { $addToSet: {pantry: pantryItem }}
    ).then((result) => {
            console.log(result);
            res.json({ status: 'ok' });
        });
});

// Show Pantry List
userRoutes.get('/:id/pantry', async (req, res) => {
  const user = {
        _id: ObjectId(req.params.id),
    };

  await User.findById(user._id).then((result) => {
    res.send(result.pantry)
    // console.log(result.pantry)
  })
})


export default userRoutes