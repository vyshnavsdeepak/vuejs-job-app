<template>
  <div>
    <section class="section has-text-centered">
      <h2 class="title has-text-centered">Job list</h2>
      <router-link
        class="button is-primary"
        to="/post"
      >
        Post a job
      </router-link>
    </section>
    <section class="content">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <p class="subtitle has-text-centered" v-if="jobs.length !== 0">Now hiring for the following positions:</p>
          <p class="subtitle has-text-centered" v-else>No jobs to show yet! <router-link to="/post">Post one</router-link></p>
          <div class="content" v-if="loading">
            <app-loader :loading="loading"></app-loader>
          </div>
          <div class="content" v-else>
            <div
              v-for="job in jobs"
              :key="job.id"
              class="card"
            >
              <header class="card-header">
                <span class="card-header-title">
                  <small>{{ job.date | moment('MMM D, YYYY') }}</small>
                </span>
                <span class="card-header-icon">
                  <span class="tag is-primary" v-if="new Date().getTime() - job.date < 1209600000">New</span>
                </span>
              </header>
              <div class="card-content">
                <div class="content">
                  {{job.title}}
                </div>
              </div>
              <footer class="card-footer">
                <router-link class="card-footer-item" :to="'/jobs/' + job.id">
                  <span>Read more</span>
                </router-link>
                <span v-if="$store.state.user" class="card-footer-item">
                  <app-bookmark
                    :id="job.id"
                    :title="job.title"
                    :email="job.email"
                    :date="job.date"
                  ></app-bookmark>
                </span>
                <a class="card-footer-item" :href=" 'mailto:' + job.email">Apply</a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    jobs () {
      return this.$store.state.loadedJobs
    }
  }
}
</script>

<style lang="sass" scoped>
  .card
    margin-bottom: 1.875rem
</style>
