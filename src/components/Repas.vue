<template>
  <div>
    <p><strong>{{ nom }}</strong></p>
    <ul>
      <li v-for="(plat, i) in jour[type]" :key="'plat' + i">{{ plat }} <span class="delete-plat"
                                                                             @click="deletePlat(i)">-</span></li>
    </ul>
    <router-link :to="{ name: 'Recettes', params: { repas: jour, type:type }}" tag="button">
      Ajouter Plat
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'Repas',
  props: {
    jour: {},
    nom: {},
    type: {}
  },
  methods: {
    deletePlat (plat) {
      console.log('del')
      this.$modal.show('dialog', {
        title: 'Suppression',
        text: 'Êtes-vous sûrs de vouloir supprimer ce plat ?',
        buttons: [
          {
            title: 'Annuler',
            handler: () => {
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Oui',
            handler: () => {
              this.$store.dispatch('deletePlat', {
                type: this.type,
                date: this.jour._date,
                slug: plat
              })
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
.delete-plat {
  background-color: tomato;
  color: white;
}
</style>
