import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0,
        account: {
            errors: [],
            id: 0,
            username: null,
            password: null,
            emailExists: false,
            usernameExists: false
        },
    },
    mutations: {
        increment(state) {
            state.count++
        },
        updateAccount(state, account) {
            state.account = account;
        },
        resetErrors(state) {
            state.account.errors = [];
        },
        addError(state, error) {
            state.account.errors.push(error);
        },
        updateEmailExists(state, bool) {
            state.account.emailExists = bool;
        },
        updateUsernameExists(state, bool) {
            state.account.usernameExists = bool;
        }
    },
    getters: {
        getErrors: state => {
            return state.account.errors;
        },
        getErrorCount: (state, getters) => {
            return getters.getErrors.length
        },
        getAccount: state => {
            return state.account
        },
        getUsername: state => {
            return state.account.username
        },
        getEmail: state => {
            return state.account.email
        },
        getEmailExists: state => {
            return state.account.emailExists;
        },
        getUsernameExists: state => {
            return state.account.usernameExists;
        }
    },
    setters: {}
})


