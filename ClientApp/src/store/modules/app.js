export default {
    state: {
        loading: false,
        laoding_text: "加载中",
    },
    mutations: {
        toggleAppLoading: (state){
            state.loading = !state.loading;
        },
        setAppLoadingText: (state, payload){
            state.laoding_text = payload;
        }
    }
}