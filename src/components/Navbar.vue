<template>
    <div>
        <br>
        <nav id="navbar">
            {{getusername}}
            <div v-if="getusername=== null || getusername === undefined  ">
                <router-link
                        class="btn btn-primary" to="/register">
                    Register
                </router-link>
                <router-link class="btn btn-primary" to="/login">Login</router-link>
            </div>
        </nav>
    </div>
</template>

<script>
    //import { mapGetters } from 'vuex'

    export default {
        name: "navbar",
        computed: {
            getusername(){
                return this.$store.getters.getUsername;
            }
        }
    }
</script>

<style scoped>

</style>
