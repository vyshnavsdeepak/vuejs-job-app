<template>
  <div>
    <button class="button is-primary" 
    @click="showModal = true">Edit</button>
    <template v-if="showModal">
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit Profile</p>
            <button class="delete" 
            aria-label="close" 
            type="reset"
            @click="close"></button>
          </header>
          <section class="modal-card-body">
            <div class="content">
              <form id="form">
              <div class="field">
              <label class="label">Full Name</label>
              <p class="control">
                <input class="input"
                v-model="editedFullName" 
                required>
              </p>
             </div>
             <div class="field">
              <label class="label">Roll No.</label>
              <p class="control">
                <input class="input"
                v-model="editedRollNo" 
                required>
              </p>
             </div>

            <div class="field">
              <label class="label">Course</label>
              <div class="select">
              <select v-model="editedCourse">
                <option v-for="(iCourse, i) in allCourses" :key="i">{{ iCourse }}</option>
              </select>
              </div>
            </div>
                <div class="field">
              <label class="label">Undergraduate Marks Percentage</label>
              <p class="control">
                <input class="input"
                v-model="editedUgMarksPercent" 
                required>
              </p>
            </div>
            <div class="field">
              <label class="label">12th std Marks Percentage</label>
              <p class="control">
                <input class="input"
                v-model="editedTwelfthMarksPercent" 
                required>
              </p>
            </div>
            <div class="field">
              <label class="label">10th std Marks Percentage</label>
              <p class="control">
                <input class="input" 
                v-model="editedTenthMarksPercent" 
                required>
              </p>
            </div>
                
                <br>
                <div class="field is-grouped">
                  <div class="control">
                    <button @click.prevent="saveEditProfile" 
                    class="button is-primary" 
                    :class="{ 'is\-loading': loading }" 
                    type="button"
                    :disabled="!isValidInput">
                      Save changes
                    </button>
                  </div>
                  <div class="control">
                    <button class="button" 
                    type="reset" 
                    @click="close">Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data () {
    return {
      showModal: false,
      editedFullName: this.user.fullName,
      editedRollNo: this.user.rollNo,
      editedCourse: this.user.course,
      editedUgMarksPercent: this.user.ugMarksPercent,
      editedTwelfthMarksPercent: this.user.twelfthMarksPercent,
      editedTenthMarksPercent: this.user.tenthMarksPercent
    }
  },
  computed: {
    isValidFullName () {
      return (this.editedFullName.trim() !== '')
    },
    isValidCourse () {
      return (this.editedCourse)
    },
    isValidRollNo () {
      return (this.editedRollNo.trim() !== '')
    },
    isValidPersonal () {
      return (this.isValidFullName && this.isValidRollNo && this.isValidCourse)
    },
    isValidUgPercent () {
      if (this.editedUgMarksPercent >= 0 && this.editedUgMarksPercent <= 100) {
        return true
      }
      return false
    },
    isValidTenthPercent () {
      if (this.editedTenthMarksPercent >= 0 && this.editedTenthMarksPercent <= 100) {
        return true
      }
      return false
    },
    isValidTwelfthPercent () {
      if (this.editedTwelfthMarksPercent >= 0 && this.editedTwelfthMarksPercent <= 100) {
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
    isValidInput () {
      return (this.isValidPercent && this.isValidPersonal)
    },
    allCourses () {
      return this.$store.getters.loadedCourses
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    close () {
      this.showModal = false
    },
    saveEditProfile () {
      this.$store.dispatch('editProfile', {
        id: this.user.id,
        fullName: this.editedFullName,
        rollNo: this.editedRollNo,
        course: this.editedCourse,
        ugMarksPercent: this.editedUgMarksPercent,
        twelfthMarksPercent: this.editedTwelfthMarksPercent,
        tenthMarksPercent: this.editedTenthMarksPercent
      })
      this.showModal = false
    }
  }
}
</script>
