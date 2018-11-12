<template>
  <div class="container" v-if="job">
    <section class="section">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div class="content" v-if="loading">
            <app-loader :loading="loading"></app-loader>
          </div>
          <div class="content" v-else>
            <app-edit v-if="userIsPoster" :job="job"></app-edit>
            <app-bookmark
              v-if="userLoggedIn && !userIsPoster"
              :id="job.id"
              :title="job.title"
              :email="job.email"
              :date="job.date"
              :linkClass="'button is-primary'"
              :loading="loading"
            >
            </app-bookmark>
            <h1>{{ job.title }}</h1>
            <small>posted {{ job.date | moment('MMM D, YYYY') }}</small>
          </div>
          <hr>
          <div class="content">
            <h2>Description</h2>
            <p style="white-space: pre;">{{ job.description }}</p>
          </div>
          <div class="content">
            <h2>Qualifications</h2>
            <p style="white-space: pre;">{{ job.qualifications }}</p>
          </div>
          <div class="content">
            <h2>Marks Percentage Requirement</h2>
            <p style="white-space: pre;">Undergraduate : <input class="input" v-bind:class="[ isEligibleUg ? 'is-success' : 'is-danger']" readonly :value="job.ugMarksPercent +'%'"></p>
            <p style="white-space: pre;">12th Std : <input class="input" v-bind:class="[isEligibleTwelfth ? 'is-success' : 'is-danger']" readonly :value="job.twelfthMarksPercent +'%'"></p>
            <p style="white-space: pre;">10th Std : <input class="input" v-bind:class="[isEligibleTenth ? 'is-success' : 'is-danger']" readonly :value="job.tenthMarksPercent +'%'"></p>
          </div>
          <div class="content">
            <p>Please send Resume and references to <a :href=" 'mailto:' + job.email " class="link">{{ job.email }}</a></p>  
          </div>
        </div>
      </div>
    </section>
  </div>
  <div class="container" v-else>
    <section class="section">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          Job not found
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    job () {
      return this.$store.getters.loadedJob(this.id)
    },
    loading () {
      return this.$store.getters.loading
    },
    userLoggedIn () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsPoster () {
      if (!this.userLoggedIn) {
        return false
      } return this.$store.getters.user.id === this.job.creatorId
    },
    user () {
      return this.$store.getters.user
    },
    isEligibleUg () {
      return (this.job.ugMarksPercent <= this.user.ugMarksPercent)
    },
    isEligibleTenth () {
      return (this.job.tenthMarksPercent <= this.user.tenthMarksPercent)
    },
    isEligibleTwelfth () {
      return (this.job.twelfthMarksPercent <= this.user.twelfthMarksPercent)
    }
  }
}
</script>
