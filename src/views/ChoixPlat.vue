<template>
  <div>
    <h3>Mes recettes</h3>
    <Recette :recette="recette" v-for="recette in recettes" :key="'p' + recette.slug" @clicChoisir="addPlat"/>
    <h3>Proposition Recette Cuisine Etudiant</h3>
    <Recette :recette="recette" v-for="recette in propRecettes" :key="'cep' + recette.slug" @clicChoisir="addNewPlat"/>
    <h3>Recherche Recette</h3>
    <form @submit.prevent="searchRecette">
      <input type="text" placeholder="votre recherche" v-model="query">
      <button type="submit">Rechercher</button>
    </form>
    <Recette :recette="recette" v-for="recette in resultQuery" :key="'cep' + recette.slug" @clicChoisir="addNewPlat"/>
  </div>
</template>

<script>
import params from '@/params/params.js'
import Recette from '@/components/Recette.vue'
import { mapState } from 'vuex'

export default {
  name: 'ChoixPlat',
  components: { Recette },
  data () {
    return {
      propRecettes: [],
      repas: {},
      type: '',
      query: '',
      resultQuery: []
    }
  },
  computed: {
    ...mapState(['recettes'])
  },
  mounted () {
    this.repas = this.$route.params.repas
    this.type = this.$route.params.type
    this.axios.get(params.apiRecetteRoute.proposition).then(data => {
      this.propRecettes = data.data
    }).catch(err => console.log('ERROR : ', err))
  },
  methods: {
    addNewPlat (recette) {
      console.log('recette', recette, this.repas)

      if (this.repas[this.type]) {
        this.repas[this.type].push(recette.slug)
      } else {
        this.repas[this.type] = [recette.slug]
      }
      this.$store.dispatch('addRecette', recette)
      this.$store.dispatch('addRepas', this.repas)
    },
    addPlat (recette) {
      console.log('recette', recette, this.repas)

      if (this.repas[this.type]) {
        this.repas[this.type].push(recette.slug)
      } else {
        this.repas[this.type] = [recette.slug]
      }
      this.$store.dispatch('addRepas', this.repas)
    },
    async searchRecette () {
      try {
        const result = await this.axios.get(params.apiRecetteRoute.search + this.query)
        this.resultQuery = result.data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
