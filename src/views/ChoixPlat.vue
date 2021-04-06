<template>
  <div>
    <div :class="{'hidden':sections['mes-recettes']}" class="tab">
      <h3 class="header-accordeon">Mes recettes</h3>
      <Recette :recette="recette" v-for="recette in recettes" :key="'p' + recette.slug" @clicChoisir="addPlat"/>
    </div>
    <div :class="{'hidden':sections.propositions}" class="tab">
      <h3>Proposition Recette Cuisine Etudiant</h3>
      <Recette :recette="recette" v-for="recette in propRecettes" :key="'cep' + recette.slug"
               @clicChoisir="addNewPlat"/>
    </div>
    <div :class="{'hidden':sections.recherche}" class="tab">
      <h3>Recherche Recette</h3>
      <form @submit.prevent="searchRecette" class="form-search-recette">
        <input type="text" placeholder="votre recherche" v-model="query" minlength="3">
        <button class="red text-white" type="submit">Rechercher</button>
      </form>
      <Recette :recette="recette" v-for="recette in resultQuery" :key="'cep' + recette.slug" @clicChoisir="addNewPlat"/>
    </div>
    <div class="tabs">
      <ul>
        <Li @click="setTab('mes-recettes')" :class="{'active-tab':sections['mes-recettes']}"><i class="fas fa-book"></i> <span class="text">Mes recettes</span></Li>
        <Li @click="setTab('propositions')" :class="{'active-tab':sections.propositions}"><i class="fas fa-poll"></i><span class="text">Propositions</span> </Li>
        <Li @click="setTab('recherche')" :class="{'active-tab':sections.recherche}"><i class="fas fa-search"></i> <span class="text">Recherche</span></Li>
      </ul>
    </div>

  </div>
</template>

<script>
import params from '@/params/params.js'
import Recette from '@/components/Recette.vue'
import { mapState } from 'vuex'

export default {
  name: 'ChoixPlat',
  components: { Recette },
  data () {
    return {
      propRecettes: [],
      repas: {},
      type: '',
      query: '',
      resultQuery: [],
      sections: {
        'mes-recettes': true,
        propositions: false,
        recherche: false
      }
    }
  },
  computed: {
    ...mapState(['recettes'])
  },
  mounted () {
    this.repas = this.$route.params.repas
    this.type = this.$route.params.type
    this.axios.get(params.apiRecetteRoute.proposition).then(data => {
      this.propRecettes = data.data
    }).catch(err => console.log('ERROR : ', err))
  },
  methods: {
    addNewPlat (recette) {
      console.log('recette', recette, this.repas)

      if (this.repas[this.type]) {
        this.repas[this.type].push(recette.slug)
      } else {
        this.repas[this.type] = [recette.slug]
      }
      this.$store.dispatch('addRecette', recette)
      this.$store.dispatch('addRepas', this.repas)
    },
    addPlat (recette) {
      console.log('recette', recette, this.repas)

      if (this.repas[this.type]) {
        this.repas[this.type].push(recette.slug)
      } else {
        this.repas[this.type] = [recette.slug]
      }
      this.$store.dispatch('addRepas', this.repas)
    },
    async searchRecette () {
      try {
        const result = await this.axios.get(params.apiRecetteRoute.search + this.query)
        this.resultQuery = result.data
      } catch (e) {
        console.log(e)
      }
    },
    setTab (nom) {
      Object.keys(this.sections).forEach(key => {
        this.sections[key] = false
      })
      this.sections[nom] = true
    }
  }
}
</script>
<style scoped>

.tabs {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 8vh;
  background-color: var(--white);
}

.tabs ul {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 100%;
}

.tabs li {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tabs li i, .tabs li span {
  transition: transform, color;
  transition-timing-function: ease-in-out;
  transition-duration: 200ms;
  will-change: transform, color;
}

.tabs li.active-tab i {
  color: var(--red);
  transform: scale(1.6);
}

.tabs li.active-tab span{
  transform: scale(0.8);
}

.tab.hidden {
  display: block;
}

.tab {
  display: none;
}

.form-search-recette {
  display: flex;
  flex-direction: column;
}

input, input:focus, input:focus-visible {
  font-family: var(--body-font);
  background-color: var(--yellow-alpha);
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
  margin-bottom: 2rem;
}
</style>
