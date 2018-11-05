import * as firebase from 'firebase'

export default {
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
        commit('setLoading', false)
        commit('saveBookmarkedJob', {
          ...bmJob,
          fbKey: data.key
        })
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
        commit('setLoading', false)
        commit('unsaveBookmarkedJob', payload.id)
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
      ugMarksPercent: payload.ugMarksPercent,
      twelfthMarksPercent: payload.twelfthMarksPercent,
      tenthMarksPercent: payload.tenthMarksPercent,
      email: payload.email,
      date: payload.date,
      creatorId: getters.user.id
    }
    firebase.database().ref('jobs').push(job)
      .then(data => {
        const key = data.key
        commit('createJob', {
          ...job,
          id: key
        })
      })
      .catch((error) => {
        console.log(error)
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
    if (payload.email) {
      updateObj.email = payload.email
    }
    firebase.database().ref('jobs').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
        commit('updateJob', payload)
      })
      .catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
  },
  signUserUp ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            createdJobs: [],
            bookmarkedJobs: [],
            fbKeys: {}
          }
          commit('setUser', newUser)
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
        commit('setLoading', false)
        const newUser = {
          id: user.uid,
          createdJobs: [],
          bookmarkedJobs: [],
          fbKeys: {}
        }
        console.log(newUser)
        commit('setUser', newUser)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
  },
  signUserOut ({commit}) {
    firebase.auth().signOut()
    commit('setUser', null)
  },
  autoSignIn ({commit}, payload) {
    commit('setUser', {
      id: payload.uid,
      createdJobs: [],
      bookmarkedJobs: [],
      fbKeys: {}
    })
  },
  fetchUserData ({commit, getters}) {
    commit('setLoading', true)
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
        commit('setLoading', false)
        commit('setUser', updatedUser)
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
