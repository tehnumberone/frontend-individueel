<template>
    <div class="list row">
        <div class="col-md-6">
            <h4>Customers List</h4>
            <ul>
                <li v-for="(customer, index) in customers" :key="index">
                    <router-link :to="{
                            name: 'customer-details',
                            params: { customer: customer, id: customer.id }
                        }">
                        {{customer.name}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <router-view @refreshData="refreshList"></router-view>
        </div>
    </div>
</template>

<script>
    import http from "../http-common";

    export default {
        name: "customers-list",
        data() {
            return {
                customers: [
                    {
                        id: 1,
                        name: "bob",
                        age: 12,
                        active: true
                    },
                    {
                        id: 2,
                        name: "bob",
                        age: 13,
                        active: true
                    },
                    {
                        id: 3,
                        name: "bob",
                        age: 14,
                        active: true
                    }
                ]
            };
        },
        methods: {
            /* eslint-disable no-console */
            retrieveCustomers() {
                http
                    .get("/customers")
                    .then(response => {
                        this.customers = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            refreshList() {
                this.retrieveCustomers();
            }
            /* eslint-enable no-console */
        },
        mounted() {
            this.retrieveCustomers();
        }
    };
</script>

<style>
    .list {
        text-align: left;
        max-width: 450px;
        margin: auto;
    }
</style>
