<template>
  <div>
    <h3>Recettes</h3>
    <div class="recette" v-for="recette in recettes" :key="recette.slug">
      <h4>{{recette.titre}}</h4>
      <img :src="recette.image" alt="">
    </div>
  </div>
</template>

<script>
import params from '@/params/params.js'

export default {
  name: 'Recettes',
  data () {
    return {
      recettes: []
    }
  },
  mounted () {
    this.axios.get(params.apiRecetteRoute.proposition).then(data => {
      this.recettes = data.data
    }).catch(err => console.log('ERROR : ', err))
  }
}
</script>

<style scoped>

</style>
