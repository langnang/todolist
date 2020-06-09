<template>
    <el-row>
        <el-col :span="6" v-for="(todo,index) in list" :key="index">
            <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                    <span>{{todo.name}}</span>
                    <el-row style="text-align:center;position:absolute;width:100%;bottom:-29px;">
                        <el-button
                            size="mini"
                            type="primary"
                            icon="el-icon-edit"
                            circle
                            @click="updateToDo(index)"
                        ></el-button>
                        <el-button
                            size="mini"
                            :type="todo.checked?'warning':'default'"
                            icon="el-icon-check"
                            circle
                            @click="toggleToDoItemChecked(index)"
                        ></el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            @click="deleteToDo(index)"
                        ></el-button>
                    </el-row>
                </div>
                <div class="content-html" v-html="marked(todo.content)"></div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import marked from "marked";
export default {
    computed: {
        ...mapState({
            list: state => state.todo.list
        })
    },
    methods: {
        ...mapMutations(["updateToDo", "toggleToDoItemChecked"]),
        ...mapActions(["deleteToDo"]),
        marked: marked
    }
};
</script>

<style lang="scss" scoped>
.el-card {
    .el-row {
        // display: none;
    }
    &:hover .el-row {
        // display: block;
    }
}
.content-html {
    text-align: left;
}
.clearfix {
    position: relative;
    font-size: 20px;
    font-weight: bold;
}
.el-button--mini.is-circle {
    padding: 3px;
}
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both;
}
</style>