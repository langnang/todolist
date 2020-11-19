export default {
  token: (state) => {
    return {
      id: state.token.id,
      token: state.token.token,
      active: state.token.active,
    };
  },
  todoListChecked: (state) =>
    state?.todo?.list.some((item) => item.checked == true),
  client_id: (state) => state.oauth.client_id,
};
