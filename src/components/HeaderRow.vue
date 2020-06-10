<template>
    <el-row type="flex" class="row-bg" justify="space-between" style="background:transparent;">
        <el-col :span="12" style="text-align:left;font-size:24px;line-height:30px;">
            ToDoList (h5) -
            <span v-if="user.active">on</span>
            <span v-else>off</span>line
        </el-col>
        <el-col :span="12" style="text-align:right;line-height:30px;">
            <el-button
                size="small"
                :type="user.active?'info':'danger'"
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
                v-if="!user.active"
                @click="toSignIn"
            ></el-button>
            <el-button size="small" type="info" circle v-if="user.active" @click="toSignOut">
                <font-awesome-icon :icon="['fas','sign-out-alt']" size="xs" />
            </el-button>
        </el-col>
    </el-row>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapState(["user"]),
        ...mapGetters(["todoListChecked", "user"])
    },
    methods: {
        ...mapMutations(["toggleToDo", "toggleSignIn"]),
        ...mapActions(["batchDeleteToDo", "signOut"]),
        toSignIn() {
            window.location.href = "https://langnang.github.io/#/sign-in";
        },
        toSignOut() {
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