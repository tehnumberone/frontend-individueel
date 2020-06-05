import {mapMutations} from "vuex";

export const errorService = {
    methods: {
        ...mapMutations([
            'resetErrors',
            'addError',
            'removeFromErrors'
        ]),
        addError(error, Vue) {
            if (!Vue.$store.getters.getErrors.includes(error)) {
                Vue.$store.commit('addError', error);
            }
        },
        removeError(error, Vue) {
            Vue.$store.commit('removeFromErrors', error);
        },
        getErrors(Vue) {
            return Vue.$store.getters.getErrors;
        },
        resetErrors(Vue) {
            Vue.$store.commit('resetErrors');
        }
    }
};
