var express = require("express");
var user_utils= require("./utils/user_utils")
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

/* This path returns a preview details of a recipe by its id*/
router.get("/recipeDetails/:recipeId", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.params.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

/* This path returns a full details of a recipe by its id*/
router.get("/fullinfo/:recipeId", async (req, res, next) => {
  try {
    const recipe_id = req.params.recipeId
    const user_id= req.session.user_id
    await user_utils.addWatchedRecipes(user_id,recipe_id)
    const recipe = await recipes_utils.getRecipeFullinfo(recipe_id);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

/* This path returns three random recipes */
router.get("/threeRandom",async(req,res,next)=>
{
  res.send(getResult().slice(0,3))
  return 
  try {
    const radnomThree = await recipes_utils.random();
    res.send(radnomThree);
  } catch (error) {
    next(error);
  }

}

);

router.get("/search/", async (req, res, next) => {
  res.send(getResult())
  return 


  try {
    let num=5
    let query="?query="+req.query.query

    if(req.query.cusine!= undefined)
    {query=query+"&cusine="+req.query.cusine}

    if(req.query.number!= undefined)
    {num=req.query.number}
      
   

    if(req.query.diet!= undefined)
    { query=query+"&diet="+req.query.diet}

    if(req.query.intolerances!= undefined)
    {query=query+"&intolerances="+req.query.intolerances}

    //console.log(query)
    
  
  const result = await recipes_utils.search(query,num) 
   
   res.send(result)
  } catch (error) {
    next(error);
  }
});


function getResult()
{

return [
  {
      "id": 661531,
      "title": "Steak with lemon and capers",
      "readyInMinutes": 45,
      "image": "https://spoonacular.com/recipeImages/661531-556x370.jpg",
      "popularity": 9,
      "vegan": false,
      "vegetarian": false,
      "glutenFree": false
  },
  {
      "id": 1096025,
      "title": "Steak Salad with Chimichurri Sauce",
      "readyInMinutes": 30,
      "image": "https://spoonacular.com/recipeImages/1096025-556x370.jpg",
      "popularity": 1,
      "vegan": false,
      "vegetarian": false,
      "glutenFree": true
  },
  {
      "id": 661522,
      "title": "Steak With Blue Cheese Sherry Sauce",
      "readyInMinutes": 45,
      "image": "https://spoonacular.com/recipeImages/661522-556x370.jpg",
      "popularity": 2,
      "vegan": false,
      "vegetarian": false,
      "glutenFree": true
  },
  {
      "id": 661510,
      "title": "Steak Salad With Roasted Potatoes and Fennel",
      "readyInMinutes": 45,
      "image": "https://spoonacular.com/recipeImages/661510-556x370.jpg",
      "popularity": 1,
      "vegan": false,
      "vegetarian": false,
      "glutenFree": true
  },
  {
      "id": 661500,
      "title": "Steak And Pepper Rounds With Rose Horseradish Garlic Creme Sauce",
      "readyInMinutes": 45,
      "image": "https://spoonacular.com/recipeImages/661500-556x370.jpg",
      "popularity": 3,
      "vegan": false,
      "vegetarian": false,
      "glutenFree": false
  }
]

}

module.exports = router;

