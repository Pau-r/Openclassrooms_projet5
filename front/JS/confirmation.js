// Objet URL permet d'accéder au composant de l'url
let url = new URL(window.location.href);
// Récupération de l'id dans les paramètres de l'URL pour récupérer le numéro de commande
let id = url.searchParams.get("orderId");

// Affichage du numéro de commande
let commendeId = document.getElementById("orderId");
commendeId.innerHTML = id;

