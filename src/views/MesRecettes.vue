<template>
  <div>
    <h3>Mes Recettes</h3>
    <Recette v-for="rec in recettes" :recette="rec" full :key="'rec' + rec.slug"></Recette>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Recette from '@/components/Recette.vue'

export default {
  name: 'MesRecettes',
  components: { Recette },
  computed: {
    ...mapState(['recettes'])
  }
}
</script>

<style scoped>

</style>
