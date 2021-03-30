<template>
  <div class="bg-card liste-course">
    <button @click="$emit('deleteLC', listeCourse)" v-if="deleteButton" class="border-none text-red trash-liste-course"><i class="fas fa-trash"></i></button>
    <ul @click="toggleIng">
      <li v-for="(ing,i) in listeCourse.ingredients" :key="'ing' + i" @click="ing.valide = !ing.valide" :class="{'checked':ing.valide}" class="ingredient">
        {{ ing.nom }}
      </li>
    </ul>
  </div>

</template>
<script>
export default {
  name: 'ListeCourse',
  props: {
    listeCourse: {},
    deleteButton: {
      default: true,
      type: Boolean
    }
  },
  methods: {
    toggleIng () {
      this.$emit('updateOnList', this.listeCourse)
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

.trash-liste-course {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.4rem;
}

ul {
  list-style: none;
}

li {
  position: relative;
  text-decoration: line-through;
  text-decoration-color: transparent;
  text-decoration-thickness: 0;
  transition:  color ease-out 200ms, opacity ease-out 200ms;
}

li.checked {
  text-decoration-thickness: 3px;
  text-decoration-color: var(--yellow-alpha);
  color:var(--yellow-alpha);
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
</style>
