//
let url = new URL(window.location.href);
//
let id = url.searchParams.get("orderId");

// Affichage du numéro de commande
let commendeId = document.getElementById("orderId");
commendeId.innerHTML = id;

