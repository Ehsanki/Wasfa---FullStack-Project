const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";

/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */

async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            //apiKey: process.env.spooncular_apiKey
            apiKey: "0184239e0fa84af3befeda9e06006eb9"
        }
    });
}

async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;
    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        
    }
}

async function getRecipesPreview( recipes_id_array ){
    var RecipesPreview =[]
    for (const recipe_id of recipes_id_array) {
        let recipe_preview = await getRecipeDetails(recipe_id)
        RecipesPreview.push(recipe_preview)
      }
    return RecipesPreview
}


async function search(query,number){
    let url=`${api_domain}/complexSearch${query}&apiKey=${process.env.spooncular_apiKey}`;
    const data1= await axios.get(url)
    let data=data1.data["results"]
    let res=[]
    for (let i = 0; i< data.length; i++){
        res.push(await getRecipeDetails(data[i].id))
    }  
    return res.slice(0,number) // return of size number 

}

async function random(){
    
    let url=`${api_domain}/random?number=3&apiKey=${process.env.spooncular_apiKey}`; // choose 3 random Recipes
    const data1= await axios.get(url)
    let res=[]
    for (let i = 0; i< data1.data["recipes"].length; i++){
        res.push(await getRecipeDetails( data1.data["recipes"][i].id))
    }  
    return res

}

async function getRecipeFullinfo(recipe_id)
{
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree,servings,instructions,extendedIngredients,analyzedInstructions} = recipe_info.data;
 
    return {
        id: id, 
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        aggregateLikes: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        servings:servings,
        instructions:instructions,
        extendedIngredients:extendedIngredients,
        analyzedInstructions: analyzedInstructions
    }
}


exports.getRecipeFullinfo = getRecipeFullinfo;
exports.getRecipeDetails = getRecipeDetails;
exports.getRecipesPreview = getRecipesPreview;
exports.search=search;
exports.random=random;

