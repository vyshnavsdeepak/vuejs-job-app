<template>
  <section class="section">
    <h2 class="title has-text-centered">Sign in</h2>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="content" v-if="error">
          <app-error @dismissed="onDismissed" :text="error.message"></app-error>
        </div>
        <form @submit.prevent="onSignin">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" 
              type="email" 
              placeholder="name@example.com" 
              id="email" 
              v-model="email" 
              required>
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" 
              type="password" 
              id="password" 
              v-model="password" 
              required>
            </div>
          </div>
          <br>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-primary" 
              :class="{ 'is\-loading': loading }" 
              type="submit" 
              :disabled="emptyInputs">Sign in</button>
            </div>
            <div class="control">
              <button class="button is-link" 
              type="reset" 
              @click="formCancel">Cancel</button>
            </div>
          </div>
        </form>
        <br>
        <p>Don't have an account? <a @click="signupInstead">Sign up</a></p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    emptyInputs () {
      if (this.email === '' || this.password === '') {
        return true
      }
    },
    user () {
      return this.$store.getters.user
    },
    loading () {
      return this.$store.getters.loading
    },
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignin () {
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    },
    formCancel () {
      this.$router.push('/jobs')
      this.$destroy()
    },
    signupInstead () {
      this.$router.push('/sign-up')
      this.$store.dispatch('clearError')
      this.$destroy()
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
