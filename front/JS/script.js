// Variable du lien de l'API
let url = "http://localhost:3000/api/products";
// Récupération des données de l'API
fetch(url)
    // Si la requête est OK
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    // Récupération des valeurs des données de l'API
    .then(function (produits) {
        for (let i in produits) {
            let produit = produits[i];
            let id = produit._id;
            let image = produit.imageUrl;
            let imageAlt = produit.altTxt;
            let nom = produit.name;
            let description = produit.description;
            // Création lien
            let elementLien = document.createElement("a");
            elementLien.href = "./product.html?id=" + id;
            // Création article
            let elementArticle = document.createElement("article");
            elementLien.appendChild(elementArticle);
            // Ajout de l'image et son alt
            let elementImage = document.createElement("img");
            elementImage.src = (image);
            elementImage.alt = (imageAlt);
            elementArticle.appendChild(elementImage);
            // Titre
            let elementTitre = document.createElement("h3");
            elementTitre.innerHTML = (nom);
            elementTitre.classList.add("productName");
            elementArticle.appendChild(elementTitre);
            // Déscription du produit
            let elementDescription = document.createElement("p");
            elementDescription.innerHTML = (description);
            elementDescription.classList.add("productDescription");
            elementArticle.appendChild(elementDescription);

            document.getElementById("items").appendChild(elementLien);
        }
    })
    // Si la réquête n'est pas OK, elle affiche un message d'erreur 
    .catch(function () {
        document.getElementById("items").innerHTML = "Une erreur s'est produite";
    });
