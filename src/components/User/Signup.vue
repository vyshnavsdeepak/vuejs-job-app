<template>
  <section class="section">
    <h2 class="title has-text-centered">Sign up</h2>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="content" v-if="error">
          <app-error @dismissed="onDismissed" :text="error.message"></app-error>
        </div>
        <form @submit.prevent="onSignup" @change="onDismissed">
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
              :class="{ 'is-\danger': comparePasswords }" 
              type="password" 
              id="password" 
              v-model="password" 
              required>
            </div>
          </div>
          <div class="field">
            <label class="label">Confirm password</label>
            <div class="control">
              <input class="input" 
              :class="{ 'is-\danger': comparePasswords }" 
              type="password" 
              id="confirmPassword" 
              v-model="confirmPassword" 
              required>
            </div>
            <transition name="fade">
            <p class="help is-danger" v-if="comparePasswords">Passwords do not match</p>
            </transition>
          </div>
          <br>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-primary" 
              :class="{ 'is\-loading': loading }" 
              type="submit" 
              :disabled="comparePasswords || emptyInputs">Sign up</button>
            </div>
            <div class="control">
              <button class="button is-link" 
                type="button" 
                @click.prevent="formCancel">Cancel</button>
            </div>
          </div>
        </form>
        <br>
        <p>Already have an account? <a @click="signinInstead">Sign in</a></p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    comparePasswords () {
      if (this.password !== this.confirmPassword) {
        return true
      }
    },
    emptyInputs () {
      if (this.email === '' || this.password === '' || this.confirmPassword === '') {
        return true
      }
    },
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
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
    onSignup () {
      this.$store.dispatch('signUserUp', {
        email: this.email,
        password: this.password
      })
    },
    signinInstead () {
      this.$router.push('/sign-in')
      this.$store.dispatch('clearError')
      this.$destroy()
    },
    onDismissed () {
      if (this.$store.getters.error) {
        this.$store.dispatch('clearError')
      }
    },
    formCancel () {
      this.$router.push('/jobs')
      this.$destroy()
    }
  }
}
</script>
