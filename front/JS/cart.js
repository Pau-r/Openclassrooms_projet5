let stockage = localStorage.getItem("listeProduits");
let objJson = JSON.parse(stockage);

let total = 0;

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

            // IMAGE
            let elementDivItemImage = document.createElement("div");
            elementDivItemImage.classList.add("cart__item__img");
            elementArticle.appendChild(elementDivItemImage);

            let elementImage = document.createElement("img");
            elementImage.src = image;
            elementImage.alt = imageAlt;
            elementDivItemImage.appendChild(elementImage);

            // DESCRIPTION
            let elementDivItemContent = document.createElement("div");
            elementDivItemContent.classList.add("cart__item__content");
            elementArticle.appendChild(elementDivItemContent);

            let elementDivItemContentDescription = document.createElement("div");
            elementDivItemContentDescription.classList.add("cart__item__content__description");
            elementArticle.appendChild(elementDivItemContentDescription);

            let elementTitre = document.createElement("h2");
            elementTitre.innerHTML = nom;
            elementDivItemContentDescription.appendChild(elementTitre);

            let elementColor = document.createElement("p");
            elementColor.innerHTML = couleurs;
            elementDivItemContentDescription.appendChild(elementColor);

            let elementPrix = document.createElement("p");
            elementPrix.innerHTML = prix + " €";
            elementDivItemContentDescription.appendChild(elementPrix);

            // QUANTITE
            let elementDivItemContentSettings = document.createElement("div");
            elementDivItemContentSettings.classList.add("cart__item__content__settings");
            elementArticle.appendChild(elementDivItemContentSettings);

            let elementDivItemContentSettingsQuantity = document.createElement("div");
            elementDivItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
            elementDivItemContentSettings.appendChild(elementDivItemContentSettingsQuantity);

            let elementQuantite = document.createElement("p");
            elementQuantite.innerHTML = ("Qté : ");
            elementDivItemContentSettingsQuantity.appendChild(elementQuantite);

            let elementInput = document.createElement("input");
            elementInput.classList.add("itemQuantity");
            elementInput.setAttribute("type", "number");
            elementInput.setAttribute("name", "itemQuantity");
            elementInput.setAttribute("min", "1");
            elementInput.setAttribute("max", "100");
            elementInput.setAttribute("value", quantite);
            elementDivItemContentSettingsQuantity.appendChild(elementInput);

            // SUPPRIMER
            let elementDivItemContentSettingsDelete = document.createElement("div");
            elementDivItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
            elementArticle.appendChild(elementDivItemContentSettingsDelete);

            let elementSupprimer = document.createElement("p");
            elementSupprimer.innerHTML = ("Supprimer");
            elementSupprimer.classList.add("deleteItem");
            elementDivItemContentSettingsDelete.appendChild(elementSupprimer);

            document.getElementById("cart__items").appendChild(elementArticle);

            // TOTAL PRIX
            let totalPrixArticle = prix * quantite;
            total += totalPrixArticle;
            let elementTotalPrix = document.getElementById("totalPrice");
            elementTotalPrix.innerHTML = total;
        })
}

// TOTAL ARTICLE
let totalNombreArticle = 0;
for (let totalArticle of objJson) {
    totalNombreArticle += parseInt(totalArticle.quantite);
}

let elementTotalQuantite = document.getElementById("totalQuantity");
elementTotalQuantite.innerHTML = totalNombreArticle;