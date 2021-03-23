const apiRecetteHost = 'https://api-cuisine-etudiante.herokuapp.com/'

export default {
  apiRecetteRoute: {
    proposition: apiRecetteHost + 'proposition-recette',
    search: apiRecetteHost + 'search/',
    recette: apiRecetteHost + 'recette/'
  },
  keyRTDB: {
    repas: 'repas',
    recette: 'recettes',
    listeCourse: 'listes-courses'
  }
}
