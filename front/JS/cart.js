let stockage = localStorage.getItem("listeProduits");
let objJson = JSON.parse(stockage);

let total = 0;

// Modification quantité du panier

function calculQuantite() {
    let totalNombreArticle = 0;
    for (let totalArticle of objJson) {
        totalNombreArticle += parseInt(totalArticle.quantite);
    }

    let elementTotalQuantite = document.getElementById("totalQuantity");
    elementTotalQuantite.innerHTML = totalNombreArticle;
}
// Modification total du panier
function calculTotal() {
    let totalPrixArticle = 0;
    for (let produit of objJson) {
        let quantitePrix = parseInt(produit.quantite) * produit.prix;
        totalPrixArticle += quantitePrix
    }
    let elementTotalPrix = document.getElementById("totalPrice");
    elementTotalPrix.innerHTML = totalPrixArticle;
}

for (let i in objJson) {
    let produitPanier = objJson[i];
    let id = produitPanier.id;
    let couleurs = produitPanier.couleur;
    let quantite = produitPanier.quantite;

    fetch("http://localhost:3000/api/products/" + produitPanier.id)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (produitApi) {
            let image = produitApi.imageUrl;
            let imageAlt = produitApi.altTxt;
            let nom = produitApi.name;
            let prix = produitApi.price;

            objJson[i].prix = prix;

            let elementArticle = document.createElement("article");
            elementArticle.classList.add("cart__item");
            elementArticle.dataset.id = id;
            elementArticle.dataset.color = couleurs;

            // Image du produit
            let elementDivItemImage = document.createElement("div");
            elementDivItemImage.classList.add("cart__item__img");
            elementArticle.appendChild(elementDivItemImage);

            let elementImage = document.createElement("img");
            elementImage.src = image;
            elementImage.alt = imageAlt;
            elementDivItemImage.appendChild(elementImage);

            // Description du produit
            let elementDivItemContent = document.createElement("div");
            elementDivItemContent.classList.add("cart__item__content");
            elementArticle.appendChild(elementDivItemContent);

            let elementDivItemContentDescription = document.createElement("div");
            elementDivItemContentDescription.classList.add("cart__item__content__description");
            elementDivItemContent.appendChild(elementDivItemContentDescription);

            let elementTitre = document.createElement("h2");
            elementTitre.innerHTML = nom;
            elementDivItemContentDescription.appendChild(elementTitre);

            let elementColor = document.createElement("p");
            elementColor.innerHTML = couleurs;
            elementDivItemContentDescription.appendChild(elementColor);

            let elementPrix = document.createElement("p");
            elementPrix.innerHTML = prix + " €";
            elementDivItemContentDescription.appendChild(elementPrix);

            // Eléments indiquant la quantité
            let elementDivItemContentSettings = document.createElement("div");
            elementDivItemContentSettings.classList.add("cart__item__content__settings");
            elementDivItemContent.appendChild(elementDivItemContentSettings);

            let elementDivItemContentSettingsQuantity = document.createElement("div");
            elementDivItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
            elementDivItemContentSettings.appendChild(elementDivItemContentSettingsQuantity);

            let elementQuantite = document.createElement("p");
            elementQuantite.innerHTML = ("Qté : ");
            elementDivItemContentSettingsQuantity.appendChild(elementQuantite);

            let elementInput = document.createElement("input");
            elementInput.setAttribute("type", "number");
            elementInput.classList.add("itemQuantity");
            elementInput.setAttribute("name", "itemQuantity");
            elementInput.setAttribute("min", "1");
            elementInput.setAttribute("max", "100");
            elementInput.setAttribute("value", quantite);

            elementInput.addEventListener("change", function (event) {
                // Récupérer la nouvelle valeur de la quantité
                let nouvelleQuantite = event.target.value;

                // Avec element.closest, récupérer l'article HTML du produit
                let produitModifie = elementInput.closest(".cart__item");

                // Récupérer l'id et la couleur du produit concerné
                let idProduit = produitModifie.dataset.id;
                let couleurProduit = produitModifie.dataset.color;

                // Rechercher dans ton panier le produit qui a le même id et la même couleur
                for (let i in objJson) {
                    if (objJson[i].id == idProduit && objJson[i].couleur == couleurProduit) {
                        // Modifier la quantité du produit avec la nouvelle
                        objJson[i].quantite = nouvelleQuantite;
                    }
                }
                calculQuantite();
                calculTotal();

                // Enregistrer la nouvelle liste de produits (le panier) dans le local storage
                localStorage.setItem("listeProduits", JSON.stringify(objJson));
            })

            elementDivItemContentSettingsQuantity.appendChild(elementInput);

            // Bouton supprimer
            let elementDivItemContentSettingsDelete = document.createElement("div");
            elementDivItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
            elementDivItemContentSettings.appendChild(elementDivItemContentSettingsDelete);

            let elementSupprimer = document.createElement("p");
            elementSupprimer.innerHTML = ("Supprimer");
            elementSupprimer.classList.add("deleteItem");
            elementDivItemContentSettingsDelete.appendChild(elementSupprimer);

            document.getElementById("cart__items").appendChild(elementArticle);

            // Suppression d'un article
            elementSupprimer.addEventListener("click", function () {
                let elementDeSuppression = elementSupprimer.closest(".deleteItem");
                let idProduit = elementDeSuppression.dataset.id;
                let couleurProduit = elementDeSuppression.dataset.color;
                let indexDuProduitASupprimer;

                for (let i in objJson) {
                    if (objJson[i].id == idProduit && objJson[i].couleur == couleurProduit) {
                        indexDuProduitASupprimer == i;
                    }
                }
                // Splice sur l'index du produit
                objJson.splice(indexDuProduitASupprimer, 1);

                // Supprime l'élement HTML
                document.getElementById("cart__items").removeChild(elementArticle);

                // Calcul du panier
                calculQuantite();
                calculTotal();

                // Enregistrer la nouvelle liste de produits (le panier) dans le local storage
                localStorage.setItem("listeProduits", JSON.stringify(objJson));
            })

            // TOTAL PRIX
            let totalPrixArticle = prix * quantite;
            total += totalPrixArticle;
            let elementTotalPrix = document.getElementById("totalPrice");
            elementTotalPrix.innerHTML = total;
        })
}

