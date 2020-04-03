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
        this.$store.dispatch("active");
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
    text-align: center;
    color: #2c3e50;
}
</style>
