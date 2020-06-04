<template>
    <div>
        <h1>Items</h1>
        <table class="table table-bordered table-dark largetd" align="center" style="width: 70%">
            <tr>
                <th>Item Image</th>
                <th>Item Name</th>
                <th>Item Type</th>
                <th>Options</th>
            </tr>
            <tr>
                <td><img src="" class="itemImage"/>item.ItemImage</td>
                <td><label class="charName">item.Name</label></td>
                <td><label class="charName">item.ItemType</label></td>
                <td class="smalltd">
                        <input type="submit" value="Edit"/>
                        <input type="submit" value="Delete"/>
                </td>
            </tr>

        </table>
    </div>
</template>

<script>
    export default {
        name: "Items"
    }
</script>

<style scoped>
    @import '../assets/styles/style.css';
</style>
