<template>
  <div id="app" >
<!--    <button type="button" @click="disconnect">Se déconnecter</button>-->
    <MenuBurger/>
    <router-view class="page"/>
    <v-dialog />
  </div>
</template>
<script>

import MenuBurger from './MenuBurger.vue'

export default {
  name: 'App',
  components: { MenuBurger },
  mounted () {
    this.$store.dispatch('bindRecettes')
    this.$store.dispatch('bindRepas')
    this.$store.dispatch('bindListeCourse')
  },
  methods: {
    disconnect () {
      this.$store.commit('disconnectUser')
      this.$router.push('/login')
    }
  }
}
</script>
<style src="@/css/main.css"></style>
