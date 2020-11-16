export default {
  namespaced: true,
  state: {
    visible: false,
    loading: false,
    id: null,
    index: null,
    title: "",
    desc: "",
    content: "",
    list: [],
    list_checked: [],
  },
  mutations: {
    initToDo(state) {
      state.id = null;
      state.index = null;
      state.title = "";
      state.desc = "";
      state.content = "";
    },
    setToDo(state, payload = { title: "", content: "" }) {
      state.title = payload.title;
      state.desc = payload.desc;
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
    deleteToDo(state, index) {
      state.list.splice(index, 1);
    },
    updateToDo(state, index) {
      const _todo = state.list[index];
      state.id = _todo.id;
      state.index = index;
      state.title = _todo.title;
      state.desc = _todo.desc;
      state.content = _todo.content;
      state.visible = true;
    },
    toggleToDoItemChecked(state, payload) {
      state.list[payload].checked = !state.list[payload].checked;
    },
  },
  getters: {
    todo: (state) => {
      let result = {
        title: state.title,
        desc: state.desc,
        content: state.content,
      };
      if (state.id != null) {
        result.id = state.id;
        result.index = state.index;
      }
      return result;
    },
    todoListChecked: (state) => state.list.some((item) => item.checked == true),
  },
  actions: {
    loadToDoList({ state, commit }) {
      let list = [];
      if (localStorage.getItem("todoList") !== null) {
        list = JSON.parse(localStorage.getItem("todoList"));
      }
      if (state.user.active) {
        let axios = this._vm.axios;
        Promise.all(
          list.map(
            (todo) =>
              new Promise((resolve) => {
                axios
                  .post("/api/todo/insert", {
                    data: { ...todo, token: state.user.token },
                  })
                  .then(resolve);
              })
          )
        ).then(() => {
          localStorage.removeItem("todoList");
          axios.get("/api/todo/list").then((res) => {
            if (res.data.status === 200) {
              commit(
                "setToDoList",
                res.data.data.list.map((item) => {
                  return { ...item, checked: false };
                })
              );
            }
          });
        });
      } else {
        commit("setToDoList", list);
      }
    },
    saveToDo({ state, dispatch }) {
      // 检测id是否存在?存在则更新:不存在则新增
      if (state.id != null) {
        dispatch("updateTodo");
      } else {
        dispatch("insertTodo");
      }
    },
    deleteToDo({ commit, dispatch }, index) {
      let opts = { msg: "delete_todo" };
      commit("updateToDo", index);
      commit("toggleToDo");
      dispatch("callTodoDelete")
        .then(function(res) {
          if (res.status == 200 && res.data.status == 200) {
            opts.type = "success";
            commit("deleteToDo", index); // 删除待办事项
          } else {
            opts.type = "error";
          }
        })
        .finally(function() {
          dispatch("notify", opts);
        });
    },
    batchDeleteToDo({ state, dispatch }) {
      let list = state.todo.list;
      for (let i = list.length - 1; i >= 0; i--) {
        if (list[i].checked == true) dispatch("deleteToDo", i);
      }
    },
    insertTodo({ dispatch, commit, getters }) {
      let opts = { msg: "insert_todo" };
      dispatch("callTodoInsert")
        .then(function(res) {
          if (res.status == 200 && res.data.status == 200) {
            opts.type = "success";
            commit("unshiftToDoList", getters.todo); // 头部插入新增的待办事项
            commit("toggleToDo"); // 切换对话框
          } else {
            opts.type = "error";
          }
        })
        .finally(function() {
          dispatch("notify", opts);
        });
    },
    updateTodo({ dispatch, commit, getters }) {
      let opts = { msg: "update_todo" };
      dispatch("callTodoUpdate")
        .then(function(res) {
          if (res.status == 200 && res.data.status == 200) {
            opts.type = "success";
            let todo = getters.todo;
            commit("deleteToDo", todo.index); // 删除更新前的待办事项
            commit("unshiftToDoList", todo); // 头部插入更新的待办事项
            commit("toggleToDo"); // 切换对话框
          } else {
            opts.type = "error";
          }
        })
        .finally(function() {
          dispatch("notify", opts);
        });
    },
    getTodoList({ dispatch, commit }) {
      commit("setAppLoadingText", "getTodoList");
      dispatch("callTodoList")
        .then(function(res) {
          if (res.status == 200 && res.data.status == 200) {
            commit("setAppLoadingText", "getTodoList_success");
            commit(
              "setToDoList",
              res.data.data.map((v) => {
                v.checked = false;
                return v;
              })
            );
          } else {
            commit("setAppLoadingText", "getTodoList_error");
          }
        })
        .finally(function() {
          commit("toggleAppLoading");
        });
    },
    getTodo() {},
  },
};
