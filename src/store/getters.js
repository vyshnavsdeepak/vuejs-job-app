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
    return (courses, ugMarksPercent, twelfthMarksPercent, tenthMarksPercent) => {
      return state.users.filter((user) => {
        return courses.includes(user.course) && user.ugMarksPercent >= ugMarksPercent && user.twelfthMarksPercent >= twelfthMarksPercent && user.tenthMarksPercent >= tenthMarksPercent
      })
    }
  },
  loadedCourses (state) {
    return state.allCourses
  },
  loading (state) {
    return state.loading
  },
  error (state) {
    return state.error
  }
}
