<template>
    <div>
        <h1>Play</h1>
        <table class="table table-bordered table-dark largetd col-md-6" align="center">
            <tr>
                <th>Character</th>
                <th>Character Model</th>
                <th>Character Level</th>
                <th>Hitpoints</th>
                <th>Hydration</th>
                <th>Hunger</th>
            </tr>
            <tr class="characterTable">
                <td><img/> {{character.characterModel}}
                    <label class="charName">{{character.name}}</label>
                </td>
                <td>
                    <label class="charName">{{character.characterModel}}</label>
                </td>
                <td>
                    <label class="charName">{{character.level}}</label>
                </td>
                <td>
                    <label class="charName">{{character.hp}}</label>
                </td>
                <td>
                    <label class="charName">{{character.hydration}}</label>
                </td>
                <td>
                    <label class="charName">{{character.hunger}}</label>
                </td>
            </tr>
        </table>
        <router-view @refreshData="refreshData"></router-view>
    </div>
</template>

<script>
    import {characterService} from "../assets/services/characterService";

    export default {
        name: "Play",
        data() {
            return {
                character: {
                    name: null,
                    characterModel: null,
                    hp: 0,
                    level: 0,
                    hydration: 0,
                    hunger: 0
                }
            }
        }
        ,
        methods: {
            getCharacter() {
                this.character = characterService.methods.getCharacter(this);
                console.log(this.character);
            },
            refreshData() {
                this.getCharacter();
            }
        },
        mounted() {
            this.getCharacter();
        }
    }
</script>

<style scoped>
    @import '../assets/styles/style.css';
</style>
