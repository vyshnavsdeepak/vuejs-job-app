export default {
  setAllCourses (state, payload) {
    state.allCourses = payload
  },
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
    if (payload.courses) {
      job.courses = payload.courses
    }
    if (payload.email) {
      job.email = payload.email
    }
    if (payload.ugMarksPercent) {
      job.ugMarksPercent = payload.ugMarksPercent
    }
    if (payload.twelfthMarksPercent) {
      job.twelfthMarksPercent = payload.twelfthMarksPercent
    }
    if (payload.tenthMarksPercent) {
      job.tenthMarksPercent = payload.tenthMarksPercent
    }
  },
  updateProfile (state, payload) {
    if (payload.fullName) {
      state.user.fullName = payload.fullName
    }
    if (payload.rollNo) {
      state.user.rollNo = payload.rollNo
    }
    if (payload.course) {
      state.user.course = payload.course
    }
    if (payload.ugMarksPercent) {
      state.user.ugMarksPercent = payload.ugMarksPercent
    }
    if (payload.twelfthMarksPercent) {
      state.user.twelfthMarksPercent = payload.twelfthMarksPercent
    }
    if (payload.tenthMarksPercent) {
      state.user.tenthMarksPercent = payload.tenthMarksPercent
    }
  },
  setUser (state, payload) {
    state.user = payload
    // if (payload.id) {
    //   state.user.id = payload.id
    // }
    // if (payload.tenthSchoolName) {
    //   state.user.tenthSchoolName = payload.tenthSchoolName
    // }
    // if (payload.tenthMarksPercent) {
    //   state.user.tenthMarksPercent = payload.tenthMarksPercent
    // }
    // if (payload.twelfthSchoolName) {
    //   state.user.twelfthSchoolName = payload.twelfthSchoolName
    // }
    // if (payload.ugMarksPercent) {
    //   state.user.ugMarksPercent = payload.ugMarksPercent
    // }
    // if (payload.createJob) {
    //   state.user.createJob = payload.createJob
    // }
    // if (state.fbKeys) {
    //   state.user.fbKeys = payload.fbKeys
    // }
  },
  setUsers (state, payload) {
    state.users = payload
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
