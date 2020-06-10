export default {
    state: {
        visible: false,
        loading: false,
        name: "",
        content: "",
        index: null,
        list: [],
        list_checked: [],
    },
    mutations: {
        initToDo(state) {
            state.name = "";
            state.content = "";
            state.index = null;
        },
        setToDo(state, payload = { name: "", content: "" }) {
            state.name = payload.name;
            state.content = payload.content;
        },
        toggleToDo(state) {
            state.visible = !state.visible;
        },
        toggleToDoLoading(state) {
            state.loading = !state.loading;
        },
        unshiftToDoList(state, payload) {
            state.list.unshift(payload);
        },
        setToDoList(state, payload) {
            state.list = payload;
        },
        deleteToDo(state, payload) {
            state.list = state.list.splice(payload, 1);
        },
        updateToDo(state, payload) {
            const _todo = state.list[payload];
            state.name = _todo.name;
            state.content = _todo.content;
            state.index = payload;
            state.visible = true;
        },
        toggleToDoItemChecked(state, payload) {
            state.list[payload].checked = !state.list[payload].checked;
        }
    },
    getters: {
        todo: (state) => {
            return { name: state.name, content: state.content };
        },
        todoListChecked: state => state.list.some(item => item.checked == true)
    },
    actions: {
        getTodos() { },
        insertTodo() { },
        deleteTodo() { },
        updateTodo() { },
    }
}