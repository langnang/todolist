export default {
    state: {
        visible: false,
        loading: false,
        active: 0,
        isSync: "",
        name: "",
    },
    mutations: {
        toggleSignIn(state) {
            state.visible = !state.visible;
        },
        initUser(state, ) {
            state.name = "";
            state.uuid = "";
            state.token = {};
            state.active = false;
        },
        setUser(state, payload) {
            state.id = payload.id;
            state.name = payload.name;
            state.active = payload.active;
        },
    },
    getters: {
        user: state => {
            return {
                name: state.name,
                password: state.password,
                active: state.active
            }
        },
    },
    actions: {
        getUserInfo({ commit, dispatch }, token) {
            dispatch("callAPI", {
                url: "/user/info",
                data: {
                    token: token
                }
            }).then(function (res) {
                console.log("success get user info");
                if (res.status == 200 && res.data.status == 200) {
                    commit("setUser", res.data.data.user);
                } else {
                    throw Error;
                }
            }).catch(function () {
                console.log("failed get user info");
                // window.localStorage.removeItem("token");
            })
        }
    }
}