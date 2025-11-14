let resetBtn = document.getElementById("reset")
let scoreJoueur = document.getElementById("score-joueur")
let scoreOrdinateur = document.getElementById("score-ordinateur")
let opierreBtn = document.getElementById("opierre")
let ofeuilleBtn = document.getElementById("ofeuille")
let ociseauxBtn = document.getElementById("ociseaux")
let message = document.getElementById("message")
let nextBtn = document.getElementById("next")
let btnJoueur = [...document.getElementsByClassName("btn-joueur")]

// NOUVEAU: Récupération de tous les boutons de l'ordinateur
let btnOrdinateur = [...document.getElementsByClassName("btn-ordi")] 


///Fonction de tout le jeu
const jouerManche = (e) =>{
    let choix = e.target.closest(".btn-joueur")
    btnJoueur.forEach(btn =>{
    btn.classList.add("desactivated")
    btn.removeEventListener("click" , jouerManche)

    })
    choix.classList.remove("desactivated")
    choix.classList.add("active")

    let choixJoueur = choix.id
    let choixOrdi = faireChoixOrdinateur()
    verifierGagnant(choixJoueur, choixOrdi)
    nextBtn.style.visibility = "visible"
}


///Fonction Ordi choix aléatoire
const PIERRE = "pierre"
const FEUILLE = "feuille"
const CISEAUX = "ciseaux"


const faireChoixOrdinateur = ( ) =>{
// CORRECTION: 1. Désactiver tous les choix de l'ordinateur
    btnOrdinateur.forEach(btn => {
        btn.classList.add("desactivated")
        btn.classList.remove("active")
    })

  ///1 feuille
  ///2 ciseaux
  let nbAleatoire = Math.floor(Math.random() * 3) 
  
  let choixOrdiElement // Variable pour stocker l'élément choisi
  let resultatChoix

  switch (nbAleatoire){
    case 0:
      choixOrdiElement = opierreBtn
      resultatChoix = PIERRE
      break
    case 1:
      choixOrdiElement = ofeuilleBtn
      resultatChoix = FEUILLE
      break
    default:
      choixOrdiElement = ociseauxBtn
      resultatChoix = CISEAUX
      break
  }

  // CORRECTION: 2. Activer uniquement le choix de l'ordinateur
  choixOrdiElement.classList.add("active")
  choixOrdiElement.classList.remove("desactivated") // Retirer la désactivation

  return resultatChoix
}

///Vérifier gagnant
const verifierGagnant = (choixJoueur,choixOrdi) =>{

  if (choixJoueur === choixOrdi){
    message.textContent = "Egalité!"
    return
  }
  if(choixJoueur === PIERRE){
    if(choixOrdi === FEUILLE){
      return victoireOrdinateur()
    } else if(choixOrdi === CISEAUX){
      return victoireJoueur()

    }
  }
  if(choixJoueur === FEUILLE){
    if(choixOrdi === CISEAUX){
      return victoireOrdinateur()
    } else if(choixOrdi === PIERRE){
      return victoireJoueur()

    }
  }
  if(choixJoueur === CISEAUX){
    if(choixOrdi === PIERRE){
      return victoireOrdinateur()
    } else if(choixOrdi === FEUILLE){
      return victoireJoueur()

    }
  }
    
}

///Fonctions victoires et incrémentation score
const victoireOrdinateur = () =>{
    message.textContent = "L'ordinateur gagne..."
    scoreOrdinateur.textContent++
}
const victoireJoueur = () =>{
    message.textContent = "Bravo! Vous avez gagné :)"
    scoreJoueur.textContent++
}

const preparerNouvelleManche = () => {
        btnJoueur.forEach((btn) =>{
        btn.classList.remove("desactivated")
        btn.classList.remove("active")
        btn.addEventListener("click",jouerManche)
    })

    nextBtn.style.visibility = "hidden"

//  Réactiver/nettoyer les boutons de l'ordinateur pour la nouvelle manche
    btnOrdinateur.forEach(btn => {
    btn.classList.remove("desactivated")
        btn.classList.remove("active")
    })

    message.textContent = "A vous de jouer!"

}

nextBtn.addEventListener("click", preparerNouvelleManche)

btnJoueur.forEach((btn) => btn.addEventListener("click",jouerManche))

resetBtn.addEventListener("click", () =>{
    scoreJoueur.textContent = 0
    scoreOrdinateur.textContent = 0
    preparerNouvelleManche()
})