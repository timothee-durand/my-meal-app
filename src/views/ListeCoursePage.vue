<template>
  <div>
    <h3>Liste de course</h3>
    <form @submit.prevent="getListeCourse">
      <label>
        Date de début :
        <input type="date" v-model="form.dateDebut">
      </label>
      <label>
        Date de fin
        <input type="date" v-model="form.dateFin">
      </label>
      <button type="submit">Avoir liste course</button>
    </form>
    <button type="button" @click="saveListeCourse">Enregistrer la liste de course</button>
    <ListeCourse :liste-course="listeCourse" @updateOnList="updateListeCourse"/>
    <h3>Mes listes de courses</h3>
    <ListeCourse v-for="(listeCourse, i) in listeCourses" :key="'lc' + i" :liste-course="listeCourse"
                 @updateOnList="updateListeCourse" @deleteLC="deleteListeCourse"/>
    <modal name="my-first-modal">
      This is my first modal
    </modal>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'
import ListeCourse from '@/components/ListeCourse.vue'
import { v4 as uuidv4 } from 'uuid'

const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)

class ListeCourseType {
  constructor (ingredients) {
    this.ingredients = ingredients
    this.uuid = uuidv4()
  }
}

export default {
  name: 'ListeCoursePage',
  components: { ListeCourse },
  data () {
    return {
      form: {
        dateDebut: dayjs().format('YYYY-MM-DD'),
        dateFin: dayjs().add(6, 'days').format('YYYY-MM-DD')
      },
      listeCourse: {}
    }
  },
  computed: {
    ...mapState(['listeCourses'])
  },
  methods: {
    getListeCourse () {
      //  console.log(this.form.dateDebut, this.form.dateFin)
      // on récupère les repas entre date début et date fin
      const repasConcernes = []
      // console.log(this.$store.state.repas)
      Object.keys(this.$store.state.repas).forEach((date) => {
        // si la date est entre la date de début et la date de fin, sans granularité, en incluant date de début et date de fin
        if (dayjs(date).isBetween(this.form.dateDebut, this.form.dateFin, null, '[]')) {
          repasConcernes.push(this.$store.state.repas[date])
        }
      })
      let ingredients = []
      // console.log('repasConcernes', repasConcernes)
      repasConcernes.forEach((repas) => {
        console.log(repas)
        if (repas._dejeune) {
          repas._dejeune.forEach(slug => {
            const recette = this.$store.state.recettes[slug]
            console.log(recette)
            if (recette) {
              ingredients = ingredients.concat(recette._ingredients)
            }
          })
        }
        if (repas._diner) {
          repas._diner.forEach(slug => {
            const recette = this.$store.state.recettes[slug]
            if (recette) {
              ingredients = ingredients.concat(recette._ingredients)
            }
          })
        }
      })
      ingredients = [...new Set(ingredients)]
      // on ajoute un champ valide
      const listeIngredientObjet = []
      ingredients.forEach(function (ing) {
        listeIngredientObjet.push({
          nom: ing,
          valide: false
        })
      })
      this.listeCourse = new ListeCourseType(listeIngredientObjet)
      console.log(this.listeCourse)
    },
    saveListeCourse () {
      this.$store.dispatch('addListeCourse', this.listeCourse)
      this.listeCourse = {}
    },
    updateListeCourse (payload) {
      this.$store.dispatch('updateListeCourse', payload)
    },
    deleteListeCourse (payload) {
      this.$modal.show('dialog', {
        title: 'Suppression',
        text: 'Êtes-vous sûrs de vouloir supprimer cette liste de course ?',
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
              this.$store.dispatch('deleteListeCourse', payload)
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
h3 {
  margin-top: 0;
}
</style>
