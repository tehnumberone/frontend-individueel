<template>
    <div>
        <table class="table table-bordered table-dark largetd col-md-6" align="center">
            <tr>
                <th>Character</th>
                <th>Character Level</th>
                <th>Options</th>
            </tr>
            <tr v-for="(character, index) in characters" v-bind:key="index" class="characterTable">
                <td><img/> {{character.characterModel}}
                    <label class="charName">{{character.name}}</label>
                </td>
                <td>
                    <label class="charName">{{character.level}}</label>
                </td>
                <td class="smalltd">
                    <div>
                        <button id="play" v-on:click="playCharacter(character.characterId) " class="btn btn-success"
                                style="margin-right:5px">Play
                        </button>
                        <button id="delete" v-on:click="deleteCharacter(character)" class="btn btn-success"
                                style="margin-right:5px">Delete
                        </button>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <button id="newCharacter" v-on:click="createCharacterPage()" class="btn btn-success">New Character
                    </button>
                </td>
                <td>
                    <button id="refreshButton" v-on:click="refreshList()" class="btn btn-success">Refresh List</button>
                </td>
            </tr>
        </table>
        <router-view @refreshData="refreshList"></router-view>
    </div>
</template>

<script>
    import {characterService} from "../assets/services/characterService";

    export default {
        name: "Characters",
        data() {
            return {
                characters: []
            }
        },
        methods: {
            retrieveCharacters() {
                let user = JSON.parse(sessionStorage.getItem('user'));
                let templist = characterService.methods.getAllCharacters(this)
                if(templist !== null){characterService.methods.setAllCharactersByAccountId(user.id, this);}
                //let temp = characterService.methods.getAllCharacters(this)
                let temp = JSON.parse(localStorage.getItem('characters'));
                this.characters = temp;
            },
            refreshList() {
                let temp = characterService.methods.getAllCharacters(this)
                this.characters = temp;
                location.reload();
            },
            deleteCharacter(character) {
                console.log(character);
                if (character.characterId === 0) {
                    characterService.methods.deleteCharacterByName(character.name)
                } else {
                    characterService.methods.deleteCharacter(character.characterId);
                }
                let user = JSON.parse(sessionStorage.getItem('user'));
                characterService.methods.setAllCharactersByAccountId(user.id, this);
                this.characters = this.characters.filter(e => e !== character);
            },
            createCharacterPage() {
                this.$router.push("/characters/create");
            },
            playCharacter(characterId) {
                characterService.methods.setCharacterById(characterId, this);
                this.$router.push("/play");
                setTimeout(function () {
                    location.reload();
                }, 1000);
            }
        },
        mounted() {
            this.retrieveCharacters();
        },
    }
</script>

<style scoped>
    @import '../assets/styles/style.css';
</style>
