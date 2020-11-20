<template>
  <div class="home-container">
    <el-row :gutter="20" style="margin-left: 0px;margin-right: 0px;">
      <el-col :span="8" v-for="(item, key) in list" :key="key">
        <ToDoList :list="item.data" :title="item.title" @delete="onDelete" />
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
  data() {
    return {
      list: [
        {
          title: "!!!!!!!",
          data: [{ state: true, content: "列表内容0", time: "" }],
        },
        {
          title: "@@@@@@@@@",
          data: [
            { state: true, content: "列表内容0", time: "" },
            { state: true, content: "列表内容1", time: "" },
            { state: false, content: "列表内容2", time: "" },
            { state: true, content: "列表内容3", time: "" },
            { state: true, content: "列表内容4", time: "" },
          ],
        },
        {
          title: "##########",
          data: [
            { state: true, content: "列表内容0", time: "" },
            { state: true, content: "列表内容1", time: "" },
            { state: false, content: "列表内容2", time: "" },
            { state: true, content: "列表内容3", time: "" },
            { state: true, content: "列表内容4", time: "" },
          ],
        },
        {
          title: "!!!!!!!",
          data: [{ state: true, content: "列表内容0", time: "" }],
        },
      ],
    };
  },
  methods: {
    onDelete(index) {
      console.log(index);
    },
  },
};
</script>
