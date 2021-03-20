import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import firebase from 'firebase/app'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Modal from 'vuejs-modal'
// If you can use default template, you should be:
import confirm from 'vuejs-modal/lib/confirm.vue'

Vue.use(VueAxios, axios)

Vue.use(Modal, {
  modals: {
    confirm // default template
  }// your modals, is a object
})

Vue.config.productionTip = false

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
