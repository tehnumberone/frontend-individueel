<template>
    <div>
        <br>
        <nav id="navbar">
            <div v-if="getusername === null || getusername === undefined || getusername === '' ">
                <router-link
                        class="btn btn-primary" to="/register">
                    Register
                </router-link>
                <router-link class="btn btn-primary" to="/login">Login</router-link>
            </div>
            <div v-else>
                <div id="sessionUsername">Logged in as {{getusername}}</div>
                <br>
                <router-link id="home" class="btn btn-primary p" to="/">Home</router-link>
                <router-link id="characters" class="btn btn-primary p" to="/characters">Characters</router-link>
                <router-link id="items" v-if="getrole === 'Administrator'" class="btn btn-primary p" to="/items">Items</router-link>
                <router-link id="createItem" v-if="getrole === 'Administrator'" class="btn btn-primary p" to="/items/create">
                    Create Items
                </router-link>
                <button id="logOut" class="btn btn-primary" v-on:click="logOut()"> Logout</button>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "navbar",
        computed: {
            getusername() {
                if (sessionStorage.getItem('username') === null) {
                    return this.$store.getters.getUsername;
                } else {
                    const u = sessionStorage.getItem('username');
                    console.log(sessionStorage.getItem('username'));
                    return u;
                }
            },
            getrole() {
                if (sessionStorage.getItem('role') === null) {
                    return this.$store.getters.getRole;
                } else {
                    const r = sessionStorage.getItem('role');
                    console.log(sessionStorage.getItem('role'));
                    return r;
                }
            },
        },
        methods:{
            logOut() {
                this.$store.commit('logOut');
                this.$router.push('/login');
                return location.reload();
            }
        }
    }
</script>

<style scoped>
    @import '../assets/styles/style.css';
    .p{
        padding-right:10px;
        margin-right:10px;
    }
</style>
