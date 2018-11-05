export default {
  setLoadedJobs (state, payload) {
    state.loadedJobs = payload
  },
  saveBookmarkedJob (state, payload) {
    const {id} = payload
    if (state.user.bookmarkedJobs.findIndex(job => job.id === id) >= 0) return
    state.user.bookmarkedJobs.push(payload)
    state.user.fbKeys[id] = payload.fbKey
  },
  unsaveBookmarkedJob (state, payload) {
    const {bookmarkedJobs, fbKeys} = state.user
    bookmarkedJobs.splice(bookmarkedJobs.findIndex(job => job.id === payload), 1)
    delete fbKeys[payload]
  },
  createJob (state, payload) {
    state.loadedJobs.push(payload)
  },
  updateJob (state, payload) {
    const job = state.loadedJobs.find(job => {
      return job.id === payload.id
    })
    if (payload.title) {
      job.title = payload.title
    }
    if (payload.description) {
      job.description = payload.description
    }
    if (payload.qualifications) {
      job.qualifications = payload.qualifications
    }
    if (payload.email) {
      job.email = payload.email
    }
  },
  setUser (state, payload) {
    state.user = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  clearError (state) {
    state.error = null
  }
}
