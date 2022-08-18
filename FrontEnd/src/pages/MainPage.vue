<template>
  <div class="container">
    
   
          <div id="SearhcBar" style="text-align:center">
          <input type="text"  id="mysearch" placeholder="Find a Recipe" v-model="data" >
          <button style="margin:0 " id="mybutton" @click="Search" >Search</button>
          <br>
          <a  href="#/search">Advanced Search</a>

          </div>
          
          

    <table style="width:100%;">
    <tr>
        <th scope="col"> Explore this recipes</th>
        <th  v-if="$root.store.username" scope="col">Last watched recipes</th>
       
    </tr>
      
      <tr style="width:100%;">
        <td style="width:50%">
           

            <RecipePreviewList title="Random Recipes" class="RandomRecipes" />
        </td>
        
        <td  v-if="!$root.store.username"  class="box" style="width:50%; height: 70%;"   >
            <div class="box overlay" style="opacity:1 ; width:50%;margin-left: 15%;margin-top: 4%; border-radius: 10px;"> <LoginPage></LoginPage></div>
            <div ><RecipePreviewList title="Random Recipes" class="blur" /> </div>  
            
          
        </td>

          
        <td v-else style="width:50%">
          

          <div ><RecipePreviewList title="Last Watched Recipes"  /> </div>  

        </td>
        
      </tr>

    </table>
  
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "./LoginPage.vue";
import SearchPageVue from './SearchPage.vue';
export default {
  components: {
    RecipePreviewList,
    LoginPage
    
},
data(){


  return{
    data:"",
  }
}
,
methods:{

  Search()
  {

  
  this.$router.push({name:"search",params:{query:this.data}});

  }
}
};
</script>



<style lang="scss" scoped>

.mybox{
   
          width: 100%;
        height: 100%;
        position: relative;
        top: 0;
        left: 0;
        opacity: 0.7;
        background: red;
}

.container
{
  min-width: 100%;
  margin:0;
  padding:15px;
  

}
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(4px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
a
{
  margin-right:16px;
  color:rgb(245, 245, 245);
  font-weight: 900;
  font:bold .75rem/.75rem "Renner",sans-serif;
}
a:hover{color:white;}
      .box {
        width: 100%;
        height: 50%;
        position: absolute;
        
        opacity: 0.7;
        
      }
      .overlay {
        z-index:9;
        
        background: rgba(42, 43, 42, 0.9)
      }


      #SearhcBar
      {
        
        margin-left:20%;
        margin-right:30%;
        height: 3.75rem;
        margin-bottom: 3%;
        margin-top: 2%;
      
      }


  #mybutton
  {
    border:none;
    height: 3.4rem;
    background-color: red;
     margin: 0;
  
  color:white;
  font-size:18px;
  
  letter-spacing: 0.1em;
  background-color: #66a992;
  
  
  }
    #mysearch
    
    {     text-align: center;
          height: 3.5rem;
          width:26rem;
          font-weight: bold;
          font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
</style>
