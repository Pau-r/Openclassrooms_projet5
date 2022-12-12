let url = new URL(window.location.href);
let id = url.searchParams.get("id");

// TODO mettre les méthodes de gestion du localStorage ici

function addProduits (id, couleur, quantite) {
    let listeProduits = getProduits();
    
    let produitAAjouter = {
        id: id,
        quantite: quantite,
        couleur: couleur
    };

    listeProduits.push(produitAAjouter);
    
    saveProduits(listeProduits);
}

function getProduits (){
    let listeProduits = localStorage.getItem("listeProduits");
    if(listeProduits == null){
        return [];
    }else{
        return JSON.parse(listeProduits);
    }
}

function saveProduits(listeProduits){
    localStorage.setItem("listeProduits",JSON.stringify(listeProduits));
}

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

        let elementConteneurImage = document.getElementsByClassName("item__img")[0];
        let elementImage = document.createElement("img");
        elementImage.src = image;
        elementImage.alt = imageAlt;
        elementConteneurImage.appendChild(elementImage);

        let elementTitre = document.getElementById("title");
        elementTitre.innerHTML = nom;

        let elementPrix = document.getElementById("price");
        elementPrix.innerHTML = prix;

        let elementDescription = document.getElementById("description")
        elementDescription.innerHTML = description;

        for (let couleur of couleurs) {
            let elementColor = document.createElement("option");
            elementColor.innerHTML = couleur;
            document.getElementById("colors").appendChild(elementColor);
        }

        
        let addCart = document.getElementById("addToCart");

        addCart.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            let elementSelecteurCouleur = document.getElementById("colors");
            let indexCouleurSelectionnee = elementSelecteurCouleur.options.selectedIndex;
            let couleur = elementSelecteurCouleur.options[indexCouleurSelectionnee].text;
            let quantite = document.getElementById("quantity").value;

        if (couleur == "--SVP, choisissez une couleur --"){
            alert("Veuillez sélectionner une couleur");
        }
        if (quantite == 0 ){
            alert("Veuillez choisir une quantité");
        }
        else {

           addProduits(id, couleur, quantite);
            // addProduits(couleur, 1);
            //let 
        }

           



        /** 
            


       
            let produitAAjouter = {
                id: produit._id,
                quantite: 1,
                couleur: couleur
            };*/

        });
    }
    );