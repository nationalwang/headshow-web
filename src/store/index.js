import Vue from 'vue'
import Vuex from 'vuex'

// import * as actions from './actions'
// import * as getters from './getters'

// import tabs from './modules/tabs'
// import power from './modules/power'
// import preview from './modules/preview'
// import process from './modules/process'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  // actions,
  // getters,
  // modules: {
  //   tabs,
  //   power,
  //   preview,
  //   process
  // },
  state: {
    showLog: true
  },
  mutations: {
    showLog (state, data) {
      state.showLog = data
    }
  }
})

export default store
