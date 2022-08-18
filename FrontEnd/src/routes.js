import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/users/favorites",
    name: "favorites",
    component: () => import("./pages/FavoriteRecipesPage"),

  },
  {
    path: "/users/privates",
    name: "privates",
    component: () => import("./pages/PrivateRecipesPage"),

  },
  {
    path: "/users/familyrecipes",
    name: "familyrecipes",
    component: () => import("./pages/FamilyRecipesPage"),

  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
