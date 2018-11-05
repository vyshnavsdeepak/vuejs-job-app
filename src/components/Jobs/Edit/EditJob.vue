<template>
  <div>
    <button class="button is-primary" 
    @click="showModal = true">Edit</button>
    <template v-if="showModal">
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit job</p>
            <button class="delete" 
            aria-label="close" 
            type="reset"
            @click="close"></button>
          </header>
          <section class="modal-card-body">
            <div class="content">
              <form id="form">
                <div class="field">
                  <label class="label">Job title</label>
                  <p class="control">
                    <input class="input" 
                    type="text" 
                    v-model="editedTitle" 
                    required/>
                  </p>
                </div>
                <div class="field">
                  <label class="label">Job description</label>
                  <p class="control">
                    <textarea class="textarea" 
                    v-model="editedDescription" 
                    required></textarea>
                  </p>
                </div>
                <div class="field">
                  <label class="label">Qualifications</label>
                  <p class="control">
                    <textarea class="textarea" 
                    v-model="editedQualifications" 
                    required></textarea>
                  </p>
                </div>
                <div class="field">
                  <label class="label">Send resumé to</label>
                  <p class="control">
                    <input class="input" 
                    type="email" 
                    v-model="editedEmail" 
                    required/>
                  </p>
                </div>
                <br>
                <div class="field is-grouped">
                  <div class="control">
                    <button @click.prevent="saveEditJob" 
                    class="button is-primary" 
                    :class="{ 'is\-loading': loading }" 
                    type="button"
                    :disabled="emptyInputs">
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
  props: ['job'],
  data () {
    return {
      showModal: false,
      editedTitle: this.job.title,
      editedDescription: this.job.description,
      editedQualifications: this.job.qualifications,
      editedEmail: this.job.email
    }
  },
  computed: {
    emptyInputs () {
      if (this.editedTitle.trim() === '' || this.editedEmail.trim() === '' || this.editedDescription.trim() === '' || this.editedEmail.trim() === '') {
        return true
      }
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    close () {
      this.showModal = false
    },
    saveEditJob () {
      this.$store.dispatch('editJob', {
        id: this.job.id,
        title: this.editedTitle,
        description: this.editedDescription,
        qualifications: this.editedQualifications,
        email: this.editedEmail
      })
      this.showModal = false
    }
  }
}
</script>
