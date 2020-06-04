import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        account: {
            errors: [],
            id: 0,
            username: null,
            password: null,
            role: null
        },
        error: {
            usernameError: null,
            emailError: null
        }
    },
    mutations: {
        updateAccount(state, account) {
            state.account = account;
        },
        resetErrors(state) {
            state.account.errors = [];
        },
        addError(state, error) {
            state.account.errors.push(error);
        },
        removeFromErrors(state, error) {
            state.account.errors = state.account.errors.filter(e => e !== error);
        },
        setUsernameError(state, error) {
            state.error.usernameError = error;
        },
        setEmailError(state, error) {
            state.error.emailError = error;
        },
        setRole(state, role) {
            state.account.role = role;
        },
        logOut(state) {
            state.account.username = null;
            state.account.errors = [];
            state.account.id = 0;
            state.account.username = null;
            state.account.password = null;
            state.account.role = null;
            sessionStorage.clear();
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
            if (sessionStorage.getItem('user') === null) {
                return state.account;
            } else return sessionStorage.getItem('user');
        },
        getUsername: state => {
            return state.account.username
        },
        getRole: state => {
            return state.account.role
        },
        getEmail: state => {
            return state.account.email
        },
        getUsernameError: state => {
            return state.error.usernameError;
        },
        getEmailError: state => {
            return state.error.emailError;
        }
    },
    setters: {}
})


