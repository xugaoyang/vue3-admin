import { createStore } from 'vuex'
import { CHANGE_MENU_COLLAPSE, CHANGE_SIDEBAR_POSITION } from './mutation-types' 

const store = createStore({
  state: {
      isMenuCollapse: false,
      sidebarPosition: 'left'
  },
  getters: {
    isMenuCollapse(state) {
      return state.isMenuCollapse
    },
    sidebarPosition(state) {
      return state.sidebarPosition
    }
  },
  mutations: {
    [CHANGE_MENU_COLLAPSE](state, payload) {
      console.log(payload)
      state.isMenuCollapse = payload
    },
    [CHANGE_SIDEBAR_POSITION](state, payload) {
      console.log(payload)
      state.sidebarPosition = payload
    }
  },
  actions: {
    changeMenuCollapse({ commit }, payload) {
      commit('CHANGE_MENU_COLLAPSE', payload)
    },
    changeSidebarPosition({ commit }, payload) {
      commit('CHANGE_SIDEBAR_POSITION', payload)
    },
  }
})

export default store