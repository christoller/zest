const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/userSchema')

const pantryRoutes = express.Router();

// Add Items to Pantry
pantryRoutes.patch('/:id/', async (req, res) => {
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

// Update Items in Pantry
pantryRoutes.patch('/:id/edit', async (req, res) => {
    const user = {
        _id: ObjectId(req.params.id),

    };
    const { ingredient, supplier, unitSize, costPerUnit, costPerGram } = req.body;
    console.log(req.body)

    await User.findOneAndUpdate(

      { _id: user._id, 'pantry.ingredient': ingredient},      
      {'$set': 
        {
          'pantry.$.supplier': supplier,
          'pantry.$.unitSize': unitSize,
          'pantry.$.costPerUnit': costPerUnit,
          'pantry.$.costPerGram': costPerGram,
        }})
    
    .then((result) => {
            console.log(result)
            res.json({ status: 'ok' });
        });
});

// Show Pantry List
pantryRoutes.get('/:id/', async (req, res) => {
  const user = {
        _id: ObjectId(req.params.id),
    };

  await User.findById(user._id).then((result) => {
    res.send(result.pantry)
    console.log(result.pantry)
  })
})

// Delete Item From Pantry List
pantryRoutes.patch('/:id/delete', async (req,res) => {
  const user = {
        _id: ObjectId(req.params.id),
    };

    const ingredient = req.body.ingredient;


    await User.findOneAndUpdate(

      { _id: user._id},      
      {$pull: 
        {
          'pantry': {"ingredient": ingredient}
        }})
    
    .then((result) => {
            console.log(result)
            res.json({ status: 'ok' });
        });
})

export default pantryRoutes