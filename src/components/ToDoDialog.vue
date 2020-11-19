<template>
  <el-dialog
    title="代办事项"
    :visible.sync="todo.visible"
    v-loading="todo.loading"
    @closed="$store.commit('todo/initToDo')"
  >
    <el-form :model="todo">
      <el-form-item>
        <el-input
          type="text"
          v-model="todo.title"
          autocomplete="off"
          placeholder="标题"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="text"
          v-model="todo.desc"
          autocomplete="off"
          placeholder="简述"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="textarea"
          v-model="todo.content"
          :rows="6"
          placeholder="内容"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="$store.dispatch('todo/saveToDo')">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["todo"]),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.el-form {
  .el-form-item:last-child {
    margin-bottom: 0;
  }
}
</style>
