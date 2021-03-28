<template>
  <header>
    <svg class="icon-app" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.06 21.99H18.72C19.56 21.99 20.25 21.35 20.35 20.53L22 4.05H17V0H15.03V4.05H10.06L10.36 6.39C12.07 6.86 13.67 7.71 14.63 8.65C16.07 10.07 17.06 11.54 17.06 13.94V21.99ZM0 20.99V20H15.03V20.99C15.03 21.54 14.58 21.99 14.02 21.99H1.01C0.45 21.99 0 21.54 0 20.99ZM15.03 13.99C15.03 5.99 0 5.99 0 13.99H15.03ZM0.02 16H15.02V18H0.02V16Z" fill="#F35649"/>
    </svg>
    <h1 class="text-yellow">My Meal</h1>
    <div class="burger-menu burger-menu--closed" @click="open = !open" :class="{'burger-menu--opened':open}">
      <div class="bar "></div>
      <div class="bar "></div>
      <div class="bar "></div>
    </div>
    <transition name="slide">
      <nav v-if="open" class="menu-overlay" @click="open = false">
        <div class="red">
          <router-link to="liste-course"  class="cool-link delay-1"><span data-content="Mes listes de course" class="wave-yellow text-yellow">Mes listes de course</span></router-link>
        </div>
        <div class="yellow">
          <router-link to="mes-recettes"  class="cool-link delay-2"><span data-content="Mes recettes" class="wave-red">Mes recettes</span></router-link>
        </div>
      </nav>
    </transition>
  </header>
</template>
<script>
export default {
  name: 'MenuBurger',
  data () {
    return {
      open: false
    }
  }
}
</script>
<style scoped>
header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 40% 2rem 2rem;
}

header h1 {
  margin: 0;
}

.icon-app {
  width: 2.2rem;
  height: 2.2rem;
}

body .burger-menu {
  margin: 2rem;
  width: 40px;
  display: block;
  transition: all 0.3s;
  cursor: pointer;
  height: 40px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;
}
body .burger-menu .bar {
  transition: all 0.3s;
  height: 2px;
  width: 100%;
  display: block;
  background-color: var(--red);
}
body .burger-menu .bar:nth-of-type(2) {
  margin: 8px 0;
}
body .burger-menu--closed {
  transition-delay: 0.3s;
}
body .burger-menu--closed .bar {
  float: right;
}
body .burger-menu--closed .bar:nth-of-type(2) {
  width: 75%;
  transition-property: margin, height, width;
  transition-delay: 0.3s, 0.3s, 0s;
}
body .burger-menu--closed .bar:nth-of-type(3) {
  width: 50%;
}
body .burger-menu--closed:hover .bar:nth-of-type(2), body .burger-menu--opened .bar:nth-of-type(3) {
  width: 100%;
}
body .burger-menu--closed:hover .bar:nth-of-type(3) {
  width: 100%;
}
body .burger-menu--opened {
  padding-top: 12px;
}
body .burger-menu--opened .bar:nth-of-type(1) {
  transform: rotate(45deg);
  transition-delay: 0.3s;
  height: 2px;
}
body .burger-menu--opened .bar:nth-of-type(2) {
  opacity: 0;
  height: 0;
  margin: -3px;
}
body .burger-menu--opened .bar:nth-of-type(3) {
  transform: rotate(-45deg);
  transition-delay: 0.3s;
  height: 2px;
}

.menu-overlay {
  display: flex;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  min-height: 100vh;
  z-index: 90;
}

.menu-overlay > div {
  flex:1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide-enter-active, .slide-leave-active {
  transition: transform ease .5s;
  transform: translateX(0);
}
.slide-enter, .slide-leave-to /* .slide-leave-active below version 2.1.8 */ {
  transform: translateY(-2000px);
}

.delay-1 {
  transition-delay: 100ms;
}
.delay-2 {
  transition-delay: 200ms;
}

</style>
