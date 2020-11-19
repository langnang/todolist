<template>
  <div class="header-container">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="12" class="header-title">
        ToDoList
      </el-col>
      <el-col :span="12" class="header-actions">
        <el-button
          size="small"
          :type="token.active ? 'info' : 'danger'"
          icon="el-icon-refresh"
          round
        >
        </el-button>
        <el-button size="small" type="info" icon="el-icon-search" round>
        </el-button>
        <el-button
          size="small"
          type="info"
          icon="el-icon-plus"
          round
          @click="$store.commit('todo/toggleToDo')"
        >
        </el-button>
        <el-button
          size="mini"
          type="info"
          icon="el-icon-delete"
          circle
          v-if="todoListChecked"
          @click="batchDeleteToDo"
        ></el-button>
        <el-button
          size="small"
          type="info"
          circle
          v-if="token.active"
          @click="redirectToSignOut"
        >
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" size="xs" />
        </el-button>
        <el-button
          v-if="false"
          size="small"
          type="info"
          round
          @click="
            redirectTo(
              'https://github.com/login/oauth/authorize?client_id=' + client_id
            )
          "
        >
          登 录
        </el-button>
        <el-button v-if="false" size="small" type="info" round>登 出</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      login: {
        visible: false,
      },
    };
  },
  computed: {
    ...mapGetters(["todoListChecked", "token", "client_id"]),
  },
  methods: {
    ...mapMutations(["toggleSignIn"]),
    ...mapActions(["batchDeleteToDo"]),
    redirectToSignOut() {
      window.location.href = "https://langnang.github.io/#/sign-out";
    },
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  height: 50px;
  background: #424c50;
  padding: 0 20px;
  .header-title {
    text-align: left;
    font-size: 24px;
    line-height: 50px;
    color: #fff;
  }
  .header-actions {
    text-align: right;
    line-height: 50px;
  }
}
.el-button--small {
  /* font-size: 19px; */
}
.el-button--small.is-circle {
  padding: 8px;
}
</style>
