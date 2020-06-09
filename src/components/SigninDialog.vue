<template>
    <el-dialog title="登录&注册" :visible.sync="user.visible" v-loading="user.loading">
        <el-form :model="user">
            <el-form-item>
                <el-input type="text" v-model="user.name" autocomplete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input
                    type="password"
                    v-model="user.password"
                    autocomplete="off"
                    placeholder="密码"
                ></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="default" @click="register">注 册</el-button>
            <el-button type="primary" @click="signIn">登 录</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapState(["user"])
    },
    methods: {
        ...mapActions(["register", "signIn"])
    }
};
</script>

<style>
</style>