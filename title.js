// Définition des modules (certains sans test)
const modules = [
    { nom: "Mathématiques", coefficient: 4, image: "images/math.png", test: true },
    { nom: "Physique", coefficient: 3, image: "images/physics.png", test: true },
    { nom: "Informatique", coefficient: 2, image: "images/computer.png", test: true },
    { nom: "Anglais", coefficient: 1, image: "images/english.png", test: true },
    { nom: "Sport", coefficient: 1, image: "images/sport.png", test: false },  
    { nom: "Projet Final", coefficient: 5, image: "images/project.png", test: false }  
];

function afficherModules() {
    let tableBody = document.getElementById("modulesTable");
    tableBody.innerHTML = ""; // Efface les anciennes lignes

    modules.forEach((module, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td class="module-name">
                <img src="${module.image}" class="module-img" alt="">
                <span>${module.nom}</span>
            </td>
            <td>${module.coefficient}</td>
            <td><input type="number" class="examen" data-index="${index}" min="0" max="20" step="0.1"></td>
            <td>
                ${module.test ? `<input type="number" class="test" data-index="${index}" min="0" max="20" step="0.1">` : "—"}
            </td>
        `;

        tableBody.appendChild(row);
    });

    // Ajout de l'événement pour changer la couleur des inputs
    document.querySelectorAll(".examen, .test").forEach(input => {
        input.addEventListener("input", () => {
            let valeur = parseFloat(input.value);
            if (valeur < 10) {
                input.classList.add("pink");
                input.classList.remove("green");
            } else {
                input.classList.add("green");
                input.classList.remove("pink");
            }
        });
    });
}

function calculerMoyenne() {
    let examens = document.querySelectorAll(".examen");
    let tests = document.querySelectorAll(".test");

    let sommeProduits = 0;
    let sommeCoefficients = 0;

    for (let i = 0; i < modules.length; i++) {
        let examen = parseFloat(examens[i].value);
        let coef = modules[i].coefficient;

        if (isNaN(examen) || examen < 0 || examen > 20) {
            document.getElementById("result").innerText = "Veuillez entrer des notes valides entre 0 et 20.";
            document.getElementById("result").style.color = "red";
            return;
        }

        let noteModule;
        if (modules[i].test) {
            let test = parseFloat(tests[i].value);
            if (isNaN(test) || test < 0 || test > 20) {
                document.getElementById("result").innerText = "Veuillez entrer des notes valides entre 0 et 20.";
                document.getElementById("result").style.color = "red";
                return;
            }
            noteModule = (examen * 0.6) + (test * 0.4);
        } else {
            noteModule = examen * 1;
        }
        sommeProduits += noteModule * coef;
        sommeCoefficients += coef;
    }

    let moyenneFinale = sommeProduits / sommeCoefficients;
    document.getElementById("result").innerText = "Moyenne finale : " + moyenneFinale.toFixed(2) + "/20";
    document.getElementById("result").style.color = "white";
}

// Chargement des modules au démarrage
document.addEventListener("DOMContentLoaded", afficherModules);
