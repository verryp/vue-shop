export default {
    namespaced: true,

    state: {
        status  : false,
        text    : '',
        type    : 'success', // todo boleh pake warna warning ato error, terserah tema kalian di vuetify.js
    },

    mutations: {
        setAlert: (state, payload) => {
            state.status    = payload.status,
            state.text      = payload.text,
            state.type      = payload.type
        },
    },

    actions: {
        setAlert: ({commit}, payload) => {
            commit('setAlert', payload)
        },
    },

    getters: {
        status  : state => state.status,
        text    : state => state.text,
        type    : state => state.type,
    }
}