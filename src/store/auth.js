export default {
    namespaced: true,
    state: {
        user    : {},
    },

    mutations: {
        setAuth: (state, payload) => {
            state.user  = payload
        },
    },

    actions: {
        setAuth: ({commit}, payload) => {
            commit('setAuth', payload)
        },
    },
    
    getters: {
        user  : state => state.user,
        guest : state => Object.keys(state.user).length === 0,
    }
}