// TOTAL ARTICLE
calculQuantite();

// Validation des données utilisateurs

let prenom = document.getElementById("firstName");
let erreurPrenom = document.getElementById("firstNameErrorMsg");
let nom = document.getElementById("lastName");
let erreurNom = document.getElementById("lastNameErrorMsg");
let adresse = document.getElementById("address");
let erreurAdresse = document.getElementById("addressErrorMsg");
let ville = document.getElementById("city");
let erreurVille = document.getElementById("cityErrorMsg");
let email = document.getElementById("email");
let erreurEmail = document.getElementById("emailErrorMsg");
let inputCommander = document.getElementById("order");

// Requête POST sur API pour récupérer l'identifiant de la commande 

function envoie() {
    // Objet avec le contenu du formulaire
    let contact = {
        firstName: prenom.value,
        lastName: nom.value,
        address: adresse.value,
        city: ville.value,
        email: email.value
    };
    // Tableau des produits
    let idProduits = [];
    // Ajout des id des produits dans le tableau des produits 
    for (let i in objJson) {
        idProduits.push(objJson[i].id);
    };

    // Objet contenant le formulaire et les id des produits du panier
    let commande = {
        contact: contact,
        products: idProduits
    };
    // Requête POST sur l'API 
    fetch("http://localhost:3000/api/products/order", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commande),
    })
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (reponseOrder) {
            let orderId = reponseOrder.orderId;
            window.location.href = "confirmation.html?orderId=" + orderId;
        }
        )
}

inputCommander.addEventListener("click", function (event) {

    let erreur = false;

    // Validation prénom
    erreurPrenom.innerHTML = " ";
    if (!/^[A-zÀ-ÿ -]+$/.test(prenom.value)) {
        erreurPrenom.innerHTML = "Le champ de saisie n'est pas valide";
        erreur = true;
    }
    // Validation nom
    erreurNom.innerHTML = " ";
    if (!/^[A-zÀ-ÿ -]+$/.test(nom.value)) {
        erreurNom.innerHTML = "Le champs de saisi n'est pas valide";
        erreur = true;
    }
    // Validation adresse
    erreurAdresse.innerHTML = " ";
    if (!/^[A-zÀ-ÿ0-9 ,-]+$/.test(adresse.value)) {
        erreurAdresse.innerHTML = "Le champs de saisi n'est pas valide";
        erreur = true;
    }
    // Validation ville
    erreurVille.innerHTML = " ";
    if (!/^[A-zÀ-ÿ -]+$/.test(ville.value)) {
        erreurVille.innerHTML = "Le champs de saisi n'est pas valide";
        erreur = true;
    }
    // Validation email
    erreurEmail.innerHTML = " ";
    if (!/^.+@.+\..+$/.test(email.value)) {
        erreurEmail.innerHTML = "Le champs de saisi n'est pas valide ";
        erreur = true;
    }

    // TODO faire l'envoi
    if(erreur == false) {
        envoie();
    }
})

// Objet créé avec les données du formulaire

document.getElementsByClassName("cart__order__form")[0].addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();
});
//window.location.href="" 

