export default {
  loadedJobs (state) {
    return state.loadedJobs.sort((jobA, jobB) => {
      return jobA.date < jobB.date
    })
  },
  loadedJob (state) {
    return (jobId) => {
      return state.loadedJobs.find((job) => {
        return job.id === jobId
      })
    }
  },
  user (state) {
    return state.user
  },
  loading (state) {
    return state.loading
  },
  error (state) {
    return state.error
  }
}
