import {mapMutations} from "vuex";
import {errorService} from "./errorService";
import http from "../../http-common";

export const itemService = {
    data() {
    },
    methods: {
        ...mapMutations([
            'setItems'
        ]),
        createItem(item) {
            http
                .post("/items/create", item)
                .then(response => {
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        deleteItem(itemId) {
            http
                .post("/items/delete", itemId)
                .then(response => {
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        setAllItems(Vue) {
            http
                .get("/items")
                .then(response => {
                    Vue.$store.commit('setItems', response.data); // JSON are parsed automatically.
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getAllItems(Vue) {
            const list = Vue.$store.getters.getItems;
            return list;
        },
        checkForm(item, Vue) {
            if (!item.name) {
                errorService.methods.addError("Item name required.", Vue);
            } else {
                errorService.methods.removeError("Item name required.", Vue);
            }
            if (!item.type) {
                errorService.methods.addError("Item type required.", Vue);
            } else {
                errorService.methods.removeError("Item type required.", Vue);
            }
            if (!item.itemImage) {
                errorService.methods.addError("Item image required.", Vue);
            } else {
                errorService.methods.removeError("Item image required.", Vue);
            }
        },
    }
};
