
![logo](/client/src/assets/logo-image.png)
# Zest.

Live Site: https://zest-recipe-manager.herokuapp.com/

## **What is it?**

Zest is an recipe management app designed to help users design, cost and store recipes. The main feature of the app are:

### **Recipe Builder**

An easy to use template for users to create consistent, easy to read recipes (and printer friendly). The recipes will be stored in a database for easy recipe management.

### **Recipe Costing**

Users create a pantry list of ingredients and their prices, which will be stored in a personal database for easy reference. As users select the ingredients and quantities when they are creating the recipe in the recipe builder, it will calculate and cost the recipe based on the current prices in the database.

## About the App 
Zest was built using the MERN stack. MondoDB seemed like the most appropriate choice as it would be easy to store ingredients and steps of varying sizes as objects within arrays in the database. Having the majority of my database experience be with PostgreSQL, I found working my way around MongoDB a little tricky until I discovered Mongoose. Once I had my schema set up, it was easy to use. Client side, I used a mix of the MUI react component library and TailwindCSS to build the design and React-Router for my routings.


## Technologies Used

-   HTML/CSS
-   React/Node
-   Typescript
-   MongoDB/Mongoose


## User Stories

-   As a chef, I want all my recipes in the same consistent format
-   As a business owner, I want all the recipes to be easy to cost, based off the current prices
-   As a budgeter, I want to be able to track the cost of my meals

## Installation Instructions

1. Clone this repo

2. Install the dependencies

```

npm i

```

3. Follow the instructions [here](https://docs.atlas.mongodb.com/getting-started/?_ga=2.20440187.2106445925.1651150510-463089072.1651150510) to get set up with MondgoDB Atlas and locate your connection string.


4. Create the environment variables in a file called `.env`

```

SESSION_NAME="something random"
SESSION_SECRET="something random"
SESSION_LIFETIME="Length you want session to last in milliseconds"
DATABASE_URL=mongodb://localhost:27017/"Name of your Database"
MONGODB_URI ="your MongoDB connection string goes here"

```

5. Enter the server foleder and run the server

```

npm start

```

6. In a new terminal window, enter the client folder and run

```

npm start

```

## Future Additions
- As users update the prices in the pantry, it will automatically update the recipe costings.
- Analytics based off the above (How recipe costs are tracking with change in ingredient costs)
- Ability to edit existing recipes
- Extra additions to the recipe builder such as Recipe Description, Notes, Yield, Calories
- Calorie component (Add and automatically count calories)
- Additional units of measurement
- Abiity to factor in extra costs (Labour, Utilities ect.)

