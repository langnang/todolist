<template>
    <div id="app">
        <HeaderRow />
        <CardBody />
        <ToDoDialog />
        <SigninDialog />
    </div>
</template>

<script>
import HeaderRow from "./components/HeaderRow";
import CardBody from "./components/CardBody";
import ToDoDialog from "./components/ToDoDialog";
import SigninDialog from "./components/SigninDialog";
export default {
    name: "app",
    components: {
        HeaderRow,
        CardBody,
        ToDoDialog,
        SigninDialog
    },
    created() {
        // this.$store.dispatch("active");
        if (window.localStorage.getItem("token")) {
            console.log("Have token");
            let token = JSON.parse(window.localStorage.getItem("token"));
            this.$store.dispatch("isTokenActive", token);
        } else {
            console.log("No token");
        }
    }
};
</script>

<style>
body,
html {
    margin: 0;
    padding: 0;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 5px;
    text-align: center;
    color: #2c3e50;
}
.particles-js-canvas-el {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}
</style>
