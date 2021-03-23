<template>
  <div class="recette">
    <h4>{{ recette.titre }}</h4>
    <img :src="recette.image" alt="">
    <div v-if="full">
      <div class="prep" v-html="recette._preparation"></div>
      <h4>Ingrédients</h4>
      <ul class="ingredients">
        <li v-for="ing in recette._ingredients" :key="'ing'+ing">{{ing}}</li>
      </ul>
      <h4>Matériel</h4>
      <ul class="ingredients">
        <li v-for="mat in recette._materiel" :key="'mat'+mat">{{mat}}</li>
      </ul>
      <h4>Note : {{recette._note}}</h4>
      <h4>Temps de préparation : {{recette._temps_preparation}}</h4>
      <h4>Prix : {{recette._prix}}</h4>
    </div>
    <slot name="button">
      <button @click="$emit('clicChoisir', recette)">Choisir</button>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'Recette',
  props: {
    recette: {},
    full: {
      type: Boolean
    }
  }
}
</script>
