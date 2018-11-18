<template>
  <div id="app">
    <header class="app-header">
      <nav class="nav has-shadow">
        <div class="container">
          <div class="nav-left">
            <h1 class="nav-item">JobApp</h1>
          </div>
          <span class="nav-toggle" @click="toggleNav">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div class="nav-right nav-menu">
            <router-link class="nav-item" to="/" @click.native="hideMenu" exact>Home</router-link>
            <router-link class="nav-item" to="/jobs" @click.native="hideMenu">Jobs</router-link>
            <router-link class="nav-item" 
            v-for="item in menuItems" 
            :key="item.title" 
            :to="item.path" 
            @click.native="hideMenu" 
            exact>{{ item.title }}</router-link>
            <a class="nav-item" 
            @click="onSignout" 
            v-if="userIsAuthenticated">Sign out</a>
          </div>
        </div>
      </nav>
    </header>
    <main>
      <div class="container">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        {title: 'Sign in', path: '/sign-in'},
        {title: 'Sign up', path: '/sign-up'}
      ]
      if (this.userIsAuthenticated) {
        let menuItems = [
          {title: 'Post a job', path: '/post'},
          {title: 'Profile', path: '/profile'}
        ]
        if (this.userIsAdmin) {
          menuItems.push({title: 'Users', path: '/users'})
        }
        return menuItems
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsAdmin () {
      return this.$store.getters.adminStatus
    }
  },
  methods: {
    toggleNav () {
      let toggle = document.querySelector('.nav-toggle')
      let menu = document.querySelector('.nav-menu')
      toggle.classList.toggle('is-active')
      menu.classList.toggle('is-active')
    },
    hideMenu () {
      document.getElementsByClassName('nav-toggle')[0].classList.remove('is-active')
      document.getElementsByClassName('nav-menu')[0].classList.remove('is-active')
    },
    onSignout () {
      this.$store.dispatch('signUserOut')
      this.hideMenu()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="sass">
@import '../node_modules/bulma/bulma.sass'
@import 'settings'
#app
  min-height: 100vh

.app-header
  position: fixed
  width: 100%
  z-index: 100

main
  padding-top: 3rem

a.nav-item.active
  color: $primary

.fade-enter-active,
.fade-leave-active
  transition: opacity .5s

.fade-enter,
.fade-leave-to
  opacity: 0

</style>
