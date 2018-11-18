import * as firebase from 'firebase'

export default {
  updateCourses ({commit}, payload) {
    commit('setLoading', true)
    firebase.database().ref('courses').set(payload)
    .then(() => {
      commit('setAllCourses', payload)
      commit('setLoading', false)
    })
    .catch((error) => {
      console.log(error)
      commit('setLoading', false)
    })
  },
  loadCourses ({commit}) {
    commit('setLoading', true)
    firebase.database().ref('courses').once('value')
      .then(data => {
        const courses = data.val()
        commit('setAllCourses', courses)
        commit('setLoading', false)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
  },
  loadJobs ({commit}) {
    commit('setLoading', true)
    firebase.database().ref('jobs').once('value')
      .then(data => {
        const jobs = []
        const obj = data.val()
        for (let key in obj) {
          jobs.push({
            id: key,
            fbKey: obj[key].fbKey,
            title: obj[key].title,
            description: obj[key].description,
            qualifications: obj[key].qualifications,
            courses: obj[key].courses,
            ugMarksPercent: obj[key].ugMarksPercent,
            twelfthMarksPercent: obj[key].twelfthMarksPercent,
            tenthMarksPercent: obj[key].tenthMarksPercent,
            email: obj[key].email,
            date: obj[key].date,
            creatorId: obj[key].creatorId
          })
        }
        commit('setLoadedJobs', jobs)
        commit('setLoading', false)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
  },
  saveBookmarkedJob ({commit, getters}, payload) {
    commit('setLoading', true)
    const user = getters.user
    const bmJob = {
      title: payload.title,
      email: payload.email,
      date: payload.date,
      id: payload.id,
      fbKey: payload.fbKey
    }
    firebase.database().ref('/users/' + user.id).child('/saved-jobs/').push(payload)
      .then(data => {
        commit('saveBookmarkedJob', {
          ...bmJob,
          fbKey: data.key
        })
        commit('setLoading', false)
      })
      .catch(
        (error) => {
          console.log(error)
          commit('setLoading', false)
        }
      )
  },
  unSaveBookmarkedJob ({commit, getters}, payload) {
    commit('setLoading', true)
    const user = getters.user
    if (!user.fbKeys) return
    firebase.database()
      .ref('/users/' + user.id + '/saved-jobs/').child(payload.fbKey)
      .remove()
      .then(() => {
        commit('unsaveBookmarkedJob', payload.id)
        commit('setLoading', false)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
  },
  createJob ({commit, getters}, payload) {
    const job = {
      title: payload.title,
      description: payload.description,
      qualifications: payload.qualifications,
      courses: payload.courses,
      ugMarksPercent: payload.ugMarksPercent,
      twelfthMarksPercent: payload.twelfthMarksPercent,
      tenthMarksPercent: payload.tenthMarksPercent,
      email: payload.email,
      date: payload.date,
      creatorId: getters.user.id
    }
    commit('setLoading', true)
    firebase.database().ref('jobs').push(job)
      .then(data => {
        const key = data.key
        commit('createJob', {
          ...job,
          id: key
        })
        commit('setLoading', false)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
  },
  editJob ({commit}, payload) {
    commit('setLoading', true)
    const updateObj = {}
    if (payload.title) {
      updateObj.title = payload.title
    }
    if (payload.description) {
      updateObj.description = payload.description
    }
    if (payload.qualifications) {
      updateObj.qualifications = payload.qualifications
    }
    if (payload.courses) {
      updateObj.courses = payload.courses
    }
    if (payload.email) {
      updateObj.email = payload.email
    }
    if (payload.ugMarksPercent) {
      updateObj.ugMarksPercent = payload.ugMarksPercent
    }
    if (payload.twelfthMarksPercent) {
      updateObj.twelfthMarksPercent = payload.twelfthMarksPercent
    }
    if (payload.tenthMarksPercent) {
      updateObj.tenthMarksPercent = payload.tenthMarksPercent
    }
    console.log(updateObj)
    firebase.database().ref('jobs').child(payload.id).update(updateObj)
      .then(() => {
        commit('updateJob', payload)
        commit('setLoading', false)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
  },
  editProfile ({commit}, payload) {
    commit('setLoading', true)
    const updateObj = {}
    if (payload.ugMarksPercent) {
      updateObj.ugMarksPercent = payload.ugMarksPercent
    }
    if (payload.twelfthMarksPercent) {
      updateObj.twelfthMarksPercent = payload.twelfthMarksPercent
    }
    if (payload.tenthMarksPercent) {
      updateObj.tenthMarksPercent = payload.tenthMarksPercent
    }
    const updateProfileObj = {}
    if (payload.fullName) {
      updateProfileObj.fullName = payload.fullName
    }
    if (payload.rollNo) {
      updateProfileObj.rollNo = payload.rollNo
    }
    if (payload.course) {
      updateProfileObj.course = payload.course
    }
    console.log(updateObj)
    firebase.database().ref('/users/' + payload.id).child('marks').update(updateObj)
      .then(() => {
        firebase.database().ref('/users/' + payload.id).child('personal').update(updateProfileObj)
          .then(() => {
            commit('updateProfile', payload)
            commit('setLoading', false)
          })
          .catch((error) => {
            console.log(error)
            commit('setLoading', false)
          })
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
  },
  signUserUp ({commit, dispatch}, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          console.log(user)
          const newUser = {
            id: user.user.uid,
            fullName: payload.fullName,
            rollNo: '',
            course: null,
            tenthSchoolName: null,
            tenthMarksPercent: null,
            twelfthSchoolName: null,
            twelfthMarksPercent: null,
            ugMarksPercent: null,
            createdJobs: [],
            bookmarkedJobs: [],
            fbKeys: {}
          }
          commit('setUser', newUser)
          const updateProfileObj = {
            fullName: payload.fullName
          }
          firebase.database().ref('/users/' + newUser.id).child('personal').update(updateProfileObj)
          .then(() => {
            commit('updateProfile', newUser)
            commit('setLoading', false)
          })
          .catch((error) => {
            console.log(error)
            commit('setLoading', false)
          })
        }
      )
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
  },
  signUserIn ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const newUser = {
          id: user.user.uid,
          fullName: '',
          rollNo: '',
          course: null,
          tenthSchoolName: null,
          tenthMarksPercent: null,
          twelfthSchoolName: null,
          twelfthMarksPercent: null,
          ugMarksPercent: null,
          createdJobs: [],
          bookmarkedJobs: [],
          fbKeys: {}
        }
        console.log(newUser)
        commit('setUser', newUser)
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setError', error)
        console.log(error)
        commit('setLoading', false)
      })
  },
  signUserOut ({commit}) {
    firebase.auth().signOut()
    commit('setAdmin', false)
    commit('setUser', null)
  },
  autoSignIn ({commit}, payload) {
    commit('setUser', {
      id: payload.uid,
      fullName: '',
      rollNo: '',
      course: null,
      tenthSchoolName: null,
      tenthMarksPercent: null,
      twelfthSchoolName: null,
      twelfthMarksPercent: null,
      ugMarksPercent: null,
      createdJobs: [],
      bookmarkedJobs: [],
      fbKeys: {}
    })
  },
  fetchUserData ({commit, getters}) {
    commit('setLoading', true)
    var marks = {}
    firebase.database().ref('/users/' + getters.user.id + '/marks').once('value')
      .then(data => {
        marks = data.val()
      })
      .catch(error => {
        console.log(error)
      })
    var personal = {}
    firebase.database().ref('/users/' + getters.user.id + '/personal').once('value')
      .then(data => {
        personal = data.val()
      })
      .catch(error => {
        console.log(error)
      })
    firebase.database().ref('/users/' + getters.user.id + '/saved-jobs/').once('value')
      .then(data => {
        const dataPairs = data.val()
        let bookmarkedJobs = []
        let swappedPairs = {}
        for (let key in dataPairs) {
          bookmarkedJobs.push(dataPairs[key])
          swappedPairs[dataPairs[key].id] = key
        }
        const updatedUser = {
          id: getters.user.id,
          bookmarkedJobs: bookmarkedJobs,
          fbKeys: swappedPairs
        }
        commit('setUser', { ...updatedUser, ...marks, ...personal })
        if (personal.admin === true) {
          commit('setAdmin', true)
        }
        commit('setLoading', false)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
  },
  fetchUsersData ({commit, getters}) {
    commit('setLoading', true)
    firebase.database().ref('/users/').once('value')
      .then(data => {
        const users = []
        const obj = data.val()
        for (let key in obj) {
          if (obj[key].marks && obj[key].personal) {
            users.push({
              id: key,
              fullName: obj[key].personal.fullName,
              rollNo: obj[key].personal.rollNo,
              course: obj[key].personal.course,
              ugMarksPercent: obj[key].marks.ugMarksPercent,
              twelfthMarksPercent: obj[key].marks.twelfthMarksPercent,
              tenthMarksPercent: obj[key].marks.tenthMarksPercent
            })
          }
        }
        commit('setUsers', users)
        commit('setLoading', false)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
  },
  clearError ({commit}) {
    commit('clearError')
  }
}
