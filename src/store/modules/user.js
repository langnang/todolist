export default {
    state: {
        visible: false,
        loading: false,
        active: false,
        isSync: "",
        name: "",
        password: "",
        uuid: "",
        token: {},
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
            state.name = payload.name;
            state.uuid = payload.uuid;
            state.token = payload.token;
            state.active = true;
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

    }
}