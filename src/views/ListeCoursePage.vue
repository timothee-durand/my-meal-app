<template>
  <div>
    <modal name="generer-liste-course" adaptive width="90%" classes="modal-my-meal" height="auto">
      <h3>Générer une liste de course</h3>
      <form @submit.prevent="getListeCourse">
        <label for="date_debut">Date de début</label>
        <input type="date" v-model="form.dateDebut" id="date_debut">
        <label for="date_fin">Date de fin</label>
        <input type="date" v-model="form.dateFin" id="date_fin">
        <button type="submit" class="red text-white">Avoir liste course</button>
      </form>
    </modal>

    <modal name="editer-liste-course" adaptive width="90%" classes="modal-my-meal" height="auto">
      <h3>Changer la liste de course</h3>
      <ListeCourse :liste-course="listToEdit" @updateOnList="saveChangesListeCourse" :delete-button="false"
                   :edit-button="false" edit-mode disable-ombre/>
    </modal>

    <button type="button" @click="openModalAddLC" class="button-fixed"><i
      class="fas fa-plus-circle fa-2x text-yellow"></i></button>
    <ListeCourse :liste-course="listeCourse" @updateOnList="updateListeCourse" :delete-button="false"
                 v-if="isListeCourse"/>
    <h3>Mes listes de courses</h3>
    <ListeCourse v-for="(listeCourse, i) in listeCourses" :key="'lc' + i" :liste-course="listeCourse"
                 @updateOnList="updateListeCourse" @deleteLC="deleteListeCourse" @editLC="editListeCourse"/>
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
      listeCourse: {},
      listToEdit: {}
    }
  },
  computed: {
    ...mapState(['listeCourses']),
    isListeCourse () {
      return this.listeCourse.ingredients !== undefined
    }
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
          Object.keys(repas._dejeune).forEach(key => {
            const slug = repas._dejeune[key]
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
      this.saveListeCourse(new ListeCourseType(listeIngredientObjet))
      this.$modal.hide('generer-liste-course')
    },
    saveListeCourse (listeCourse) {
      this.$store.dispatch('addListeCourse', listeCourse)
      this.listeCourse = {}
    },
    updateListeCourse (payload) {
      this.$store.dispatch('updateListeCourse', payload)
    },
    saveChangesListeCourse (payload) {
      this.$store.dispatch('updateListeCourse', payload)
      this.$modal.hide('editer-liste-course')
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
    },
    openModalAddLC () {
      this.$modal.show('generer-liste-course')
    },
    editListeCourse (payload) {
      this.listToEdit = payload
      this.$modal.show('editer-liste-course')
    }
  }
}
</script>

<style scoped>
h3 {
  margin-top: 0;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
}

input, input:focus, input:focus-visible {
  font-family: var(--body-font);
  background-color: var(--red-alpha);
  border: none;
  padding: 1rem 0.5rem;
  border-radius: 10px;
}

input:placeholder {
  opacity: 0.5;
}

button {
  border: none;
  margin-top: 1rem;
}

</style>
