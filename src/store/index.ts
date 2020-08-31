import Vue from 'vue';
import Vuex from 'vuex';
import { APPROVAL_STATUS } from '@/services/shared';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    myName: '',
    myRole: '',
    myId: '',
    companyStatus: APPROVAL_STATUS,
    userStatus: APPROVAL_STATUS,
  },
  mutations: {
    setMyName(state, value) {
      state.myName = value;
    },
    setMyRole(state, value) {
      state.myRole = value;
    },
    setCompanyStatus(state, value) {
      state.companyStatus = value;
    },
    setUserStatus(state, value) {
      state.userStatus = value;
    },
    setMyId(state, value) {
      state.myId = value;
    },
  },
  actions: {
    setProfile(vuexContext, payload) {
      vuexContext.commit('setMyName', payload.username);
      vuexContext.commit('setMyRole', payload.adminRole);
      vuexContext.commit('setCompanyStatus', payload.companyStatus);
      vuexContext.commit('setUserStatus', payload.userStatus);
      vuexContext.commit('setMyId', payload._id);
    },
  },
});
