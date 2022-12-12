    let id = cart._id;
    let image = cart.imageUrl;
    let imageAlt = cart.altTxt;
    let nom = cart.name;
    let prix = cart.price;
    let couleurs = cart.colors;

    let elementArticle = document.createElement("article");
    elementArticle.classList.add("cart__item");
    console.log(elementArticle);

    let elementDivItemImage = document.createElement("div");
    elementDivItemImage.classList.add("cart__item__img");
    elementArticle.appendChild(elementDivItemImage);

    let elementImage = document.createElement("img");
        elementImage.src = (image);
        elementImage.alt = (imageAlt);
        elementDivItemImage.appendChild(elementImage);

    let elementDivItemContent = document.createElement("div");
    elementDivItemContent.classList.add("cart__item__content");
    elementArticle.appendChild(elementDivItemContent);

    let elementDivItemContentDescription = document.createElement("div");
    elementDivItemContentDescription.classList.add("cart__item__content__description");
    elementArticle.appendChild(elementDivItemContentDescription);

    let elementTitre = document.createElement("h2");
    elementTitre.innerHTML = (nom);
    elementDivItemContentDescription.appendChild(elementTitre);

    let elementColor = document.createElement("p");
    elementColor.innerHTML = (couleurs);
    elementDivItemContentDescription.appendChild(elementColor);

    let elementPrix = document.createElement("p");
    elementColor.innerHTML = (prix);
    elementDivItemContentDescription.appendChild(elementPrix);

    let elementDivItemContentSettings = document.createElement("div");
    elementDivItemContentSettings.classList.add("cart__item__content__settings");
    elementArticle.appendChild(elementDivItemContentSettings);

    let elementDivItemContentSettingsQuantity = document.createElement("div");
    elementDivItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
    elementDivItemContentSettings.appendChild(elementDivItemContentSettingsQuantity);

    let elementQuantite = document.createElement("p");
    elementColor.innerHTML = ("Qté : "  );
    elementDivItemContentSettingsQuantity.appendChild(elementQuantite);

    let elementInput = document.createElement("input");
    elementInput.classList.add("itemQuantity");
    elementInput.setAttribute("type", "number");
    elementInput.setAttribute("name", "itemQuantity");
    elementInput.setAttribute("min", "1");
    elementInput.setAttribute("max", "100");
    elementInput.setAttribute("value", "42");
    elementDivItemContentSettingsQuantity.appendChild(elementInput);

    let elementDivItemContentSettingsDelete = document.createElement("div");
    elementDivItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
    elementArticle.appendChild(elementDivItemContentSettingsDelete);

    let elementSupprimer = document.createElement("p");
    elementSupprimer.innerHTML = ("Supprimer");
    elementSupprimer.classList.add("deleteItem");
    elementDivItemContentSettingsDelete.appendChild(elementSupprimer);

    document.getElementById("cart__items").appendChild(elementArticle);

