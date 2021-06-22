import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios-auth'
import router from '../router'
import axiosRefresh from '../axios-refresh'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null
  },
  getters: {
    idToken: state => state.idToken
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    }
  },
  actions: {
    login({ commit, dispatch }, authData) {
      axios.post(
        '/accounts:signInWithPassword?key=AIzaSyAtJQ9RxRAgHuKHbUrE6bwt5FOw_7bvTzA',
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      ).then(response => {
        commit('updateIdToken', response.data.idToken);
        setTimeout(() => {
          dispatch('refreshIdToken', response.data.refreshIdToken);
        }, response.data.expiresIn * 1000)
        router.push('/')
      });
    },
    logout({ commit }) {
      commit('updateIdToken', null);
      localStorage.removeItem('idToken');
      localStorage.removeItem('expiryTimeMs');
      localStorage.removeItem('refreshToken');
      router.push('/login');
    },
    refreshIdToken({ commit, dispatch }, refreshToken) {
      axiosRefresh.post(
        '/token?key=AIzaSyAtJQ9RxRAgHuKHbUrE6bwt5FOw_7bvTzA',
        {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        }
      ).then(response => {
        commit("updateIdToken", response.data.id_token);
        setTimeout(() => {
          dispatch('refreshIdToken', response.data.refresh_token)
        }, response.data.expires_id * 1000)
      });
    },
    register({ commit }, authData) {
      axios.post(
        '/accounts:signUp?key=AIzaSyAtJQ9RxRAgHuKHbUrE6bwt5FOw_7bvTzA',
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      ).then(response => {
        commit('updateIdToken', response.data.idToken);
        router.push('/')
      });
    }
  }
})