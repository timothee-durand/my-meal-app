<template>
  <div class="repas" :class="couleur">
    <div class="header-card">
      <p class="repas-name text-white">{{ nom }}</p>
      <router-link :to="{ name: 'Recettes', params: { repas: jour, type:type }}" class="add">
        <i class="fas fa-plus text-white"></i>
      </router-link>
    </div>
    <ul class="list-plats text-white">
      <li v-for="(plat, i) in jour[type]" :key="'plat' + i" class="plat white text-red">{{ plat | recetteName }} <span class="text-red-alpha hover-scale-up cursor-pointer"
                                                                             @click="deletePlat(i)"><i class="fas fa-minus-circle"></i></span></li>
    </ul>

  </div>
</template>
<script>
import params from '@/params/params.js'
export default {
  name: 'Repas',
  props: {
    jour: {},
    nom: {},
    type: {},
    couleur: {
      required: true
    }
  },
  data () {
    return {
      maxNombrePlat: params.maxNombrePlat
    }
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
.repas-name {
  font-size: 1.5rem;
  text-align: center;
}

.header-card {
  padding: 1rem;
}
.header-card p {
  margin: 0;
}

.add {
  transition: transform ease 200ms;
  will-change: transform;
}

.add:hover {
  transform: scale(1.2);
}

.repas {
  margin: 0.5rem;
  padding: 0.5rem;
}

.list-plats {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.plat {
  border-radius: 4px;
  width: 90%;
  padding: 7px 5px;
  display: flex;
  justify-content: space-between;
}
</style>
