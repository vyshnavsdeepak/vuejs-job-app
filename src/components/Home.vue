<template>
  <section class="section">
    <h2 class="title has-text-centered">Welcome to Campus Placement System</h2>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <p class="subtitle has-text-centered">Browse, post, and save jobs</p>
        <div class="content">
          <div class="box">
            <article class="media">
              <div class="media-content">
                View available jobs
              </div>
              <div class="media-right">
                <router-link
                  class="button is-primary is-medium"
                  to="/jobs"
                >Job list
                </router-link>
              </div>
            </article>
          </div>
          <div class="box">
            <article class="media">
              <div class="media-content">
                Submit a new job posting
              </div>
              <div class="media-right">
                <router-link
                  class="button is-primary is-medium"
                  to="/post"
                >Post a job
                </router-link>
              </div>
            </article>
          </div>
          <div class="box">
            <article class="media">
              <div class="media-content">
                View my saved jobs
              </div>
              <div class="media-right">
                <router-link
                  class="button is-primary is-medium"
                  to="/profile"
                >Profile
                </router-link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
}
</script>

<style lang="sass" scoped>
@import '../settings'

</style>
