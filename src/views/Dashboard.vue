<template>
  <div class="white dashboard">
    <div class="internal-nav">
      <button @click="nbWeekFromNow--" :disabled="nbWeekFromNow <= 0"  class="text-red-alpha"><i class="fas fa-arrow-circle-left fa-2x"></i></button>
      <button @click="nbWeekFromNow = 0" class="cool-link text-red-alpha"><span class="wave-red text-red">Cette semaine</span> </button>
      <button @click="nbWeekFromNow++" class="text-red-alpha"><i class="fas fa-arrow-circle-right fa-2x"></i> </button>
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
<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.internal-nav {
  display: flex;
  width: 80%;
  justify-content: space-between;
}

.internal-nav button {
  border: none;
}

</style>
