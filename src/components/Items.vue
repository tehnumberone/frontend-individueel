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
            <tr class="itemTable" v-for="(item, index) in items" v-bind:key="index">
                <td><img src="" class="itemImage"/>{{item.name}}</td>
                <td><label class="charName">{{item.Name}}</label></td>
                <td><label class="charName">{{item.ItemType}}</label></td>
                <td class="smalltd">
                    <!--<button class="btn btn-success" style="margin-right:5px" >Edit</button>-->
                    <button id="delete" v-on:click="deleteItem(item.id)" class="btn btn-success">Delete</button>
                </td>
            </tr>
            <button id="refreshButton" v-on:click="refreshList()" class="btn btn-success">Refresh List</button>
        </table>
        <router-view @refreshData="refreshList"></router-view>
    </div>
</template>

<script>
    import {itemService} from "../assets/services/itemService";

    export default {
        name: "Items",
        data() {
            return {
                items: []
            }
        },
        methods: {
            retrieveItems() {
                itemService.methods.setAllItems(this);
                this.items = itemService.methods.getAllItems(this);
            },
            refreshList() {
                this.retrieveItems();
                location.reload();
            },
            deleteItem(itemId) {
                itemService.methods.deleteItem(itemId);
                this.retrieveItems();
                location.reload();
            }
        },
        mounted() {
            this.retrieveItems();
        },
    }
</script>

<style scoped>
    @import '../assets/styles/style.css';
</style>
