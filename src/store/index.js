import Vuex from 'vuex'
import { firebaseAction, vuexfireMutations } from 'vuexfire'
import Vue from 'vue'
import firebase from 'firebase'
import params from '@/params/params.js'
import axios from 'axios'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: window.sessionStorage
})

const firebaseConfig = {
  apiKey: 'AIzaSyAU4LQZ-cMBoHD-TX9FLUhYobER0yjW1_Q',
  authDomain: 'mymeal-71914.firebaseapp.com',
  databaseURL: 'https://mymeal-71914-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'mymeal-71914',
  storageBucket: 'mymeal-71914.appspot.com',
  messagingSenderId: '364782678778',
  appId: '1:364782678778:web:eddc8d7db5e6aea1850f43',
  measurementId: 'G-ZM1RZ90BYB'
}

firebase.initializeApp(firebaseConfig)

const db = firebase.database()

export default new Vuex.Store({
  state: {
    repas: {},
    recettes: {},
    user: {},
    listeCourses: [],
    isConnected: false
  },
  mutations: {
    ...vuexfireMutations,
    authenticateUser (context, user) {
      context.user = user
      context.isConnected = true
    },
    disconnectUser (context) {
      context.user = {}
      context.isConnected = false
      context.repas = {}
      context.recettes = {}
    }
  },
  actions: {
    bindRepas: firebaseAction(({
      state,
      bindFirebaseRef
    }) => {
      // return the promise returned by `bindFirebaseRef`
      if (state.isConnected) {
        return bindFirebaseRef('repas', db.ref(state.user.user.uid + '/' + params.keyRTDB.repas))
      } else {
        return null
      }
    }),
    bindRecettes: firebaseAction(({
      state,
      bindFirebaseRef
    }) => {
      // return the promise returned by `bindFirebaseRef`
      if (state.isConnected) {
        return bindFirebaseRef('recettes', db.ref(state.user.user.uid + '/' + params.keyRTDB.recette))
      } else {
        return null
      }
    }),
    bindListeCourse: firebaseAction(({
      state,
      bindFirebaseRef
    }) => {
      // return the promise returned by `bindFirebaseRef`
      if (state.isConnected) {
        return bindFirebaseRef('listeCourses', db.ref(state.user.user.uid + '/' + params.keyRTDB.listeCourse))
      } else {
        return null
      }
    }),
    addRepas: firebaseAction((context, repas) => {
      // return the promise so we can await the write
      if (context.state.isConnected) {
        return db.ref(context.state.user.user.uid + '/' + params.keyRTDB.repas + '/' + repas._date).set(repas)
      } else {
        return null
      }
    }),
    addRecette: firebaseAction(async (context, recette) => {
      // return the promise so we can await the write
      try {
        const recetteCompletee = await axios.get(params.apiRecetteRoute.recette + recette.slug)
        recette = recetteCompletee.data
        // return the promise so we can await the write
        if (context.state.isConnected) {
          return db.ref(context.state.user.user.uid + '/' + params.keyRTDB.recette + '/' + recette.slug).set(recette)
        } else {
          return null
        }
      } catch (e) {
        console.log(e)
      }
    }),
    addListeCourse: firebaseAction((context, listeCourse) => {
      // return the promise so we can await the write
      console.log('listecourse', listeCourse)
      if (context.state.isConnected) {
        return db.ref(context.state.user.user.uid + '/' + params.keyRTDB.listeCourse + '/' + listeCourse.uuid).set(listeCourse)
      } else {
        return null
      }
    }),
    updateListeCourse: firebaseAction((context, listeCourse) => {
      // return the promise so we can await the write
      console.log('listecourse', listeCourse)
      if (context.state.isConnected) {
        return db.ref(context.state.user.user.uid + '/' + params.keyRTDB.listeCourse + '/' + listeCourse.uuid).update(listeCourse, (err) => { console.log('err', err) })
      } else {
        return null
      }
    }),
    deleteListeCourse: firebaseAction((context, listeCourse) => {
      // return the promise so we can await the write
      console.log('listecourse', listeCourse)
      if (context.state.isConnected) {
        return db.ref(context.state.user.user.uid + '/' + params.keyRTDB.listeCourse + '/' + listeCourse.uuid).remove()
      } else {
        return null
      }
    }),
    /**
     * @param paylaod object Contenant un type, une date et le slug de la recette à supprimer
     * */
    deletePlat: firebaseAction((context, payload) => {
      // return the promise so we can await the write

      if (context.state.isConnected) {
        return db.ref(context.state.user.user.uid + '/' + params.keyRTDB.repas + '/' + payload.date + '/' + payload.type + '/' + payload.slug).remove()
      } else {
        return null
      }
    })
  },
  plugins: [
    vuexPersist.plugin
  ]
})
