export default {
    namespaced: true,

    state: {
        carts: [],
    },

    mutations: {
        insert: (state, payload) => {
            state.carts.push({
                id: payload.id,
                title: payload.title,
                cover: payload.cover,
                price: payload.price,
                weight: payload.weight,
                quantity: 1
            })
        },

        update: (state, payload) => {
            let idx = state.carts.indexOf(payload);

            state.carts.splice(idx, 1, {
                id: payload.id,
                title: payload.title,
                cover: payload.cover,
                price: payload.price,
                weight: payload.weight,
                quantity: ++payload.quantity
            });
        },
    },

    actions: {
        add: ({state,commit}, payload) => {
            let cartItem = state.carts.find(item => item.id === payload.id)

            if(!cartItem) {
                commit('insert', payload)
            }else{
                commit('update', cartItem)
            }
        },
    },

    getters: {
        carts: state => state.carts,
        count: (state) => {
            return state.carts.length
        }
    }
}