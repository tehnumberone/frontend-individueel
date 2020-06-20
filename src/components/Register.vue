<template>
    <div class="form-row" style="margin-left:400px">
        <div class="col-md-12"><h1 style="color: #e5e5e5">Register</h1></div>
        <div v-if="account.errors.length > 0">
            <b>Please correct the following error(s):</b>
            <ul>
                <li class="col-md-12 error" v-for="(value, index) in account.errors" v-bind:key="index">{{ value }}</li>
            </ul>
        </div>
        <div v-else><br>
            <b>Please fill in your details.</b>
            <br><br>
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
        <button id="registerButton" v-on:click="checkForm(account)" class="btn btn-success col-md-3">Register</button>
    </div>
</template>

<script>
    import {accountService} from "../assets/services/accountService";
    import {errorService} from "../assets/services/errorService";

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
                    repeatPassword: "",
                },
            }
        },
        methods: {
            checkForm(account) {
                console.log(account);
                accountService.methods.checkRegisterForm(account, this);
                this.account.errors = errorService.methods.getErrors(this);
                    if (this.account.errors.length === 0) {
                        accountService.methods.registerAccount(account);
                        this.$router.push("login")
                    }
            }
        }
    }
</script>

<style scoped>
    @import '../assets/styles/style.css';
</style>
