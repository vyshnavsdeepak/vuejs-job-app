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
  adminStatus (state) {
    return state.adminStatus
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
  reqUsers (state) {
    return (fullName, rollNo, courses, ugMarksPercent, twelfthMarksPercent, tenthMarksPercent) => {
      return state.users.filter((user) => {
        return user.fullName.toLowerCase().includes(fullName.toLowerCase()) && user.rollNo.toLowerCase().includes(rollNo.toLowerCase()) && (courses[0] === null ? true : courses.includes(user.course)) && user.ugMarksPercent >= ugMarksPercent && user.twelfthMarksPercent >= twelfthMarksPercent && user.tenthMarksPercent >= tenthMarksPercent
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
