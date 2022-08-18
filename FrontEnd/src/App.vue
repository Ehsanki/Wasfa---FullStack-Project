<template>
  <div id="app">
    <div id="nav">
     
      <router-link :to="{ name: 'main' }">Wasfa Recipes</router-link>|
      <router-link :to="{ name: 'search' }">Search</router-link>|
      <!--{{ !$root.store.username }}-->
      <div id="user" >
      <span v-if="!$root.store.username" >
        <label> Hello Guest </label> |
        <router-link :to="{ name: 'register' }">Register</router-link>|
        <router-link :to="{ name: 'login' }">Login</router-link>|
      </span>
      <span v-else>
        {{ $root.store.username }} 
        <b-dropdown id="dropdown-1" text="Profile"  >
          <b-dropdown-item href="#/users/favorites" >Favorites</b-dropdown-item>
          <b-dropdown-item href="#/users/privates">Privates</b-dropdown-item>
          <b-dropdown-item href="#/users/familyrecipes">La Familia</b-dropdown-item>
          <button @click="Logout" id="logout"  >Logout</button>|
        </b-dropdown>
          
      </span>
      </div>
    </div>
    <router-view  />


     
  </div>
</template>

<script>
import SearchPage from './pages/SearchPage.vue';
export default {
    name: "App",
    data(){
      return{
      
    }
    },
    methods: {
        Logout() {
            this.$root.store.logout();
            this.$root.toast("Logout", "User logged out successfully", "success");
            this.$router.push("/").catch(() => {
                this.$forceUpdate();
            });
        }
        ,

       



    },
    components: {  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background-color:#2c3e50;
  min-height: 100vh;
}


#nav {
  background-color:#66a992;
  padding:30px;
  
  
}

#nav a {
  padding:10px;
  font-weight: bold;
  color: #fffcfc;
}

#nav a.router-link-exact-active {
  color:#2c3e50
}


#user
{

float:right

}

#dropdown-1{
  margin-left:10px;
  width:100px;
  height: 40px;
}
#logout{
background-color: rgb(207, 38, 38); color:white;font-weight: 700;border:none ; margin:5px
}


</style>
