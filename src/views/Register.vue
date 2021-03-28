<template>
  <div id="register-page">
    <div class="container">
      <h2 class="hero-title">Plannifiez vos <br> repas !</h2>
      <img src="@/assets/hero_illustration.png" alt="Illustration" class="bg-blob">
      <button type="button" class="red plain icon" @click="signInWithGoogle"><i class="fab fa-google"></i> S'identifier
        avec google
      </button>
      <p>ou</p>
      <button type="button" class="plain white icon" @click="signInMail = true"><i class="fas fa-envelope"></i> S'identifier avec son
        mail
      </button>
      <div class="sign-email-container" v-if="signInMail">
        <form @submit.prevent="login" v-if="!signUpMail">
          <label> Mail :
            <input type="email" v-model="form.email">
          </label>
          <label> Mot de passe
            <input type="password" v-model="form.password">
          </label>
          <button type="submit" class="plain red-alpha">Se connecter</button>
        </form>
        <p v-if="!signUpMail">Pas encore inscrit ? <a href="#" @click="signUpMail = true">S'inscrire</a>.</p>
        <form @submit.prevent="register" v-if="signUpMail">
          <label> Mail :
            <input type="email" v-model="form.email">
          </label>
          <label> Mot de passe
            <input type="password" v-model="form.password">
          </label>
          <button type="submit" class="plain red-alpha" >S'inscrire</button>
        </form>
      </div>
    </div>
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
      },
      signInMail: false,
      signUpMail: false
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
<style>
#register-page {
  background-color: var(--yellow);
  color: var(--red);
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

#register-page  .container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bg-blob {
  background-image: url("../assets/blob_hero.svg");
  background-size: cover;
  padding: 20px;
  margin: 2rem 0;
}

.sign-email-container {
  width: 70%;
}

.sign-email-container input {
  padding: 1rem 2rem;
  border: var(--red-alpha) solid 1px;
}

.sign-email-container > form {
  display: flex;
  flex-direction: column;
}

.sign-email-container > form label {
  display: flex;
flex-direction: column;
  margin: 1rem 0;
}

.sign-email-container button {
  width: 70%;
  margin: 1rem auto 0 auto;
}

.hero-title {
  font-size: 5rem;
  line-height: 6.2rem;
  text-align: center;
  margin: 0 0 1rem 0;
}
</style>
