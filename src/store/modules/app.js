export default {
    state: {
        loading: true,
        loading_text: "加载中......",
        loading_text_list: {
            default: "加载中......",
            hasLocalToken: "检测本地缓存令牌",
            isTokenActive: "校验令牌有效性......",
            isTokenActive_success: "令牌有效",
            isTokenActive_error: "令牌无效",
            hasLocalTodo: "检测本地待办事项",
            getTodoList: "获取待办事项列表......",
            getTodoList_success: "获取待办事项列表成功",
            getTodoList_error: "获取待办事项列表失败",
        }
    },
    mutations: {
        toggleAppLoading(state) {
            state.loading = !state.loading;
        },
        setAppLoadingText(state, key = "default") {
            if (!state.loading_text_list[key]) {
                key = "default";
            }
            state.loading_text = state.loading_text_list[key];
        }
    }
}