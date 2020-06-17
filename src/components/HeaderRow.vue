<template>
    <el-row
        type="flex"
        class="row-bg"
        justify="space-between"
        style="background:transparent;padding:0 0 10px 0;"
    >
        <el-col :span="12" style="text-align:left;font-size:24px;line-height:30px;">
            ToDoList (h5) -
            <span v-if="token.active">on</span>
            <span v-else>off</span>line
        </el-col>
        <el-col :span="12" style="text-align:right;line-height:30px;">
            <el-button
                size="small"
                :type="token.active?'info':'danger'"
                icon="el-icon-refresh"
                circle
            ></el-button>
            <el-button size="small" type="info" icon="el-icon-search" circle></el-button>
            <el-button size="small" type="info" icon="el-icon-plus" circle @click="toggleToDo"></el-button>
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
                icon="el-icon-user"
                circle
                v-if="!token.active"
                @click="redirectToSignIn"
            ></el-button>
            <el-button
                size="small"
                type="info"
                circle
                v-if="token.active"
                @click="redirectToSignOut"
            >
                <font-awesome-icon :icon="['fas','sign-out-alt']" size="xs" />
            </el-button>
        </el-col>
    </el-row>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["todoListChecked", "token"])
    },
    methods: {
        ...mapMutations(["toggleToDo", "toggleSignIn"]),
        ...mapActions(["batchDeleteToDo"]),
        redirectToSignIn() {
            window.location.href = "https://langnang.github.io/#/sign-in";
        },
        redirectToSignOut() {
            window.location.href = "https://langnang.github.io/#/sign-out";
        }
    }
};
</script>

<style scoped>
.el-button--small {
    /* font-size: 19px; */
}
.el-button--small.is-circle {
    padding: 6px;
}
</style>