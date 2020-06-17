// const  API_PATH= "https://chenlanglang.top:9099",
const API_PATH = "https://172.21.186.19:9099";
const SRC_PATH = "https://chenlanglang.top:9099";

module.exports = {
    API_PATH,
    SRC_PATH,
    APIs: {
        token_useable: `${API_PATH}/token/useable`,
        user_info: `${API_PATH}/user/info`,
        todo_insert: `${API_PATH}/todo/insert`,
        todo_delete: `${API_PATH}/todo/delete`,
        todo_update: `${API_PATH}/todo/update`,
        todo_info: `${API_PATH}/todo/info`,
        todo_list: `${API_PATH}/todo/list`,
    },
    SRCs: {
        particles: `${SRC_PATH}/static/json/particles.js/index.json`,
    },
    notify: {
        title: {
            success: "Success",
            error: "Error",
        },
        insert_todo: {
            success: "插入成功",
            error: "插入失败",
        },
        delete_todo: {
            success: "删除成功",
            error: "插入失败",
        },
        update_todo: {
            success: "更新成功",
            error: "更新失败",
        },
    },
}