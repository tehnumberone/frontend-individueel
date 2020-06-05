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
                <div>Logged in as {{getusername}}</div>
                <router-link class="btn btn-primary" to="/characters">Characters</router-link>
                <router-link class="btn btn-primary" to="/characters/create">Create Character</router-link>
                <router-link v-if="getrole === 'Administrator'" class="btn btn-primary" to="/items">Items</router-link>
                <router-link v-if="getrole === 'Administrator'" class="btn btn-primary" to="/items/create">
                    Create Items
                </router-link>
                <button class="btn btn-primary" v-on:click="logOut()"> Logout</button>
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
</style>
