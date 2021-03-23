<template>
  <div>
    <button @click="$emit('deleteLC', listeCourse)">x</button>
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
    listeCourse: {}
  },
  methods: {
    toggleIng () {
      this.$emit('updateOnList', this.listeCourse)
    }
  }
}
</script>
<style scoped>
.checked {
  color: red;
}

.ingredient {
  cursor: pointer;
}
</style>
