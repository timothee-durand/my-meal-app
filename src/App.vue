<template>
  <div id="app" class="p-4">
    <button type="button" @click="disconnect">Se déconnecter</button>
    <router-view/>
    <v-dialog />
  </div>
</template>
<script>

export default {
  name: 'App',
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
<style>
</style>
