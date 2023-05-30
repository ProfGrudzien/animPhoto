const divAnimation = document.querySelector('div.animation')
const pMessage = document.querySelector('div.message')
const btnSuivante = document.getElementById('suivante')
const btnPrecedente = document.getElementById('precedente')
const btnAutreExemple = document.getElementById('autreExemple')

var no = -1
const etapes = [
    {
        effacer: true,
        texte: "Paul souhaite prendre une photo de son jardin.",
        entrees: ["jardin"],
        sorties: [],
        special: []
    },{
        effacer: true,
        texte: "L'appareil photo est principalement composé d'une <span class='lexique' title='Elle permet de concentrer les rayons lumineux en un point.'>lentille convergente</span>, ",
        entrees: ["lentille"],
        sorties: ["jardin"],
        special: []
    },{
        effacer: false,
        texte: "d'une <span class='lexique' title='alignement sous forme de grille'>matrice</span> de <span class='lexique' title='capteurs de luminosité'>photo-sites</span>, ",
        entrees: ["matrice_r"],
        sorties: [],
        special: []
    },{
        effacer: false,
        texte: "d'un <span class='lexique' title='ensemble formé d&rsquo;un processeur et d&rsquo;algorithmes spécialisés'>processeur d'image</span> ",
        entrees: ["cpu"],
        sorties: [],
        special: []
    },{
        effacer: false,
        texte: "et d'un écran.",
        entrees: ["ecran"],
        sorties: [],
        special: []
    },{
        effacer: true,
        texte: "Chaque <span class='lexique' title='capteurs de luminosité'>photo-site</span> génère un courant électrique proportionnel à l'intensité lumineuse qu'il reçoit.",
        entrees: ["matrice"],
        sorties: ["lentille", "matrice_r", "cpu", "ecran"],
        special: [gen_eclairs]
    },{
        effacer: true,
        texte: "Ces signaux sont <span class='lexique' title='Les valeurs décimales sont transformées en valeurs entières.'>échantillonnés</span> pour être traités par le processeur d'image.",
        entrees: [],
        sorties: [],
        special: [gen_eclairs]
    },{
        effacer: true,
        texte: "L'image obtenue est affichée sur l'écran pour aider l'utilisateur lors de sa prise de vue. ",
        entrees: ["focus"],
        sorties: ["matrice"],
        special: []
    },{
        effacer: true,
        texte: `Mais avec ce procédé, seules des photographies en <span class='lexique' title='On devrait plutôt dire en "niveaux de gris".'>"Noir et Blanc"</span> sont possibles. En effet, les photo-sites sont sensibles à l'intensité lumineuse quelque-soit la couleur.`,
        entrees: [],
        sorties: [],
        special: []
    },{
        effacer: true,
        texte: "Pour prendre des photos en couleur, un <span class='lexique' title='mosaïque de filtres colorés'>filtre de Bayer</span> est intercalé entre la lentille et la matrice de photo-sites.",
        entrees: ["lentille", "matrice_r", "cpu", "ecran"],
        sorties: ["focus"],
        special: []
    },{
        effacer: true,
        texte: "Ce <span class='lexique' title='mosaïque de filtres colorés'>filtre de Bayer</span> recouvre chaque photo-site d'un filtre de couleur (rouge, vert ou bleu).",
        entrees: ["bayer_r"],
        sorties: [],
        special: []
    },{
        effacer: true,
        texte: "Un photo-site recouvert d'un filtre bleu ne mesure alors que l'intensité de la lumière bleue reçue. ",
        entrees: ["photositeBleu"],
        sorties: ["lentille", "bayer_r", "matrice_r", "cpu", "ecran"],
        special: [photositeBleu]
    },{
        effacer: true,
        texte: "De même, les autres photo-site mesurent uniquement l'intensité de la lumière rouge ou verte reçue.",
        entrees: ["photositeRougeVert"],
        sorties: ["photositeBleu"],
        special: [photositeRougeVert]
    },{
        effacer: true,
        texte: "Chaque photo-site est alors spécialisé dans une seule couleur.",
        entrees: ["bayer"],
        sorties: ["photositeRougeVert"],
        special: []
    },{
        effacer: true,
        texte: "Pour obtenir les couleurs de chaque pixel, il faut connaître la quantité de rouge, de vert et de bleu à assembler. ",
        entrees: [],
        sorties: [],
        special: []
    },{
        effacer: true,
        texte: "Un algorithme de <span class='lexique' title='Passage des mesures des photo-sites en triplet de valeurs (rouge, vert, bleu)'>dématriçage</span> permet de reconstituer par <span class='lexique' title='Estimation d&rsquo;une valeur manquante à partir des valeurs voisines.'>interpolation</span> les deux valeurs manquantes.",
        entrees: ["dematricage"],
        sorties: ["bayer"],
        special: []
    },{
        effacer: true,
        texte: "Pour assurer à Paul de prendre une belle photo, des algorithmes l'assistent tout au long du processus.",
        entrees: ["photo"],
        sorties: ["dematricage"],
        special: []
    },{
        effacer: true,
        texte: "Les algorithmes de prise de vue automatisent la mise au point et la stabilisation pour éviter que la photo de soit floue.",
        entrees: [],
        sorties: [],
        special: []
    },{
        effacer: true,
        texte: "Les algorithmes de traitement règlent la balance des blancs, le contraste et la saturation de couleurs pour que les couleurs soient vives.",
        entrees: [],
        sorties: [],
        special: []
    },{
        effacer: true,
        texte: "Enfin, un algorithme de compression permet l'enregistrement des photos dans un format necessitant moins de mémoire (JPEG par exemple).",
        entrees: [],
        sorties: [],
        special: []
    }
]

