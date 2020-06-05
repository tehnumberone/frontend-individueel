import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login.vue"
import Register from "./components/Register.vue";
import HomePage from "./components/HomePage";
import Play from "./components/Play";
import Characters from "./components/Characters";
import CreateCharacter from "./components/CreateCharacter";
import CreateItem from "./components/CreateItem";
import Items from "./components/Items";


Vue.use(Router);
export default new Router({
    mode: "history",
    routes: [
        /*
        {
            path: "/",
            name: "customers",
            alias: "/customer",
            component: CustomersList,
            children: [
                {
                    path: "/customer/:id",
                    name: "customer-details",
                    component: Customer,
                    props: true
                }
            ]
        },*/
        {path: "/register", name: "register", component: Register},
        {path: "/login", name: "login", component: Login},
        {path: "/", name: "HomePage", component: HomePage},
        {path: "/characters", name: "characters", component: Characters},
        {path: "/characters/create", name: "createCharacter", component: CreateCharacter},
        {path: "/play", name: "play", component: Play},
        {path: "/items", name: "items", component: Items},
        {path: "/items/create", name: "createItems", component: CreateItem}
    ],

});
let router = new Router();
router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    console.log("hello");
    const publicPages = ['/', '/register', '/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = sessionStorage.getItem('user');
    if (authRequired && loggedIn !== '') {
        return next({
            path: '/',
            query: {returnUrl: to.path}
        });
    } else
        next();
});

