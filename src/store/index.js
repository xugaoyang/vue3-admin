import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {
  CHANGE_MENU_COLLAPSE,
  CHANGE_SIDEBAR_POSITION,
  CHANGE_SIDEBAR_BACKGROUND,
  CHANGE_HEADER_BACKGROUND,
  CHANGE_SYSTEM_COLOR
} from './mutation-types'

const store = createStore({
  state: {
    isMenuCollapse: false,
    sidebarPosition: 'left',
    systemColor: '#fff',
    sidebarBackgroundColor: '#fff',
    headerBackgroundColor: '#fff'
  },
  getters: {
    isMenuCollapse(state) {
      return state.isMenuCollapse
    },
    sidebarPosition(state) {
      return state.sidebarPosition
    },
    systemColor(state) {
      return state.systemColor
    },
    sidebarBackgroundColor(state) {
      return state.sidebarBackgroundColor
    },
    headerBackgroundColor(state) {
      return state.headerBackgroundColor
    }
  },
  mutations: {
    [CHANGE_MENU_COLLAPSE](state, payload) {
      state.isMenuCollapse = payload
    },
    [CHANGE_SIDEBAR_POSITION](state, payload) {
      state.sidebarPosition = payload
    },
    [CHANGE_SYSTEM_COLOR](state, payload) {
      state.systemColor = payload
    },
    [CHANGE_SIDEBAR_BACKGROUND](state, payload) {
      state.sidebarBackgroundColor = payload
    },
    [CHANGE_HEADER_BACKGROUND](state, payload) {
      state.headerBackgroundColor = payload
    }
  },
  actions: {
    changeMenuCollapse({ commit }, payload) {
      commit('CHANGE_MENU_COLLAPSE', payload)
    },
    changeSidebarPosition({ commit }, payload) {
      commit('CHANGE_SIDEBAR_POSITION', payload)
    },
    changeSidebarBackground({ commit }, payload) {
      commit('CHANGE_SIDEBAR_BACKGROUND', payload)
    },
    changeSystemColor({ commit }, payload) {
      commit('CHANGE_SYSTEM_COLOR', payload)
    },
    changeHeaderBackground({ commit }, payload) {
      commit('CHANGE_HEADER_BACKGROUND', payload)
    }
  },
  plugins: [createPersistedState()]
})

export default store
