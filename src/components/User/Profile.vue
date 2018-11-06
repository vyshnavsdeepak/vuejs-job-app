<template>
  <section class="section">
    <h2 class="title has-text-centered">Hello, JobApper</h2>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <p class="subtitle has-text-centered">My Profile</p>
        <p><app-edit-profile :user="user"></app-edit-profile></p>
        Undergraduate Marks Percentage : <input class="input" :value="user.ugMarksPercent">
        12th Std Marks Percentage : <input class="input" :value="user.twelfthMarksPercent">
        10th Std Marks Percentage : <input class="input" :value="user.tenthMarksPercent">
      </div>
    </div>  
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <p class="subtitle has-text-centered" v-if="bookmarkedJobs.length > 0">My saved jobs:</p>
        <p class="subtitle has-text-centered" v-else>No jobs saved yet! <router-link to="/jobs">Search for jobs</router-link></p>
        <div class="content" v-if="loading">
          <app-loader :loading="loading"></app-loader>
        </div>
        <div class="content" v-else>
          <div
            v-for="bookmarkedJob in bookmarkedJobs"
            :key="bookmarkedJob.id"
            class="card"
          >
            <header class="card-header">
              <span class="card-header-title">
                <small>Posted on {{ bookmarkedJob.date | moment('MMM D, YYYY') }}</small>
              </span>
              <span class="card-header-icon">
                <span class="tag is-primary" v-if="new Date().getTime() - bookmarkedJob.date < 1209600000">New</span>
              </span>
            </header>
            <div class="card-content">
              <div class="content">
                {{bookmarkedJob.title}}
              </div>
            </div>
            <footer class="card-footer">
              <router-link
                class="card-footer-item"
                :to="'/jobs/' + bookmarkedJob.id"
              >
                Read more
              </router-link>
              <span class="card-footer-item">
                <app-bookmark
                  :id="bookmarkedJob.id"
                  :title="bookmarkedJob.title"
                  :email="bookmarkedJob.email"
                  :date="bookmarkedJob.date"
                ></app-bookmark>
              </span>
              <a
                class="card-footer-item"
                :href=" 'mailto:' + bookmarkedJob.email"
              >
                Apply
              </a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    },
    bookmarkedJobs () {
      return this.user.bookmarkedJobs
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="sass" scoped>
  .card
    margin-bottom: 1.875rem

</style>
