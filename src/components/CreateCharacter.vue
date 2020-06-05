<template>
    <div>

        <h1>Create Character</h1>
        <br>
        <div v-if="character.errors.length > 0">
            <b>Please correct the following error(s):</b>
            <ul>
                <li class="col-md-3" v-for="(value, index) in character.errors" v-bind:key="index">{{ value }}</li>
                <div class="col-md-9"></div>
            </ul>
        </div>
        <div class="container row">
            <div class="col-md-2">
                <label>Character Name</label>
            </div>
            <div class="col-md-4">
                <input type="text" class="form-control" id="name" required v-model="character.name" name="name">
            </div>
            <div class="col-md-12"><br></div>
            <div class="col-md-2">
                <label>Character Model</label>
            </div>
            <div class="col-md-4">
                <input type="text" class="form-control" id="characterModel" required v-model="character.characterModel"
                       name="characterModel">
            </div>
        </div>
        <br>
        <button v-on:click="checkForm(character)" class="btn btn-success col-md-2">Create</button>
    </div>
</template>

<script>
    import {errorService} from "../assets/services/errorService";
    import {characterService} from "../assets/services/characterService";

    export default {
        name: "CreateCharacter",
        data() {
            return {
                character: {
                    errors: [],
                    accountId: 0,
                    name: null,
                    characterModel: null,
                },
            }
        },
        methods: {
            checkForm(character) {
                characterService.methods.checkForm(character, this);
                this.character.errors = errorService.methods.getErrors(this);
                if (this.character.errors.length === 0) {
                    let user = JSON.parse(sessionStorage.getItem('user'));
                    character.accountId = user.id;
                    characterService.methods.createCharacter(character);
                    this.$router.push("/characters")
                    location.reload();
                }
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
    @import '../assets/styles/style.css';
</style>
