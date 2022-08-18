var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");
const multer  = require('multer')
const upload = multer({ storage:multer.storage})

/**
 * Authenticate all incoming requests by middleware
 */
/*
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});
*/

 /* This path gets body with recipeId and save this recipe in the favorites list of the logged-in user */
router.post('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipeId;
    if (!recipe_id){
      throw { status: 400, message: "Bad Request" };
    }
    const exist = await user_utils.marked(user_id,recipe_id);
    if (exist.length !=0 ){
      throw { status: 403, message: "Duplicate Entry" };
    }
    await user_utils.markAsFavorite(user_id,recipe_id);
    res.status(201).send("The Recipe successfully saved as favorite");
    } catch(error){
    next(error);
  }
})

/* This path gets body with recipeId and delete this recipe from the favorites list of the logged-in user*/
 router.delete('/favorite/:recipeId', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.params.recipeId;
    if (!recipe_id){
      throw { status: 400, message: "Bad Request" };
    }
    const exit_code = await user_utils.removefromFavorite(user_id,recipe_id);
    console.log(exit_code)
    if(exit_code.affectedRows == 0){
      res.status(200).send("There is no private recipe with recipeId value that you sent");
    }
    else{
      res.status(200).send("The Recipe deleted from your favorite list successfully");
    }
    } catch(error){
    next(error);
  }
})

/*This path returns the favorites recipes that were saved by the logged-in user */
router.get('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

/* This path gets body with recipe details and save this recipe in the privates list of the logged-in user */
 router.post('/privates', upload.single('recipe-image'), async (req,res,next) => {
  try{
    if (!req.file) {
      return res.status(500).send("file is not found" )
    }
    const user_id = req.session.user_id;
    const image = req.file.buffer.toString('base64');
    const title = req.body.title;
    const minutes = req.body.minutes;
    const vegan = req.body.vegan;
    const vegetarian = req.body.vegetarian;
    const gluten = req.body.gluten;
    const ingrediants =req.body.ingrediants;
    const instructions = req.body.instructions;
    if(!image || !title || !minutes || !vegan || !vegetarian || !gluten || !ingrediants || !instructions){
        throw { status: 400, message: "Bad Request" };
    }
    await user_utils.addPrivateRecipe(user_id,image,title,minutes,vegan,vegetarian,gluten,ingrediants,instructions);
    res.status(201).send("The private Recipe was added successfully");
    } catch(error){
    next(error);
  }
})

/* This path delete the private recipe that were posted by the logged-in user by Id */
router.delete('/private/:recipeId', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.params.recipeId;
    const exit_code = await user_utils.removefromPrivate(user_id,recipe_id);
    if(exit_code.affectedRows == 0){
      res.status(200).send("There is no private recipe with recipeId value that you sent");
    }
    else{
      res.status(200).send("The Recipe deleted from your private recipes list successfully");
    }
    } catch(error){
    next(error);
  }
})

/* This path returns the privates recipes that were saved by the logged-in user */
router.get('/privates', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const result = await user_utils.getPrivateRecipes(user_id);
    res.status(200).send(result);
  } catch(error){
    next(error); 
  }
});

/* This path return full information about specific private recipe by id */
router.get("/private_recipe_info/:recipeId", async (req, res, next) => {
  try {
    const user_id = req.session.user_id
    const recipe_id = req.params.recipeId
    const recipe = await user_utils.getPrivateRecipeFullinfo(user_id, recipe_id);
    res.status(200).send(recipe);
  } catch (error) {
    next(error);
  }
});

/* This path return full information about specific family recipe by id */
router.get("/family_recipe_info/:recipeId", async (req, res, next) => {
  try {
    const user_id = req.session.user_id
    const recipe_id = req.params.recipeId
    const recipe = await user_utils.getFamilyRecipeFullinfo(user_id, recipe_id);
    console.log("family :" , recipe)
    res.status(200).send(recipe);
  } catch (error) {
    next(error);
  }
});

/* This path gets body with recipe details and save this recipe in the family recipes list of the logged-in user*/
router.post('/familyrecipes',upload.single('recipe-image'), async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    if (!req.file) {
      return res.status(500).send("file is not found" )
    }
    const owner = req.body.owner;
    const custom_time = req.body.customtime;
    const image = req.file.buffer.toString('base64');
    const title = req.body.title;
    const minutes = req.body.minutes;
    const vegan = req.body.vegan;
    const vegetarian = req.body.vegetarian
    const gluten = req.body.gluten;
    const ingrediants =req.body.ingrediants;
    const instructions = req.body.instructions;
    if(!owner || !custom_time || !image || !title || !minutes || !vegan || !vegetarian || !gluten || !ingrediants || !instructions){
      throw { status: 400, message: "Bad Request" };
  }
    await user_utils.addFamilyRecipe(user_id,owner,custom_time,image,title,minutes,vegan,vegetarian,gluten,ingrediants,instructions);
    res.status(201).send("The family Recipe was added successfully");
    } catch(error){
    next(error);
  }
})

/* This path returns the family recipes that were saved by the logged-in user */
router.get('/familyrecipes', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const result = await user_utils.getFamilyRecipes(user_id);
    res.status(200).send(result);
  } catch(error){
    next(error); 
  }
});

/* This path delete the family recipe that were posted by the logged-in user by Id */
router.delete('/family/:recipeId', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.params.recipeId;
    const exit_code = await user_utils.removefromFamily(user_id,recipe_id);
    if(exit_code.affectedRows == 0){
      res.status(200).send("There is no family recipe with recipeId value that you sent");
    }
    else{
      res.status(200).send("The Recipe deleted from your family list successfully");
    }
    } catch(error){
    next(error);
  }
})

/* This path returns the watched recipes that were watched by the logged-in user */
router.get('/watched',async(req,res,next)=>{
  try{
    const user_id = req.session.user_id;
    const all_watched = await user_utils.getWatchedRecipes(user_id);
    let lst=[]
    for (let i=all_watched.length-1 ; i>= 0;i--)
    {
      if(lst.length == 3) break;
      let recipeId =all_watched[i]["recipe_id"] 
      if(!lst.includes(recipeId)){
        lst.push(recipeId)
      }
    }
    let result =[]
    for (let i = 0 ; i<lst.length; i++){
      result.push(await recipe_utils.getRecipeDetails(lst[i]))
    }
    res.status(200).send(result);
  } catch(error){
    next(error); 
  }
});

module.exports = router;
