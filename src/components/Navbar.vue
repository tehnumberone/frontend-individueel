<template>
        <div class="nav-container">
            <div v-if="getusername !== null && getusername !== undefined && getusername !== ''" id="sessionUsername" class="username">Logged in as {{getusername}}</div>
            <nav id="navi" class="navbar navbar-expand-sm border-bottom box-shadow mb-3">
                <div class="container">
                        <div v-if="getusername === null || getusername === undefined || getusername === '' ">
                            <router-link
                                    class="nav-link p" to="/register">
                                Register
                            </router-link>
                            <router-link class="nav-link p" to="/login">Login</router-link>
                        </div>
                        <div v-else>
                            <ul class="navbar-nav flex-grow-1">
                                <li>
                                    <router-link id="home" class="navbar-brand p" to="/">Home</router-link>
                                </li>
                                <li>
                                    <router-link id="characters" class="nav-link p" to="/characters">Characters
                                    </router-link>
                                </li>
                                <li>
                                    <router-link id="items" v-if="getrole === 'Administrator'" class="nav-link p"
                                                 to="/items">
                                        Items
                                    </router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link id="createItem" v-if="getrole === 'Administrator'" class="nav-link p"
                                                 to="/items/create">
                                        Create Items
                                    </router-link>
                                </li>
                                <li><button id="logOut" class="btn btn-primary p" style="margin-left: 600px;" v-on:click="logOut()"> Logout</button></li>
                            </ul>
                        </div>
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
        methods: {
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

    .username {
        padding-left:10px;
    }

    .p {
        display: inline-block;
        text-align: left;
        margin-bottom: 10px;
        color:white;
    }
    .p:hover{
        border-radius:10px;
        background-color: #135058;
    }
</style>