function suivante(evenement) {
    if (no < etapes.length - 1) {
        no += 1
        etapes[no].token = Math.random()
        // gestion du texte
        if (etapes[no].effacer) {
            pMessage.innerHTML = etapes[no].texte
        } else {
            pMessage.innerHTML += etapes[no].texte
        }
        // gestions des entrées
        for (const nom of etapes[no].entrees) {
            document.getElementById(nom).classList.remove("absent")
        }
        // gestions des sorties
        for (const nom of etapes[no].sorties) {
            document.getElementById(nom).classList.add("absent")
        }
        // gestions des animations speciales
        for (const fonction of etapes[no].special) {
            fonction()
        }
    }
    // gestion de l'affichage des boutons
    if (no == etapes.length - 1) {
        btnSuivante.style.visibility = "hidden";
    }
    btnPrecedente.style.visibility = "visible";
}

function precedente(evenement) {
    if (no > 0) {
        // gestions des entrées
        for (const nom of etapes[no].sorties) {
            document.getElementById(nom).classList.remove("absent")
        }
        // gestions des sorties
        for (const nom of etapes[no].entrees) {
            document.getElementById(nom).classList.add("absent")
        }
        no -= 1
        etapes[no].token = Math.random()
        // gestions des animations speciales
        for (const fonction of etapes[no].special) {
            fonction()
        }
        // gestion du texte
        var i = no
        var texte = etapes[i].texte
        while (!etapes[i].effacer) {
            i = i - 1
            texte = etapes[i].texte + texte
        }
        pMessage.innerHTML = texte
    }
    // gestion de l'affichage des boutons
    if (no == 0) {
        btnPrecedente.style.visibility = "hidden";
    } else {
        btnSuivante.style.visibility = "visible";
    }
}

function gen_eclairs() {
    for (let i=0;i<6;i++) {setTimeout(eclairs, Math.floor(Math.random()*2000), etapes[no].token)}
}

function eclairs(token, eclair) {
    if (eclair) {eclair.remove()}
    if (etapes[no].token == token) {
        const newEclair = document.createElement("div")
        newEclair.className = "eclair"
        newEclair.style.top = `${Math.floor(Math.random()*95)}%`
        newEclair.style.left = `${Math.floor(Math.random()*95)}%`
        document.getElementById("matrice").appendChild(newEclair)
        setTimeout(eclairs, 1000, token, newEclair)
    }
}

function photositeBleu(token, index=0) {
    const couleurs = ["Bleue", "Magenta", "Rouge", "Jaune", "Verte", "Cyan"]
    document.getElementById("lampe").src = `files/lampe${couleurs[index]}.svg`
    if (index==0 || index==1 || index==5) {
        document.getElementById('psB').style.background = "center / contain no-repeat url(files/eclair.svg), white padding-box"
    } else {
        document.getElementById('psB').style.background = "white padding-box"
    }
    if (!token) {setTimeout(photositeBleu, 2000, etapes[no].token, ((index||0)+1)%6)}
    if (token == etapes[no].token) {setTimeout(photositeBleu, 2000, token, ((index||0)+1)%6)}
}

function photositeRougeVert(token, index=0) {
    const couleurs = ["Bleue", "Magenta", "Rouge", "Jaune", "Verte", "Cyan"]
    document.getElementById("lampe2").src = `files/lampe${couleurs[index]}.svg`
    if (index>2) {
        document.getElementById('psR').style.background = "center / contain no-repeat url(files/eclair.svg), white padding-box"
    } else {
        document.getElementById('psR').style.background = "white padding-box"
    }
    if (index==1 || index==2 || index==3) {
        document.getElementById('psV').style.background = "center / contain no-repeat url(files/eclair.svg), white padding-box"
    } else {
        document.getElementById('psV').style.background = "white padding-box"
    }
    if (!token) {setTimeout(photositeRougeVert, 2000, etapes[no].token, ((index||0)+1)%6)}
    if (token == etapes[no].token) {setTimeout(photositeRougeVert, 2000, token, ((index||0)+1)%6)}
}

function toggleExemple(event) {
    const div1 = document.getElementById("dematricage1")
    const div2 = document.getElementById("dematricage2")
    if (div2.style.display == "none") {
        div2.style.display = "inline-block"
        div1.style.display = "none"
    } else {
        div2.style.display = "none"
        div1.style.display = "inline-block"
    }
}

btnAutreExemple.addEventListener("click", toggleExemple)
toggleExemple()
btnPrecedente.addEventListener("click", precedente)
btnSuivante .addEventListener("click", suivante)
suivante()
btnPrecedente.style.visibility = "hidden";
