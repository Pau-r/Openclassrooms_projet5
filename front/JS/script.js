fetch("http://localhost:3000/api/products")
.then(function(res){
    if (res.ok) {
        return res.json();
    }
})
.then(function(produits) {
    for (let i = 0; i < produits.length; i++) {
        let image = produits[i].imageUrl;
        let imageAlt = produits[i].altTxt;
        let nom = produits[i].name;
        let description = produits[i].description;

        let elementLien = document.createElement("a");
        elementLien.href = "./product.html?id=42";

        let elementArticle = document.createElement("article");
        elementLien.appendChild(elementArticle);

        let elementImage = document.createElement("img");
        elementImage.src = (image);
        elementImage.alt = (imageAlt);
        elementArticle.appendChild(elementImage);

        let elementTitre = document.createElement("h3");
        elementTitre.innerHTML = (nom);
        elementTitre.classList.add("productName");
        elementArticle.appendChild(elementTitre);

        let elementDescription = document.createElement("p");
        elementDescription.innerHTML = (description);
        elementDescription.classList.add("productDescription");
        elementArticle.appendChild(elementDescription);
        
       document.getElementById("items").appendChild(elementLien);

    }
});