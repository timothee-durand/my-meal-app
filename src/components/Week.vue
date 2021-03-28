<template>
  <div class="week">
    <div v-for="(day, i) in days" :key="'day' + i" class="bg-card day">
      <p class="day-name">{{ day._text }}</p>
      <div class="day-repas">
        <Repas :jour="day" nom="Déjeuné" type="_dejeune" couleur="red-alpha"/>
        <Repas :jour="day" nom="Diner" type="_diner" couleur="yellow-alpha"/>
      </div>

    </div>

  </div>
</template>

<script>
import * as dayjs from 'dayjs'
import Repas from '@/components/Repas.vue'

require('dayjs/locale/fr')

const dayInWeek = 7

class Day {
  _dejeune = []
  _diner = []

  constructor (text, date) {
    this._text = text
    this._date = date
  }

  get dejeune () {
    return this._dejeune
  }

  set dejeune (value) {
    this._dejeune = value
  }

  get diner () {
    return this._diner
  }

  set diner (value) {
    this._diner = value
  }

  get text () {
    return this._text
  }

  set text (value) {
    this._text = value
  }

  get date () {
    return this._date
  }

  set date (value) {
    this._date = value
  }
}

export default {
  name: 'Week',
  components: { Repas },
  data () {
    return {

    }
  },
  props: {
    nbWeekFromNow: {
      type: Number,
      default: 0
    }
  },
  mounted () {

  },
  computed: {
    days () {
      // get start day (monday from now)
      let today = dayjs().locale('fr').day(1)
      // console.log('today', today)
      if (this.nbWeekFromNow && this.nbWeekFromNow > 0) {
        today = today.add(this.nbWeekFromNow, 'week')
      }
      // console.log('with if', today)
      // get days of this week
      const arrayWeek = []
      for (let i = 0; i < dayInWeek; i++) {
        const _dayJS = today.add(i, 'day')
        const text = _dayJS.format('dddd DD MMM YYYY')
        const date = _dayJS.format('YYYY-MM-DD')
        if (this.$store.state.repas[date]) {
          // si il est déjà dans la bdd on le récupère
          arrayWeek.push(this.$store.state.repas[date])
        } else {
          // sinon on en crée un nouveau
          arrayWeek.push(new Day(text, date))
        }
      }
      console.log('arrayweek', arrayWeek)
      return arrayWeek
    }
  }
}
</script>
<style>
.day {
  padding: 1rem;
  margin-bottom: 2rem;
}

.week {
  width: 70%;
}

.day-name {
  font-weight: 500;
  text-align: center;
}

.day-repas {
  display: flex;
}

.day-repas > * {
  flex: 1;
}
</style>
