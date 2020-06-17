export default {
    state: {
        id: "",
        token: "",
        active: false
    },
    mutations: {
        setToken(state, token) {
            state.id = token.id;
            state.token = token.token;
            state.active = !state.active;
        }
    },
    getters: {
        token: state => {
            return {
                id: state.id,
                token: state.token,
                active: state.active,
            }
        },
    },
    actions: {
        isTokenActive({ commit, dispatch }, token) {
            commit("setAppLoadingText", "isTokenActive");
            dispatch("callTokenUseable", token)
                .then(function (res) {
                    // token 可用
                    if (res.status == 200 && res.data.status == 200) {
                        commit("setAppLoadingText", "isTokenActive_success");
                        commit("setToken", token);
                        dispatch("getTodoList");
                        return
                    } else {
                        throw Error("the token is not valid");
                    }
                }).catch(function (err) {
                    commit("setAppLoadingText", "isTokenActive_error");
                    console.error(err);
                    // window.localStorage.removeItem("token");
                }).finally(function () { })
        }
    }
}