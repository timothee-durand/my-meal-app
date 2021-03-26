<template>
  <div>
    <div>
      <button @click="nbWeekFromNow--">Précédente</button>
      <button @click="nbWeekFromNow++">Suivante</button>
    </div>
    <Week :nb-week-from-now="nbWeekFromNow"></Week>
  </div>
</template>
<script>
import Week from '@/components/Week.vue'

export default {
  name: 'Dashboard',
  data () {
    return {
      nbWeekFromNow: 0
    }
  },
  components: { Week }
}
</script>
