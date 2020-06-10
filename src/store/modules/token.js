export default {
    state: {
        id: "",
        token: "",
    },
    mutations: {
        setToken(state, token) {
            state.id = token.id;
            state.token = token.token;
        }
    },
    getters: {},
    actions: {
        isTokenActive({ commit, dispatch }, token) {
            dispatch("callAPI", {
                url: "/token/useable",
                data: {
                    token: token
                }
            }).then(function (res) {
                if (res.status == 200 && res.data.status == 200) {
                    console.log("token is active");
                    // token 可用
                    commit("setToken", token);
                    return
                } else {
                    throw Error;
                }
            }).catch(function () {
                console.log("token is not active");
                // window.localStorage.removeItem("token");
            })
        }
    }
}