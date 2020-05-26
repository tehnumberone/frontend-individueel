import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login.vue"
import Register from "./components/Register.vue";
import HomePage from "./components/HomePage";


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
        {path: "/", name: "HomePage", component: HomePage}
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

