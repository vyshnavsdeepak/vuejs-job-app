<template>
  <section class="section">
    <h2 class="title has-text-centered">Post a job</h2>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <div class="content">
          <form id="form">
            <div class="field">
              <label class="label">Job title</label>
              <p class="control">
                <input class="input" 
                type="text" 
                v-model="title" 
                required/>
              </p>
            </div>
            <div class="field">
              <label class="label">Job description</label>
              <p class="control">
                <textarea class="textarea" 
                v-model="description" 
                required></textarea>
              </p>
            </div>
            <div class="field">
              <label class="label">Qualifications</label>
              <p class="control">
                <textarea class="textarea" 
                v-model="qualifications" 
                required></textarea>
              </p>
            </div>
            <div class="field">
              <label class="label">Send resumé to</label>
              <p class="control">
                <input class="input" 
                type="email" 
                v-model="email" 
                placeholder="manager@email.com"  
                required/>
              </p>
            </div>
            <br>
            <div class="field is-grouped">
              <div class="control">
                <button @click.prevent="postJob" 
                class="button is-primary" 
                :class="{ 'is\-loading': loading }" 
                type="button"
                :disabled="emptyInputs">
                  Post job
                </button>
              </div>
              <div class="control">
                <button class="button is-link" 
                type="button" 
                @click.prevent="formCancel">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      qualifications: '',
      email: ''
    }
  },
  computed: {
    emptyInputs () {
      if (this.title.trim() === '' || this.email.trim() === '' || this.description.trim() === '' || this.qualifications.trim() === '') {
        return true
      }
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    postJob () {
      this.$store.dispatch('createJob', {
        title: this.title,
        description: this.description,
        qualifications: this.qualifications,
        email: this.email,
        date: new Date().getTime()
      }).then(
        Object.assign(this.$data, this.$options.data.call(this)),
        this.$store.dispatch('loadJobs'),
        this.$router.push('/jobs')
      )
    },
    formCancel () {
      this.$router.push('/jobs')
      this.$destroy()
    }
  }
}
</script>
