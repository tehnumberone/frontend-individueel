<template>
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
            <input type="text" class="form-control" id="username" required v-model="account.username" name="username">
        </div>
        <div class="col-md-9"></div>
        <div class="form-group col-md-3">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" required class="form-control"
                   v-model="account.password">
        </div>
        <div class="col-md-9"></div>
        <div class="form-group col-md-3">
            <label for="repeatPassword">Repeat Password</label>
            <input id="repeatPassword" name="repeatPassword" type="password" required class="form-control"
                   v-model="account.repeatPassword">
        </div>

        <div class="col-md-9"></div>
        <div class="form-group col-md-3">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" required class="form-control" v-model="account.email">
        </div>

        <div class="col-md-9"></div>
        <button v-on:click="checkForm()" class="btn btn-success col-md-3">Submit</button>
    </div>
</template>

<script>
    import http from "../http-common";
    import {mapMutations} from "vuex";

    export default {
        name: "register",
        data() {
            return {
                account: {
                    errors: [],
                    id: 0,
                    username: null,
                    password: null,
                    email: null,
                    repeatPassword: ""
                },
            }
        },
        methods: {
            ...mapMutations([
                'updateAccount',
                'resetErrors',
                'addError',
                'updateUsernameExists',
                'updateEmailExists'
            ]),
            checkForm() {
                this.$store.commit('resetErrors');
                if (!this.account.username) {
                    this.$store.commit('addError', "Username required.");
                } else if (this.account.username) {
                    this.CheckUsername(this.account.username);
                    console.log(this.$store.getters.getUsernameExists + "username exists?");
                    if (this.$store.getters.getUsernameExists === true) {
                        this.$store.commit('addError', "This username is already taken.");
                    }
                }
                if (!this.account.password) {
                    this.$store.commit('addError', "Password required.");
                }
                if (this.account.password !== this.account.repeatPassword) {
                    this.$store.commit('addError', "Password is not the same as repeat password.");
                }
                if (!this.account.email) {
                    this.$store.commit('addError', "Email required.");
                } else if (!this.validEmail(this.account.email)) {
                    this.$store.commit('addError', "Valid email required.");
                } else if (this.account.email) {
                    this.CheckEmail(this.account.email);
                    console.log(this.$store.getters.getEmailExists + "email exists?");
                    if (this.$store.getters.getEmailExists === true) {
                        this.$store.commit('addError', "This e-mail is already taken.");
                    }
                }
                this.account.errors = this.$store.getters.getErrors;
                if (this.account.errors.length === 0) {
                    this.saveAccount();
                }
            },
            validEmail(email) {
                let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            saveAccount() {
                let data = {
                    username: this.account.username,
                    password: this.account.password,
                    email: this.account.email
                };
                http
                    .post("/register", data)
                    .then(response => {
                        this.account.id = response.data.id;
                        this.$store.commit('updateAccount', this.account);
                        this.$router.push("/");
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            CheckEmail(email) {
                http
                    .post("/account/email", email)
                    .then(response => {
                        console.log(JSON.parse(response.data) + "email");
                        this.$store.commit('updateEmailExists', JSON.parse(response.data));
                    })
                    .catch(e => {
                        console.log(e);
                    });

            },
            CheckUsername(username) {
                http
                    .post("/account/username", username)
                    .then(response => {
                        console.log(JSON.parse(response.data) + "username");
                        this.$store.commit('updateUsernameExists', JSON.parse(response.data));
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
    }
</script>

<style scoped>
    @import '../assets/styles/style.css';
</style>
