export default {
  callAPI(context, options) {
    return this._vm.$axios.post(options.url, options.data);
  },
  // callTokenUseable({ dispatch }, token) {
  //   return dispatch("callAPI", {
  //     url: config.APIs.token_useable,
  //     data: { token },
  //   });
  // },
  // callTodoList({ getters, dispatch }) {
  //   return dispatch("callAPI", {
  //     url: config.APIs.todo_list,
  //     data: {
  //       token: getters.token,
  //     },
  //   });
  // },
  // callTodoInsert({ getters, dispatch }) {
  //   return dispatch("callAPI", {
  //     url: config.APIs.todo_insert,
  //     data: {
  //       token: getters.token,
  //       todo: getters.todo,
  //     },
  //   });
  // },
  // callTodoDelete({ getters, dispatch }) {
  //   return dispatch("callAPI", {
  //     url: config.APIs.todo_delete,
  //     data: {
  //       token: getters.token,
  //       todo: getters.todo,
  //     },
  //   });
  // },
  // callTodoUpdate({ getters, dispatch }) {
  //   return dispatch("callAPI", {
  //     url: config.APIs.todo_update,
  //     data: {
  //       token: getters.token,
  //       todo: getters.todo,
  //     },
  //   });
  // },
  // callTodoInfo({ getters, dispatch }) {
  //   return dispatch("callAPI", {
  //     url: config.APIs.todo_info,
  //     data: {
  //       token: getters.token,
  //       todo: getters.todo,
  //     },
  //   });
  // },
  // notify(context, options) {
  //   this._vm.$notify({
  //     title: config.notify.title[options.type],
  //     type: options.type,
  //     message: config.notify[options.msg][options.type],
  //   });
  // },
};
