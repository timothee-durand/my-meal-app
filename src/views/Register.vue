<template>
  <div>
    <form @submit.prevent="register">
      <label> Mail :
        <input type="email" v-model="form.email">
      </label>
      <label> Mot de passe
        <input type="password" v-model="form.password">
      </label>
      <button type="submit">S'inscrire</button>
    </form>
    <form @submit.prevent="login">
      <label> Mail :
        <input type="email" v-model="form.email">
      </label>
      <label> Mot de passe
        <input type="password" v-model="form.password">
      </label>
      <button type="submit">Se connecter</button>
    </form>
    <h2>ou par google</h2>
    <button type="button" @click="signInWithGoogle">S'identifier avec google</button>
  </div>

</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Register',
  data () {
    return {
      form: {
        password: '',
        email: ''
      }
    }
  },
  methods: {
    register () {
      firebase.auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          console.log(data)
          if (!data.user.emailVerified) {
            console.log('MAIL PAS VERIFIE')
            firebase.auth().currentUser.sendEmailVerification()
          } else {
            this.$store.commit('authenticateUser', data)
            this.enterApplication()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    login () {
      firebase.auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          console.log(data)
          if (!data.user.emailVerified) {
            console.log('MAIL PAS VERIFIE')
            firebase.auth().currentUser.sendEmailVerification()
          } else {
            this.$store.commit('authenticateUser', data)
            this.enterApplication()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    signInWithGoogle () {
      firebase.auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((result) => {
          console.log(result)
          this.$store.commit('authenticateUser', result)
          this.enterApplication()
        }).catch((error) => {
          console.error('ERROR', error)
        })
    },
    enterApplication () {
      this.$router.push('DashBoard')
    }
  }
}
</script>
