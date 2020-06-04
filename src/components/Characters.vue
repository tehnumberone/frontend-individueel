<template>
    <div>
        <h1>Characters</h1>
        <table class="table table-bordered table-dark largetd col-md-6" align="center">
            <tr>
                <th>Character</th>
                <th>Options</th>
            </tr>
            <tr>
                <td><img /> character.characterModel <label
                        class="charName">character.Name</label></td>
                <td class="smalltd">
                    <div>
                            <input type="submit" value="Play"/>
                            <input type="submit" value="Delete"/>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                        <input type="submit" value="New Character"/>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "Characters"
    }
</script>

<style scoped>
    @import '../assets/styles/style.css';
</style>
