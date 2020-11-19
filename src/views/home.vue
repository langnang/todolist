<template>
  <div class="home-container">
    <el-row :gutter="20" style="margin-left: 0px;margin-right: 0px;">
      <el-col :span="12">
        <ToDoList />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ToDoList from "@/components/ToDoList";
export default {
  components: {
    ToDoList,
  },
};
</script>
