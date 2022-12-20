let url = new URL(window.location.href);
let id = url.searchParams.get("orderId");

let commendeId = document.getElementById("orderId");
commendeId.innerHTML = id;

