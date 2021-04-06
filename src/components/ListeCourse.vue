<template>
  <div class="bg-card liste-course" :class="{'ombre-disabled':disableOmbre}">
    <div class="buttons-lc">
      <button @click="$emit('deleteLC', listeCourse)" v-if="deleteButton" class="border-none text-red "><i
        class="fas fa-trash"></i></button>
      <button @click="$emit('editLC', listeCourse)" v-if="editButton" class="border-none text-red "><i
        class="fas fa-pen"></i></button>
    </div>
    <div class="inputs-edit-mode" v-if="editMode">
      <p>Mettre le curseur et appuyer sur entrer pour ajouter un élèment</p>
      <input v-for="(ing,i) in listeCourse.ingredients" :key="'ing' + i" class="input-ingredient"
             v-model="listeCourse.ingredients[i].nom"
             @keypress.enter="addIngredient(i)"
             @keyup.enter="$event.target.nextElementSibling.focus()"
             @keyup.delete="deleteIng(i)"/>
      <button type="button" @click="$emit('updateOnList', listeCourse)">Enregistrer</button>
    </div>
    <ul @click="toggleIng" v-else>
      <li v-for="(ing,i) in listeCourse.ingredients" :key="'ing' + i" @click="ing.valide = !ing.valide"
          :class="{'checked':ing.valide}" class="ingredient">
        {{ ing.nom }}
      </li>
    </ul>
  </div>

</template>
<script>

class Ingredient {
  constructor (nom, valide) {
    this.nom = nom
    this.valide = valide
  }
}

function insertAt (array, index, ...elementsArray) {
  array.splice(index, 0, ...elementsArray)
}

export default {
  name: 'ListeCourse',
  props: {
    listeCourse: {},
    deleteButton: {
      default: true,
      type: Boolean
    },
    editButton: {
      default: true,
      type: Boolean
    },
    editMode: {
      default: false,
      type: Boolean
    },
    disableOmbre: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    toggleIng () {
      this.$emit('updateOnList', this.listeCourse)
    },
    addIngredient (index) {
      insertAt(this.listeCourse.ingredients, index + 1, new Ingredient('', false))
    },
    deleteIng (index) {
      if (this.listeCourse.ingredients[index].nom.length <= 0) {
        this.listeCourse.ingredients.splice(index, 1)
      }
    }
  }
}
</script>
<style scoped>

.ingredient {
  cursor: pointer;
}

.liste-course {
  padding: 1rem 0.5rem;
  margin-bottom: 2rem;
  position: relative;
}

.buttons-lc {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.4rem;
  display: flex;
  flex-direction: column;
  z-index: 100;
}

ul {
  list-style: none;
}

li {
  position: relative;
  text-decoration: line-through;
  text-decoration-color: transparent;
  text-decoration-thickness: 0;
  transition: color ease-out 200ms, opacity ease-out 200ms;
}

li.checked {
  text-decoration-thickness: 3px;
  text-decoration-color: var(--yellow-alpha);
  color: var(--yellow-alpha);
  opacity: 0.5;
}

li::before {
  content: '';
  position: absolute;
  border: 1px solid var(--yellow-alpha);
  top: 0.5rem;
  left: -2rem;
  height: 1rem;
  width: 1rem;
}

li::after {
  content: '';
  position: absolute;
  border-width: 0 2px 2px 0;
  border-color: var(--red-alpha);
  border-style: solid;
  top: 0.3rem;
  left: -1.7rem;
  transform: rotate(45deg) scale(0);
  transition: transform ease-out 100ms;
  height: 1rem;
  width: 0.5rem;
}

li.checked::after {
  transform: rotate(45deg) scale(1);
}

input.input-ingredient {
  border: none;
}

input.input-ingredient:focus-visible, input.input-ingredient:focus {
  outline: none;
  width: 100%;
  background-color: var(--yellow-alpha);
}

.ombre-disabled {
  box-shadow: none;
}

.inputs-edit-mode {
  display: flex;
  flex-direction: column;
}
</style>
