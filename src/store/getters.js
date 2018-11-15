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
  loadedUsers (state) {
    return state.users
  },
  eligibleUsers (state) {
    return (ugMarksPercent, twelfthMarksPercent, tenthMarksPercent) => {
      return state.users.filter((user) => {
        return user.ugMarksPercent >= ugMarksPercent && user.twelfthMarksPercent >= twelfthMarksPercent && user.tenthMarksPercent >= tenthMarksPercent
      })
    }
  },
  loading (state) {
    return state.loading
  },
  error (state) {
    return state.error
  }
}
