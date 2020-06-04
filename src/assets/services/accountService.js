import http from "../../http-common";
import {mapMutations} from "vuex";

export const accountService = {
    data() {
        return {
            err: {
                usernameError: null,
                emailError: null
            }
        }
    },
    methods: {
        ...mapMutations([
            'updateAccount',
            'resetErrors',
            'addError',
            'removeFromErrors',
            'setUsernameError',
            'setEmailError'
        ]),
        checkRegisterForm(account, Vue) {
            if (!account.username) {
                this.addError("Username required.", Vue);
            } else {
                this.removeError("Username required.", Vue);
            }
            if (!account.password) {
                this.addError("Password required.", Vue);
            } else {
                this.removeError("Password required.", Vue);
            }
            if (account.password !== account.repeatPassword) {
                this.addError("Password is not the same as repeat password.", Vue);
            } else {
                this.removeError("Password is not the same as repeat password.", Vue);
            }
            if (!account.email) {
                this.addError("Email required.", Vue);
            } else if (!this.validEmail(account.email)) {
                this.addError("Valid email required.", Vue);
            } else if (account.email) {
                this.removeError("Email required.", Vue);
            } else if (this.validEmail(account.email)) {
                this.removeError("Valid email required.", Vue);
            }
            if (account.username !== "" || account.email !== null) {
                this.CheckAccount(account, Vue);
            }
        },
        addError(error, Vue) {
            if (!Vue.$store.getters.getErrors.includes(error)) {
                Vue.$store.commit('addError', error);
            }
        },
        removeError(error, Vue) {
            Vue.$store.commit('removeFromErrors', error);
        },
        validEmail(email) {
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        CheckAccount(account, Vue) {
            if (account.username == "") {
                account.username = null;
            }
            if (account.email == "") {
                account.email = null;
            }
            http
                .get("/account/email/" + account.username + "/" + account.email)
                .then(response => {
                    console.log(response.data);
                    if (response.data !== "") {
                        if (response.data.localeCompare("Username")) {
                            Vue.$store.commit('setUsernameError', response.data);
                        }
                        if (response.data.localeCompare("Email")) {
                            Vue.$store.commit('setEmailError', response.data);
                        }
                        if (!Vue.$store.getters.getErrors.includes(response.data)) {
                            Vue.$store.commit('addError', response.data);
                        }
                    }
                    if (response.data === "") {
                        console.log("hello");
                        Vue.$store.commit('removeFromErrors', "Username is already taken.");
                        Vue.$store.commit('removeFromErrors', Vue.$store.getters.getEmailError);
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getErrors(Vue) {
            return Vue.$store.getters.getErrors;
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
