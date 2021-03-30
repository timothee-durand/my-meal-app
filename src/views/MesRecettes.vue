<template>
  <div>
    <h3>Mes Recettes</h3>
    <Recette v-for="rec in recettes" :recette="rec"  :key="'rec' + rec.slug" class="recette">
      <template v-slot:button>
        <div class="buttons-mes-recettes">
          <button type="button" class="delete-button-recette" > <span class="text-yellow-alpha hover-scale-up cursor-pointer"><i class="fas fa-edit"></i></span></button>
        </div>

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
    width: 10%;
    margin: 0 0.6rem ;
    padding: 0.5rem;
  }

  .buttons-mes-recettes {
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
  }

</style>
