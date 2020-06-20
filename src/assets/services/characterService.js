import {mapMutations} from "vuex";
import {errorService} from "./errorService";
import http from "../../http-common";

export const characterService = {
    data() {
    },
    methods: {
        ...mapMutations([
            'setCharacters'
        ]),
        createCharacter(character) {
            console.log(character);
            http
                .post("/characters/create", character)
                .then(response => {
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        addToCharactersList(character,Vue){
            Vue.$store.commit('addCharacter', character);
        },
        deleteCharacter(characterId) {
            http
                .post("/characters/delete", characterId)
                .then(response => {
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        deleteCharacterByName(charactername){
            http
                .post("/characters/delete2", charactername)
                .then(response => {
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        setCharacterById(characterId, Vue) {
                http
                    .get("/character/" + characterId)
                    .then(response => {
                        Vue.$store.commit('setCharacter', response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
        },
        setAllCharactersByAccountId(accountId, Vue) {
            http
                .get("/characters/" + accountId)
                .then(response => {
                    Vue.$store.commit('setCharacters', response.data);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getAllCharacters(Vue) {
            const list = Vue.$store.getters.getCharacters;
            return list;
        },
        getCharacter(Vue) {
            const character = Vue.$store.getters.getCharacter;
            return character;
        },
        checkForm(character, Vue) {
            console.log(character);
            if (!character.name) {
                errorService.methods.addError("Character name required.", Vue);
            } else {
                errorService.methods.removeError("Character name required.", Vue);
            }
            if (!character.characterModel) {
                errorService.methods.addError("Character model required.", Vue);
            } else {
                errorService.methods.removeError("Character model required.", Vue);
            }
        },
    }
};
