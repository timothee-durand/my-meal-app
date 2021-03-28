<template>
  <div>
    <h3>Mes Recettes</h3>
    <Recette v-for="rec in recettes" :recette="rec"  :key="'rec' + rec.slug">
      <template v-slot:button>
        <button type="button" class="delete-button-recette" > <span class="text-red-alpha hover-scale-up cursor-pointer"><i class="fas fa-minus-circle"></i></span></button>
      </template>
    </Recette>
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

<style>
  .delete-button-recette {
    border: none;
    text-align: right;
  }
</style>
