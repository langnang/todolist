<template>
    <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="4" style="text-align:left;font-size:24px;">ToDoList - offline</el-col>
        <el-col :span="12" style="text-align:right;">
            <el-button size="small" type="danger" icon="el-icon-refresh" circle></el-button>
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
                @click="toggleSignIn"
            ></el-button>
            <el-button size="small" type="info" circle v-if="user.active" @click="signOut">
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
        ...mapState([]),
        ...mapGetters(["todoListChecked", "user"])
    },
    methods: {
        ...mapMutations(["toggleToDo", "toggleSignIn"]),
        ...mapActions(["batchDeleteToDo", "signOut"])
    }
};
</script>

<style>
</style>