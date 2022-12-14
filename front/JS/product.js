let url = new URL(window.location.href);
let id = url.searchParams.get("id");

// Méthodes de gestion du localStorage

function addProduits(id, couleur, quantite) {
    let listeProduits = getProduits();

    let produitAAjouter = {
        id: id,
        quantite: quantite,
        couleur: couleur
    };

    listeProduits.push(produitAAjouter);

    saveProduits(listeProduits);
}
// Récupération les données du produit du localstorage
function getProduits() {
    let listeProduits = localStorage.getItem("listeProduits");
    if (listeProduits == null) {
        return [];
    } else {
        return JSON.parse(listeProduits);
    }
}
// Sauvegarde des infos dans localstorage
function saveProduits(listeProduits) {
    localStorage.setItem("listeProduits", JSON.stringify(listeProduits));
}
// Récupération de la couleur sélectionné dans le menu déroulant
function getCouleurSelectionee() {
    let elementSelecteurCouleur = document.getElementById("colors");
    let indexCouleurSelectionnee = elementSelecteurCouleur.options.selectedIndex;
    return elementSelecteurCouleur.options[indexCouleurSelectionnee].text;
}

// Appel Api avec l'id de la page du produit
fetch("http://localhost:3000/api/products/" + id)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (produit) {
        let id = produit._id;
        let image = produit.imageUrl;
        let imageAlt = produit.altTxt;
        let nom = produit.name;
        let prix = produit.price;
        let description = produit.description;
        let couleurs = produit.colors;

        // Modification du DOM - Ajout de l'image et alt 
        let elementConteneurImage = document.getElementsByClassName("item__img")[0];
        let elementImage = document.createElement("img");
        elementImage.src = image;
        elementImage.alt = imageAlt;
        elementConteneurImage.appendChild(elementImage);
        // Ajout du nom du produit
        let elementTitre = document.getElementById("title");
        elementTitre.innerHTML = nom;
        // Ajout du prix 
        let elementPrix = document.getElementById("price");
        elementPrix.innerHTML = prix;

        let elementDescription = document.getElementById("description");
        elementDescription.innerHTML = description;
        // Menu déroulant pour les options de couleurs
        for (let couleur of couleurs) {
            let elementColor = document.createElement("option");
            elementColor.innerHTML = couleur;
            document.getElementById("colors").appendChild(elementColor);
        }

        // Lorsque que l'on clique sur "ajouter au panier"
        let addCart = document.getElementById("addToCart");
        addCart.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            let couleur = getCouleurSelectionee();
            let quantite = document.getElementById("quantity").value;
            // Sélection de la couleur sinon alert
            if (couleur == "--SVP, choisissez une couleur --") {
                alert("Veuillez sélectionner une couleur");
            }
            // Sélection de la quantité sinon alerte
            if (quantite == 0) {
                alert("Veuillez choisir une quantité");
            }
            // Vérification si le produit avec le même Id et la même couleur est déjà dans le panier
            if (couleur != "--SVP, choisissez une couleur --" && parseInt(quantite) != 0) {
                ajoutAuPanier(id, couleur, quantite)
            }

        });

        // Vérification si article similaire dans le panier
        function ajoutAuPanier(id, couleur, quantite) {
            let panier = getProduits();
            if (panier.length == 0) {
                // Ajouter le produit tel quel au panier
                addProduits(id, couleur, quantite);
                //panier vide, on ajoute"
            } else {
                // On vérifie l'existence du produit dans le panier
                let produitAbsentDuPanier = true;
                for (let i in panier) {
                    if (panier[i].id === id && panier[i].couleur === couleur) {
                        // Le produit existe dans le panier, on met à jour la quantité
                        let nouvelleQuantite = parseInt(document.getElementById("quantity").value) + parseInt(panier[i].quantite);
                        let miseAJourProduit = {
                            id: id,
                            couleur: couleur,
                            quantite: nouvelleQuantite
                        }
                        panier.splice(i, 1, miseAJourProduit);
                        saveProduits(panier);
                        produitAbsentDuPanier = false;
                        // Produit identique, maj de la quantité;
                    }
                }
                if (produitAbsentDuPanier) {
                    // Le produit n'existe pas dans le panier, on l'ajoute
                    addProduits(id, couleur, quantite);
                    // Produit absent du panier, on l'ajoute
                }
            }
            alert("Ajouté !");
        }
    }
    );