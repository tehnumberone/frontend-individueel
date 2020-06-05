<template>
    <div>
        <h1>Characters</h1>
        <table class="table table-bordered table-dark largetd col-md-6" align="center">
            <tr>
                <th>Character</th>
                <th>Character Level</th>
                <th>Options</th>
            </tr>
            <tr v-for="(character, index) in characters" v-bind:key="index">
                <td><img/> {{character.characterModel}}
                    <label class="charName">{{character.name}}</label>
                </td>
                <td>
                    <label class="charName">{{character.level}}</label>
                </td>
                <td class="smalltd">
                    <div>
                        <button v-on:click="playCharacter(character.id) " class="btn btn-success"
                                style="margin-right:5px">Play
                        </button>
                        <button v-on:click="deleteCharacter(character.id)" class="btn btn-success"
                                style="margin-right:5px">Delete
                        </button>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <button v-on:click="createCharacterPage()" class="btn btn-success">New Character</button>
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
                console.log(user.id);
                characterService.methods.setAllCharactersByAccountId(user.id, this);
                this.characters = characterService.methods.getAllCharacters(this);
                console.log(this.characters);
            },
            refreshList() {
                this.retrieveCharacters();
            },
            deleteCharacter(characterId) {
                characterService.methods.deleteCharacter(characterId);
                this.retrieveCharacters();
                location.reload();
            },
            createCharacterPage() {
                this.$router.push("/characters/create");
            },
            playCharacter(characterId) {
                characterService.methods.setCharacterById(characterId,this);
                this.$router.push("/play");
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
