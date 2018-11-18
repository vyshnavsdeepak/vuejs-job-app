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
              <label class="label">Degree</label>
              <p class="select is-multiple">
                <select v-model="courses" multiple size="5">
                  <option v-for="(iCourse, i) in allCourses" :key="i">{{ iCourse }}</option>>
                </select>
              </p>
            </div>
            <div class="field">
              <label class="label">Undergraduate Marks Percentage</label>
              <p class="control">
                <input class="input"
                v-model="ugMarksPercent" 
                required>
              </p>
            </div>
            <div class="field">
              <label class="label">12th std Marks Percentage</label>
              <p class="control">
                <input class="input"
                v-model="twelfthMarksPercent" 
                required>
              </p>
            </div>
            <div class="field">
              <label class="label">10th std Marks Percentage</label>
              <p class="control">
                <input class="input" 
                v-model="tenthMarksPercent" 
                required>
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
      courses: [],
      ugMarksPercent: '',
      twelfthMarksPercent: '',
      tenthMarksPercent: '',
      email: ''
    }
  },
  computed: {
    emptyInputs () {
      if (this.title.trim() === '' || this.email.trim() === '' || this.description.trim() === '' || this.qualifications.trim() === '' || this.tenthMarksPercent.trim() === '' || this.twelfthMarksPercent.trim() === '' || this.ugMarksPercent.trim() === '' || this.courses === [] || !this.isValidPercent) {
        return true
      }
    },
    isValidUgPercent () {
      if (this.ugMarksPercent >= 0 && this.ugMarksPercent <= 100) {
        return true
      }
      return false
    },
    isValidTenthPercent () {
      if (this.tenthMarksPercent >= 0 && this.tenthMarksPercent <= 100) {
        return true
      }
      return false
    },
    isValidTwelfthPercent () {
      if (this.twelfthMarksPercent >= 0 && this.twelfthMarksPercent <= 100) {
        return true
      }
      return false
    },
    isValidPercent () {
      if (this.isValidUgPercent && this.isValidTenthPercent && this.isValidTwelfthPercent) {
        return true
      }
      return false
    },
    allCourses () {
      return this.$store.getters.loadedCourses
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
        courses: this.courses,
        ugMarksPercent: this.ugMarksPercent,
        twelfthMarksPercent: this.twelfthMarksPercent,
        tenthMarksPercent: this.tenthMarksPercent,
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
