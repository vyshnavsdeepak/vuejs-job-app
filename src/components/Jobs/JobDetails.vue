<template>
  <div class="container">
    <section class="section">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div class="content" v-if="loading">
            <app-loader :loading="loading"></app-loader>
          </div>
          <div v-else-if="job">
            <div class="content">
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
              <h2>Eligible Courses</h2>
              <ol>
                <li v-for="course in job.courses">{{ course }}</li>
              </ol>
            </div>
            <div class="content">
              <h2>Marks Percentage Requirement</h2>
              <p style="white-space: pre;">Undergraduate : <input class="input" v-bind:class="[ isEligibleUg ? 'is-success' : 'is-danger']" readonly :value="job.ugMarksPercent +'%'"></p>
              <p style="white-space: pre;">12th Std : <input class="input" v-bind:class="[isEligibleTwelfth ? 'is-success' : 'is-danger']" readonly :value="job.twelfthMarksPercent +'%'"></p>
              <p style="white-space: pre;">10th Std : <input class="input" v-bind:class="[isEligibleTenth ? 'is-success' : 'is-danger']" readonly :value="job.tenthMarksPercent +'%'"></p>
            </div>
            <div class="content">
              <p>Please send Resume and references to <a :href=" 'mailto:' + job.email " class="link">{{ job.email }}</a></p>
            </div>
            <div class="content" v-if="loading">
              <app-loader :loading="loading"></app-loader>
            </div>
            <div class="content" v-else-if="userIsPoster">
              <h2>Eligible Users</h2>
              <p v-if="!eligibleUsers">No users match the eligibility criteria</p>
              <table class="table" v-else>
                <thead>
                  <tr>
                    <th>Sno.</th>
                    <th>Name</th>
                    <th><abbr title="Course">Dept.</abbr></th>
                    <th><abbr title="UG Marks Percentage">UG</abbr></th>
                    <th><abbr title="12th Std Marks Percentage">12th</abbr></th>
                    <th><abbr title="10th Std Marks Percentage">10th</abbr></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(user, i) in eligibleUsers"
                    :key="user.id">
                    <td>{{ i+1 }}</td>
                    <td>{{ user.fullName }}</td>
                    <td>{{ user.course }}</td>
                    <td>{{ user.ugMarksPercent }}</td>
                    <td>{{ user.twelfthMarksPercent }}</td>
                    <td>{{ user.tenthMarksPercent }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="container" v-else-if="!loading">
            <section class="section">
              <div class="columns">
                <div class="column is-half is-offset-one-quarter">
                  Job not found
                </div>
              </div>
            </section>
          </div>
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
    eligibleUsers () {
      return this.$store.getters.eligibleUsers(this.job.courses, this.job.ugMarksPercent, this.job.twelfthMarksPercent, this.job.tenthMarksPercent)
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
