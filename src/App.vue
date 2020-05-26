<template>
    <div id="app" class="container-fluid">
        <div class="site-info">
        </div>
        <nav>
            <Header></Header>
        </nav>
        <br/>
        <router-view/>
    </div>
</template>

<script>
    import header from "./components/Navbar";

    export default {
        name: "app",
        components: {
            'Header': header
        }
    };
</script>

<style>
    @import '/assets/styles/style.css';
</style>
