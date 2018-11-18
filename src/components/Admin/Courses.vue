<template>
  <section class="section">
    <div class="content" v-if="loading">
      <app-loader :loading="loading"></app-loader>
    </div>
    <div class="content" v-else-if="userIsAdmin">
      <h2>Courses</h2>
      <div class="field has-addons">
        <div class="control">
          <input class="input" type="text" placeholder="Add a new Course" v-model="newCourse">
        </div>
        <div class="control">
          <a class="button" @click="addCourse()" :disabled="!isValidCourse">
            Add
          </a>
        </div>
      </div>
      <div class="container">
        <span class="tag is-large" v-for="(course, id) in courses" :key="id">
          {{ course }}
          <a @click="deleteCourse(course)"
            class="delete is-small">
          </a>
        </span>
      </div>
    </div> 
  </section>
</template>
<script>
export default {
  data () {
    return {
      newCourse: '',
      courses: []
    }
  },
  created () {
    this.courses = this.allCourses
  },
  methods: {
    addCourse () {
      if (this.isValidCourse) {
        this.courses.push(this.newCourse)
        this.updateCourses()
      }
      this.newCourse = ''
    },
    deleteCourse (course) {
      this.courses.splice(this.courses.indexOf(course), 1)
      this.updateCourses()
    },
    updateCourses () {
      this.$store.dispatch('updateCourses', this.courses)
    }
  },
  computed: {
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
    emptyInput () {
      return this.newCourse.trim() === ''
    },
    isDuplicateCourse () {
      return this.courses.includes(this.newCourse)
    },
    isValidCourse () {
      return !this.emptyInput && !this.isDuplicateCourse
    },
    allCourses () {
      return this.$store.getters.loadedCourses
    }
  }
}
</script>
