<template>
  <section class="section has-text-centered">
    <div class="content" v-if="loading">
      <app-loader :loading="loading"></app-loader>
    </div>
    <div class="content" v-else-if="userIsAdmin">
      <h2>Users</h2>
      <div class="columns">
        <span class="column is-mobile">
          <label class="label">Full Name</label>
          <input class="input"
            v-model="reqFullName"
            type="text">
          <label class="label">ROll No.</label>
          <input class="input"
            v-model="reqRollNo"
            type="text">
          <label class="label">UG Percentage</label>
          <input class="input"
            v-model="reqUgMarksPercent"
            type="number" 
            min="0"
            max="100">
          <label class="label">12th Percentage</label>
            <input class="input"
              v-model="reqTwelfthMarksPercent" 
              type="number" 
              min="0"
              max="100"
              required>
          <label class="label">10th Percentage</label>
          <input class="input" 
            v-model="reqTenthMarksPercent"
            type="number" 
            min="0"
            max="100"
            required>
        </span>
        <span class="column is-mobile">
          <label class="label">Degree</label>
          <span class="select is-multiple">
          <select v-model="reqCourses" multiple size="5">
            <option v-for="(iCourse, i) in allCourses" :key="i">{{ iCourse }}</option>
          </select>
          </span>
        </span>
      </div> 
      <p v-if="!reqUsers">No users match the eligibility criteria</p>
      <table class="table" v-else>
        <thead>
          <tr>
            <th>Sno.</th>
            <th @click="sort('fullName')">Name</th>
            <th @click="sort('rollNo')"><abbr title="Roll number">Roll No.</abbr></th>
            <th @click="sort('course')"><abbr title="Course">Dept.</abbr></th>
            <th @click="sort('ugMarksPercent')"><abbr title="UG Marks Percentage">UG</abbr></th>
            <th @click="sort('twelfthMarksPercent')"><abbr title="12th Std Marks Percentage">12th</abbr></th>
            <th @click="sort('tenthMarksPercent')"><abbr title="10th Std Marks Percentage">10th</abbr></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, i) in sortedUsers"
            :key="user.id">
            <td>{{ i+1 }}</td>
            <td style="text-transform: capitalize">{{ user.fullName }}</td>
            <td>{{ user.rollNo.toUpperCase() }}</td>
            <td>{{ user.course }}</td>
            <td>{{ user.ugMarksPercent }}</td>
            <td>{{ user.twelfthMarksPercent }}</td>
            <td>{{ user.tenthMarksPercent }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      reqFullName: '',
      reqCourses: [null],
      reqRollNo: '',
      reqTenthMarksPercent: '',
      reqTwelfthMarksPercent: '',
      reqUgMarksPercent: '',
      currentSort: 'fullName',
      currentSortDir: 'asc'
    }
  },
  methods: {
    sort (s) {
      // if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    }
  },
  computed: {
    sortedUsers () {
      return this.reqUsers.sort((a, b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') modifier = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
        return 0
      })
    },
    reqUsers () {
      return this.$store.getters.reqUsers(this.reqFullName, this.reqRollNo, this.reqCourses, this.reqUgMarksPercent, this.reqTwelfthMarksPercent, this.reqTenthMarksPercent)
    },
    loading () {
      return this.$store.getters.loading
    },
    userLoggedIn () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsAdmin () {
      return this.$store.getters.adminStatus
    },
    user () {
      return this.$store.getters.user
    },
    allCourses () {
      return this.$store.getters.loadedCourses
    }
  }
}
</script>

