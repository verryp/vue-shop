export default {
    namespaced: true,

    state: {
        sideBar: false,
      },
    
      mutations: {
        setSideBar: (state, value) => {
          state.sideBar = value
        },
      },
    
      actions: {
        setSideBar: ({commit}, value) => {
          commit('setSideBar', value)
        },
      },
    
      getters: {
        sideBar: state => state.sideBar,
      },
}