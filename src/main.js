// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import { config } from './service/firebaseConfig'
import router from './router'
import Vuefire from 'vuefire'
import { store } from './store'
import Error from './components/Shared/Error'
import Loader from './components/Shared/Loader'
import EditJob from './components/Jobs/Edit/EditJob'
import EditProfile from './components/User/Edit/EditProfile'
import BookmarkJob from './components/Jobs/Bookmarks/BookmarkJob'

Vue.config.productionTip = false

Vue.use(require('vue-moment'))
Vue.use(Vuefire)
Vue.component('app-error', Error)
Vue.component('app-loader', Loader)
Vue.component('app-edit', EditJob)
Vue.component('app-bookmark', BookmarkJob)
Vue.component('app-edit-profile', EditProfile)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
        this.$store.dispatch('fetchUsersData')
      }
    })
    this.$store.dispatch('loadJobs')
  }
})
