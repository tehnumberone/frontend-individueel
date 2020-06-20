import http from "../../http-common";
import {mapMutations} from "vuex";
import {errorService} from "./errorService";

export const accountService = {
    methods: {
        ...mapMutations([
            'updateAccount',
            'setUsernameError',
            'setEmailError'
        ]),
        checkRegisterForm(account, Vue) {
            if (!account.username) {
                errorService.methods.addError("Username required.", Vue);
            } else {
                errorService.methods.removeError("Username required.", Vue);
            }
            if (!account.password) {
                errorService.methods.addError("Password required.", Vue);
            } else {
                errorService.methods.removeError("Password required.", Vue);
            }
            if (account.password !== account.repeatPassword) {
                errorService.methods.addError("Password is not the same as repeat password.", Vue);
            } else {
                errorService.methods.removeError("Password is not the same as repeat password.", Vue);
            }
            if (!account.email) {
                errorService.methods.addError("Email required.", Vue);
            } else if (!this.validEmail(account.email)) {
                errorService.methods.addError("Valid email required.", Vue);
            } else if (account.email) {
                errorService.methods.removeError("Email required.", Vue);
            } else if (this.validEmail(account.email)) {
                errorService.methods.removeError("Valid email required.", Vue);
            }
            if (account.username !== "" || account.email !== null) {
                if (account.username === "") {
                    account.username = null;
                }
                if (account.email === "") {
                    account.email = null;
                }
                this.CheckAccount(account, Vue);
            }
        },
        validEmail(email) {
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        CheckAccount(account, Vue) {
            http
                .get("/account/email/" + account.username + "/" + account.email)
                .then(response => {
                    if (response.data !== "") {
                        if (response.data.localeCompare("Username")) {
                            Vue.$store.commit('setUsernameError', response.data);
                        }
                        if (response.data.localeCompare("Email")) {
                            Vue.$store.commit('setEmailError', response.data);
                        }
                        if (!Vue.$store.getters.getErrors.includes(response.data)) {
                            errorService.methods.addError(response.data, Vue);
                        }
                    }
                    if (response.data === "") {
                        errorService.methods.removeError("Username is already taken.", Vue);
                        errorService.methods.removeError("Email is already taken.", Vue);
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        },
        registerAccount(account) {
            http
                .post("/register/", account)
                .then(response => {
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }
};
