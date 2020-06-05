<template>
    <div>
        <h1>Login</h1>
        <div class="form-row">
            <div v-if="account.errors.length > 0">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li class="col-md-3" v-for="(value, index) in account.errors" v-bind:key="index">{{ value }}</li>
                    <div class="col-md-9"></div>
                </ul>
            </div>
            <div class="col-md-12"></div>
            <div class="form-group col-md-3">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" required v-model="account.username"
                       name="username">
            </div>
            <div class="col-md-9"></div>
            <div class="form-group col-md-3">
                <label for="password">Password</label>
                <input id="password" name="password" type="password" required class="form-control"
                       v-model="account.password">
            </div>

            <div class="col-md-9"></div>
            <button v-on:click="checkLoginForm()" id="loginButton" class="btn btn-success col-md-3">Login</button>
        </div>
    </div>
</template>

<script>
    import http from "../http-common";
    import {mapMutations} from 'vuex'

    export default {
        name: "login",
        data() {
            return {
                account: {
                    errors: [],
                    id: 0,
                    username: null,
                    password: null
                }
            }
        }
        ,
        methods: {
            ...mapMutations([
                'increment',
                'updateAccount'
            ]),
            checkLoginForm() {
                this.account.errors = [];

                if (!this.account.username) {
                    this.account.errors.push("Username required.");
                }
                if (!this.account.password) {
                    this.account.errors.push("Password required.");
                }
                if (this.account.errors.length == 0) {
                    this.verifyLogin();
                }
            },
            verifyLogin() {
                let data = {
                    username: this.account.username,
                    password: this.account.password
                };
                http
                    .post("/login", data)
                    .then(response => {
                        console.log(response.data.username);
                        if (response.data.username === null) {
                            this.account.errors.push("Username or password incorrect.");
                        } else {
                            sessionStorage.setItem('user', (JSON.stringify(response.data)));
                            console.log(sessionStorage.getItem('user'));
                            sessionStorage.setItem('username', (response.data.username));
                            sessionStorage.setItem('role', (response.data.role));
                            this.$store.commit('updateAccount', this.account);
                            this.$store.commit('setRole', response.data.role);
                            this.$router.push("/");
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
        }
    }
</script>

<style scoped>
    @import '../assets/styles/style.css';
</style>
