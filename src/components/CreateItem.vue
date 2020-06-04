<template>
    <div>
        <h1>CreateItem</h1>
            <div class="container row">
                <div class="col-md-2">
                    <label>Item Name</label>
                </div>
                <div class="col-md-5">
                    <input type="text"/>
                </div>
                <div class="col-md-5"></div>
                <div class="col-md-2">
                    <label>Item Type</label>
                </div>
                <div class="col-md-5">
                    <select >
                        <option></option>
                    </select>
                </div>
                <div class="col-md-5"></div>
                <div class="col-md-2">
                    <label>Item Image</label>
                </div>
            </div>
            <input type="submit" value="Create" />
    </div>
</template>

<script>
    export default {
        name: "CreateItem"
    }
</script>

<style scoped>
    @import '../assets/styles/style.css';
</style>
