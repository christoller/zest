const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/userSchema')

const recipeRoutes = express.Router();

// Add Recipe to Recipes

recipeRoutes.patch('/:id/', async (req, res) => {
    const user = {
        _id: ObjectId(req.params.id),
    };
    const { recipeName, ingredients, steps, cost } = req.body;

    const recipe = {
                recipeName: recipeName,
                ingredients: ingredients,
                steps: steps,
                cost: cost
            }

    await User.updateOne(
      { _id: user._id}, 
      { $addToSet: {recipes: recipe }}
    ).then((result) => {
            res.json({ status: 'ok' });
        });
});

// Get Recipes
recipeRoutes.get('/:id/', async (req, res) => {
  const user = {
        _id: ObjectId(req.params.id),
    };

  await User.findById(user._id).then((result) => {
    res.send(result.recipes)
  })
})

export default recipeRoutes