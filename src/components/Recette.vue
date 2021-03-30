<template>
  <div class="recette bg-card" :class="{'recette-not-full':!full}">
    <div  class="tb-recette tb-card" :style="`background-image:url('${recette.image}')`"></div>
    <div class="recette-content">
      <p class="titre">{{ recette.titre }}</p>
      <div class="prep" v-html="recette._preparation"></div>
      <div v-if="full">
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
<style scoped>
.recette-not-full {
  display: flex;
  margin: 0 auto 2rem auto;
  max-width: 600px;
}

.recette-not-full .tb-recette {
  min-width: 100px;
  width: 30%;
  -webkit-background-size: cover;
  background-size: cover;
  background-position: center center;
}

.recette-not-full .recette-content {
  padding: 1rem;
}

.recette-not-full .prep {
  max-height: 5rem;
  overflow: hidden;
}

.titre {
  font-weight: 700;
  text-align: center;
}

.recette-content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.recette-content > *, .prep > *, .prep p {
  margin: 0 0 1rem 0;
}

</style>
