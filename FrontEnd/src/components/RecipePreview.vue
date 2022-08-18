<template>
<!---->
  <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id, title:title } }"
    class="recipe-preview"
  >
    <div class="recipe-body">
      <img v-if="this.title == 'Private Recipes' || this.title == 'Family Recipes'" :src= "this.image_src" class="recipe-image" alt="Red dot"  />
      <img v-else-if="image_load" :src="recipe.image" class="recipe-image" />
      
    </div>
    <div class="recipe-footer">
      <strong style="font-size:16px" >
        recipe
        </strong>
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <div class="myFooter">
      <ul class="recipe-overview ">
        
        <li style="text-align: left;">{{ recipe.readyInMinutes }} minutes</li>
        <div v-if = "title != 'Family Recipes' " style="text-align: left; color: #f93f23;">{{ recipe.popularity }}  
        <p style="float:right;color: rgb(104, 104, 104);margin-left:10px;"> likes</p>
        </div>
        
      </ul>
      </div>
    </div>
  </router-link>
  
    
</template>

<script>
export default {
  mounted() {
    if(this.title == "Private Recipes" || this.title == "Family Recipes"){
      this.image_src = 'data:image/png;base64,'+this.recipe.image;
    }
    else{
      this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
    }
  },
  data() {
    
    return {
      image_load: false,
      image_src:'data:image/png;base64,'+this.recipe.image,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>


.recipe-preview {
  
  display: inline-block;
  width: 100%;
  /*height: 100%;*/
  position: relative;
padding: 0;
}
.recipe-preview > .recipe-body {
  width: 100%;
  /*height: 200px;*/
  position: relative;
  
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 100%;
  
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  
  padding: 10px 10px;
  width: 100%;
  
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}

strong{
  padding-left: 10px;
  padding-top:10px;
  text-align: left;
      color: #f93f23;
    display: block;
    font-size: .6875rem;
    line-height: 1;
    letter-spacing: 1px;
    margin-bottom: 0.375rem;
    text-transform: uppercase
}

.recipe-title
{
  color:rgb(60, 59, 59);
  font: bold 1rem/1.25rem "Source Serif Pro",serif;
    padding: 0;
    font-size: 28px;
}
a ,u {
    color: #333;
    line-height: normal;
    text-decoration: none;
    
}
a:hover {
 text-decoration: none;
}


.myFooter
{

color: rgb(104, 104, 104);
font-weight: 600;
margin-top: 10px;



  
}
</style>
