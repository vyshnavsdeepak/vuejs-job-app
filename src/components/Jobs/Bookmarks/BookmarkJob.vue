<template>
  <div>
    <a :class="[linkClass, { 'is\-loading': loading }, { 'is\-outlined': userBookmarkedJob }]"
    @click="bookmarkJob">{{ userBookmarkedJob ? '&#9733; Saved' : '&#9734; Save' }}</a>
  </div>
</template>

<script>
export default {
  props: ['id', 'title', 'email', 'date', 'linkClass'],
  computed: {
    userBookmarkedJob () {
      return this.$store.state.user.bookmarkedJobs.some(job => job.id === this.id)
    },
    loading () {
      return this.$store.getters.loading
    },
    userFbKey () {
      return this.$store.state.user.fbKeys[this.id]
    }
  },
  methods: {
    bookmarkJob () {
      if (this.userBookmarkedJob) {
        this.$store.dispatch('unSaveBookmarkedJob', {
          id: this.id,
          fbKey: this.userFbKey
        })
      } else {
        this.$store.dispatch('saveBookmarkedJob', {
          id: this.id,
          title: this.title,
          email: this.email,
          date: this.date
        })
      }
    }
  }
}
</script>
