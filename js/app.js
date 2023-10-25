
// ELEMENTOS DEL FORMULARIO ////////////////////
const form = document.getElementById("shorten_form");
const inputURL = document.getElementById("url");
const submit_button = document.getElementById("submit_button");
const urlCardContainer = document.getElementById("url_card_container");

// si existe localStorage, pon cada card en el contenedor //////////////////////////////////
if (localStorage.cards) {
    urlCardContainer.innerHTML = localStorage.cards;    
}


form.addEventListener("submit", (e) => {
    //evitar la recarga al subir el formulario
    e.preventDefault();
    let userUrl = inputURL.value;

    // SI EL FORMULARIO ESTÁ VACIO MARCA ERROR////////////////////////////////////////
    if (userUrl == "") {
        form.classList.add("error");
        submit_button.disabled = true;
    } else {
        // OBTENIENDO LA URL /////////////////////////
        const apiUrl = "https://api.shrtco.de/v2/shorten?url=";
        let url = apiUrl + userUrl;


        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((shortenUrlObject) => {
                // CREANDO EL COMPONENTE DE LA URL ///////////////////
                const urlCard = document.createElement("div");
                const ogUrlSpan = document.createElement("span");
                const btn__container = document.createElement("div");
                const shortUrlSpan = document.createElement("a");
                const clipboardBtn = document.createElement("button");
               
                // AÑADIENDO CLASES A LOS COMPONENTES CREADOS
                urlCard.classList.add("url__card");
                clipboardBtn.classList.add("cpbd__btn");
                btn__container.classList.add("btn__container");

                // SI LA URL ES LARGA, ACORTARLA PARA MOSTRARLA EN LA CARD//////////////////
                if (userUrl.length > 25) {
                    userUrl = userUrl.slice(0, 26);
                    userUrl = userUrl + "...";
                    ogUrlSpan.innerText = userUrl;
                } else ogUrlSpan.innerText = userUrl;

                // AÑADIENDO EL TEXTO DE CADA PARTE DEL COMPONENTE //////////////////////////////
                shortUrlSpan.innerText = shortenUrlObject.result.short_link;
                shortUrlSpan.href = shortenUrlObject.result.full_short_link;
                clipboardBtn.innerHTML = "Copy";

                // ARMANDO LA URL CARD/////////////////////////////////////////
                btn__container.append(shortUrlSpan, clipboardBtn);
                urlCard.append(ogUrlSpan);
                urlCard.append(btn__container);

                // AÑADIENDO LA URL CARD CREADA AL CONTENEDOR /////////////////
                urlCardContainer.append(urlCard);

                //AÑADIENDO EVENTO AL BOTÓN DE COPIADO ///////////////
                clipboardBtn.addEventListener("click", (e) => {
                    navigator.clipboard
                        .writeText(shortenUrlObject.result.short_link)
                        .then(() => {
                            console.log("copied!");
                        })
                        .catch((e) => console.log("Error:", e));
                    e.target.classList.add("copied");
                    e.target.innerText = "Copied!";
                });


                // AÑADIR CONTENIDO DEL CONTENEDOR AL LOCAL STORAGE ////////////////////
                if (!localStorage.cards) localStorage.cards = "";
                localStorage.cards += urlCardContainer.innerHTML;
            });
    }
});

inputURL.addEventListener("input", (e) => {
    // SI EL CAMPO ESTÁ VACIO, MUESTRA ERROR ///////////////////////////
    let userUrl = e.target.value;
    if (userUrl == "") {
        form.classList.add("error");
        form.classList.add("empty");
        submit_button.disabled = true;
    } else {
        form.classList.remove("error");
        form.classList.remove("empty");
        submit_button.disabled = false;
    }
});

