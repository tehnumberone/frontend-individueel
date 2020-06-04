<template>
    <div>

        <h1>Create Character</h1>
        <br>
        <div class="container row">
            <div class="col-md-2">
                <label>Character Name</label>
            </div>
            <div class="col-md-3">
                <input type="text" asp-for="Name" class="form-control" />
            </div>
            <div class="col-md-7"></div>
            <div class="col-md-12"><br></div>
            <div class="col-md-2">
                <label>Character Model</label>
            </div>
            <div class="col-md-4">
                <input type="button" class="Char form-control"/>
            </div>
        </div>
        <input type="submit" value="Create" />
    </div>
</template>

<script>
    export default {
        name: "CreateCharacter"
    }
</script>

<style scoped>
    @import '../assets/styles/style.css';
</style>
