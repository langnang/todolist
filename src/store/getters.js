export default {
  token: (state) => {
    return {
      id: state.token.id,
      token: state.token.token,
      active: state.token.active,
    };
  },
};
