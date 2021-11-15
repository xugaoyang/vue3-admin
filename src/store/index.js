import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {
  CHANGE_MENU_COLLAPSE,
  CHANGE_DRAWER_SHOW,
  CHANGE_SIDEBAR_POSITION,
  CHANGE_SIDEBAR_COLOR,
  CHANGE_HEADER_COLOR,
  CHANGE_SYSTEM_COLOR,
  CHANGE_THEME
} from './mutation-types'

const store = createStore({
  state: {
    isMenuCollapse: false,
    isDrawerShow: false,
    sidebarPosition: 'left',
    systemColor: '#009688',
    sidebarBgColor: '#aaa',
    headerBgColor: '#fff',
    theme: 'light'
  },
  getters: {
    isMenuCollapse(state) {
      return state.isMenuCollapse
    },
    isDrawerShow(state) {
      return state.isDrawerShow
    },
    sidebarPosition(state) {
      return state.sidebarPosition
    },
    systemColor(state) {
      return state.systemColor
    },
    sidebarBgColor(state) {
      return state.sidebarBgColor
    },
    headerBgColor(state) {
      return state.headerBgColor
    },
    theme(state) {
      return state.theme
    }
  },
  mutations: {
    [CHANGE_MENU_COLLAPSE](state, payload) {
      state.isMenuCollapse = payload
    },
    [CHANGE_DRAWER_SHOW](state, payload) {
      state.isDrawerShow = payload
    },
    [CHANGE_SIDEBAR_POSITION](state, payload) {
      state.sidebarPosition = payload
    },
    [CHANGE_SYSTEM_COLOR](state, payload) {
      state.systemColor = payload
    },
    [CHANGE_SIDEBAR_COLOR](state, payload) {
      state.sidebarBgColor = payload
    },
    [CHANGE_HEADER_COLOR](state, payload) {
      state.headerBgColor = payload
    },
    [CHANGE_THEME](state, payload) {
      state.theme = payload
    }
  },
  actions: {
    changeMenuCollapse({ commit }, payload) {
      commit('CHANGE_MENU_COLLAPSE', payload)
    },
    changeDrawerShow({ commit }, payload) {
      commit('CHANGE_DRAWER_SHOW', payload)
    },
    changeSidebarPosition({ commit }, payload) {
      commit('CHANGE_SIDEBAR_POSITION', payload)
    },
    changeSidebarBgColor({ commit }, payload) {
      commit('CHANGE_SIDEBAR_COLOR', payload)
    },
    changeSystemColor({ commit }, payload) {
      commit('CHANGE_SYSTEM_COLOR', payload)
    },
    changeHeaderBgColor({ commit }, payload) {
      commit('CHANGE_HEADER_COLOR', payload)
    },
    changeTheme({ commit }, payload) {
      commit('CHANGE_THEME', payload)
    }
  },
  plugins: [createPersistedState()]
})

export default store
