const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/userSchema')

const pantryRoutes = express.Router();

// Add Items to Pantry
pantryRoutes.patch('/:id/', async (req, res) => {
  if(req.session.user.id === req.params.id){
    const user = {
        _id: ObjectId(req.params.id),
    };
    const { ingredient, supplier, unitSize, costPerUnit, costPerGram } = req.body;

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
            res.json({ status: 'ok' });
        });
      }
});

// Update Items in Pantry
pantryRoutes.patch('/:id/edit', async (req, res) => {
  if(req.session.user.id === req.params.id){
    const user = {
        _id: ObjectId(req.params.id),

    };
    const { ingredient, supplier, unitSize, costPerUnit, costPerGram } = req.body;

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
            res.json({ status: 'ok' });
        });
      }
});

// Show Pantry List
pantryRoutes.get('/:id/', async (req, res) => {
  if(req.session.user.id === req.params.id){
  const user = {
        _id: ObjectId(req.params.id),
    };

  await User.findById(user._id).then((result) => {
    res.send(result.pantry)
  })
}
})

// Delete Item From Pantry List
pantryRoutes.patch('/:id/delete', async (req,res) => {
  if(req.session.user.id === req.params.id){
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
            res.json({ status: 'ok' });
        })
    .catch((error) => {
      console.log(error)
    });
  }
  })
  
export default pantryRoutes