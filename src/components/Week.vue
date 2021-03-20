<template>
  <div>
    <h2>Repas</h2>

    <div v-for="(day, i) in days" :key="'day' + i">
      <p>{{ day.text }}</p>
      <div>
        <p><strong>Midi</strong></p>
        <ul><li v-for="(plat, i) in day.dejeune" :key="'plat' + i">{{plat}}</li></ul>
        <button @click="addRecette">Ajouter Plat</button>
      </div>
      <div class="">
        <p><strong>Soir</strong></p>
        <ul><li v-for="(plat, i) in day.diner" :key="'plat' + i">{{plat}}</li></ul>
        <button>Ajouter Plat</button>
      </div>
    </div>

  </div>
</template>

<script>
import * as dayjs from 'dayjs'

require('dayjs/locale/fr')

const dayInWeek = 7

export default {
  name: 'Week',
  data () {
    return {
      days: [{
        text: '',
        daysjs: null,
        dejeune: [],
        diner: []
      }]
    }
  },
  mounted () {
    this.getWeek()
  },
  methods: {
    getWeek (numberFromNow) {
      // get start day (monday from now)
      let today = dayjs().locale('fr').day(1)
      console.log('today', today)
      if (numberFromNow && numberFromNow > 0) {
        today = today.add(numberFromNow, 'week')
      }
      console.log('with if', today)
      // get days of this week
      for (let i = 0; i < dayInWeek; i++) {
        this.days.push({ text: today.add(i, 'day').format('dddd DD MMM YYYY') })
      }
    },
    addRecette () {
      this.$router.push('Recettes')
    }
  }
}
</script>

<style scoped>

</style>
