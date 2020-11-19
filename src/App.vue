<template>
  <div
    id="app"
    v-loading="app.loading"
    :element-loading-text="app.loading_text"
  >
    <HeaderRow />
    <el-scrollbar>
      <router-view></router-view>
      <CardBody />
    </el-scrollbar>
    <ToDoDialog />
  </div>
</template>

<script>
import HeaderRow from "./components/HeaderRow";
import CardBody from "./components/CardBody";
import ToDoDialog from "./components/ToDoDialog";
import { mapState } from "vuex";
export default {
  name: "app",
  components: {
    HeaderRow,
    CardBody,
    ToDoDialog,
  },
  created() {
    if (window.localStorage.getItem("token")) {
      let token = JSON.parse(window.localStorage.getItem("token"));
      this.$store.dispatch("isTokenActive", token);
    } else if (window.localStorage.getItem("list")) {
      console.warn("There has a local storage todo-list");
    } else {
      console.error("There is not a local storage token and todo-list");
    }
  },
  computed: {
    ...mapState(["app"]),
  },
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
  /* margin-top: 5px; */
  text-align: center;
  color: #2c3e50;
  background: #dfdfdf;
}
.particles-js-canvas-el {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
.el-scrollbar__wrap {
  height: calc(100vh - 33px) !important;
}
.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  /* background: #dfdfdf; */
}
</style>
