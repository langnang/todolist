import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user';
import todo from './modules/todo';

Vue.use(Vuex)

export default new Vuex.Store({
  mutations: {
  },
  getters: {},
  actions: {
    active({ commit, dispatch }) {
      this._vm.$axios
        .get("/api/user/active")
        .then(res => {
          if (res.data.status === 200) {
            commit("setUser", res.data.data);
          }
          dispatch("loadToDoList");
        })
    },
    signIn({ commit, getters, dispatch }) {
      this._vm.$axios
        .post("/api/user/signin", { data: getters.user })
        .then(res => {
          if (res.data.status === 200) {
            commit("setUser", res.data.data);
            commit("toggleSignIn");
            dispatch("loadToDoList");
          }
        })
    },
    signOut({ commit, dispatch }) {
      this._vm.$axios
        .get("/api/user/signout")
        .then(res => {
          if (res.data.status === 200) {
            commit("initUser");
            dispatch("loadToDoList");
          }
        })
    },
    loadToDoList({ state, commit }) {
      let list = [];
      if (localStorage.getItem("todoList") !== null) {
        list = JSON.parse(localStorage.getItem("todoList"));
      }
      if (state.user.active) {
        let axios = this._vm.axios;
        Promise.all(
          list.map(
            todo => new Promise(resolve => {
              axios.post("/api/todo/insert", { data: { ...todo, token: state.user.token } })
                .then(resolve)
            })
          )
        ).then(() => {
          localStorage.removeItem("todoList");
          axios
            .get("/api/todo/list").then(res => {
              if (res.data.status === 200) {
                commit("setToDoList", res.data.data.list.map(item => { return { ...item, checked: false } }))
              }
            })
        })
      } else {
        commit("setToDoList", list);
      }
    },
    saveToDo({ state, commit, getters }) {
      let axios = this._vm.$axios;
      commit("toggleToDoLoading");
      new Promise((resolve) => {
        if (!state.user.active) {
          // 更新本地&&更新本地
          resolve({ status: 200, data: { ...getters.todo, datetime: new Date().getTime() } })
        }
        if (state.todo.index != null && state.user.active) {
          // 更新服务端
          axios.post(
            "api/todo/update",
            {
              data: {
                ...getters.todo,
                id: state.todo.list[state.todo.index].id,
                token: state.user.token
              }
            }
          ).then(res => resolve(res.data));
        }
        if (state.todo.index == null && state.user.active) {
          // 新增服务端
          axios.post(
            "/api/todo/insert",
            { data: { ...getters.todo, token: state.user.token } }
          ).then(res => resolve(res.data));
        }
      }).then(res => {
        if (state.todo.index != null) {
          state.todo.list.splice(state.todo.index, 1);
          commit("setToDoList", state.todo.list);
        }
        commit("unshiftToDoList", { ...res.data, checked: false });
        if (!state.user.active) {
          localStorage.setItem("todoList", JSON.stringify(state.todo.list));
        }
        return Promise.reject();
      }).catch(() => {
        commit("toggleToDoLoading");
        commit("toggleToDo");
        commit("initToDo");
      })
    },
    deleteToDo({ state, commit }, payload) {
      let list = state.todo.list;
      let todo = list[payload];
      if (state.user.active) {
        this._vm.$axios
          .post("/api/todo/delete", { data: { ...todo, token: state.user.token } }).then(res => {
            if (res.data.status === 200) {
              list = state.todo.list.splice(payload, 1);
              commit("setToDoList", list);
            }
          })
      } else {
        list.splice(payload, 1);
        commit("setToDoList", list);
        localStorage.setItem("todoList", JSON.stringify(list));
      }
    },
    batchDeleteToDo({ state, dispatch }) {
      let list = state.todo.list;
      for (let i = list.length - 1; i >= 0; i--) {
        if (list[i].checked == true) dispatch("deleteToDo", i);
      }
    },
    register({ getters, dispatch }) {
      console.log(this._vm);
      console.log(this._vm.$axios);
      this._vm.$axios
        .post("/api/user/register", { data: getters.user })
        .then(res => {
          console.log(res);
          if (res.data.status === 200) {
            dispatch("signIn");
          }
        })
    },


  },
  modules: {
    user,
    todo,
  }
})
