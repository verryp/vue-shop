    export default {
    namespaced: true,

    state: {
        carts: [],
    },

    mutations: {
        insert: (state, payload) => {
            // * memasukkan item yang di pilih ke cart
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
            let idx = state.carts.indexOf(payload); // * ngambil indeks dari state carts id

            // * update item cart pada index idx(mirip push cuma ini pake index tertentu)
            state.carts.splice(idx, 1, {
                id: payload.id,
                title: payload.title,
                cover: payload.cover,
                price: payload.price,
                weight: payload.weight,
                quantity: payload.quantity
            });

            // * ngecek jika quantity nol, maka gk ngelakuin apa apa
            if(payload.quantity <= 0) {
                state.carts.splice(idx, 1)
            }
        },

        setCart: (state, payload) => {
            state.carts = payload
        }
    },

    actions: {
        add: ({state,commit}, payload) => {
            // * ngecek apakah item yang dipilih sama dengan item yang ada di cart
            let cartItem = state.carts.find(item => item.id === payload.id)

            // * ngecek jika cartItem true
            // * artinya item yang dipilih masih kosong, item akan dimasukkan ke dalam cart
            if(!cartItem) {
                commit('insert', payload)
            }else{
                // * jika item tersebut sudah ada di dalam cart, maka quantity ke inkremen
                cartItem.quantity++
                commit('update', cartItem)
            }
        },

        remove: ({state, commit}, payload) => {
            let cartItem = state.carts.find(item => item.id === payload.id)

            if(cartItem) {
                cartItem.quantity--
                commit('update', cartItem)
            }
        },

        setCart: ({commit}, payload) => {
            commit('setCart', payload)
        }
    },

    getters: {
        carts: state => state.carts,
        count: (state) => {
            return state.carts.length
        },

        totalPrice: (state) => {
            let total = 0
            state.carts.forEach(function(cart) {
                total += cart.price * cart.quantity
            })

            return total
        },

        totalQuantity: (state) => {
            let total = 0
            state.carts.forEach(function(cart) {
                total += cart.quantity
            });

            return total
        },

        totalHeight: (state) => {
            let total = 0
            state.carts.forEach(function(cart) {
                total += cart.weight
            })

            return total
        }
    }
}