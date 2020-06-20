<template>
    <div>
        <h1>CreateItem</h1>
        <div v-if="item.errors.length > 0">
            <b>Please correct the following error(s):</b>
            <ul>
                <li class="col-md-12" v-for="(value, index) in item.errors" v-bind:key="index">{{ value }}</li>
            </ul>
        </div>
        <div class="container row">
            <div class="col-md-2">
                <label>Item Name</label>
            </div>
            <div class="col-md-5">
                <input type="text" class="form-control" id="name" required v-model="item.name" name="name">
            </div>
            <div class="col-md-5"></div>
            <div class="col-md-2">
                <label>Item Type</label>
            </div>
            <div class="col-md-5">
                <select required v-model="item.type" id="type" name="type">
                   <!-- <option v-for="(value, index) in typesArray" v-bind:key="index">{{value}}</option>-->
                    <option value="Weapon">Weapon</option>
                    <option value="Tool">Tool</option>
                    <option value="Food">Food</option>
                    <option value="Armour">Armour</option>
                </select>
            </div>
            <div class="col-md-5"></div>
            <div class="col-md-2">
                <label>Item Image</label>
            </div>
            <div class="col-md-5">
                <input type="text" class="form-control" id="itemImage" required v-model="item.itemImage" name="itemImage">
            </div>
        </div>
        <button id="create" v-on:click="checkForm(item)" class="btn btn-success col-md-3">Create Item</button>
    </div>
</template>

<script>
    import {itemService} from "../assets/services/itemService";
    import {errorService} from "../assets/services/errorService";

    export default {
        name: "CreateItem",
        data() {
            return {
                item: {
                    errors: [],
                    name: null,
                    type: null,
                    itemImage: null
                },
                types: {
                    0: "Weapon",
                    1: "Tool",
                    2: "Food",
                    3: "Armour"
                },
                typesArray: []
            }
        },
        methods: {
            getItemTypeList() {
                this.typesArray = Object.values(this.types);
            },
            checkForm(item){
                itemService.methods.checkForm(item,this);
                this.item.errors = errorService.methods.getErrors(this);
                if (this.item.errors.length === 0) {
                    itemService.methods.createItem(item);
                    this.$router.push("/items")
                }
            }
        },
        mounted() {
            this.getItemTypeList();
        }
    }
</script>

<style scoped>
    @import '../assets/styles/style.css';
</style>
