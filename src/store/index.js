import { createStore } from 'vuex'
import {CHANGE_MENU_COLLAPSE} from './mutation-types' 

const store = createStore({
  state: {
      isMenuCollapse: false
  },
  getters: {
    isMenuCollapse(state) {
      return state.isMenuCollapse
    }
  },
  mutations: {
    [CHANGE_MENU_COLLAPSE](state, payload) {
      console.log(payload)
      state.isMenuCollapse = payload
    }
  },
  actions: {
    changeMenuCollapse({ commit }, payload) {
      commit('CHANGE_MENU_COLLAPSE', payload)
    }
  }
})

export default store