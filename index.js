var latlng;
var lingua = "Italiano";
var geocoder;
var online = false;
const errors = {1: "PERMISSION_DENIED", 2: "POSITION_UNAVAILABLE", 3:"TIMEOUT"};

/**
 * Funzione chiamata dalle Google Maps API per settare la posizione.
 */
function init() {
    geocoder = new google.maps.Geocoder;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
            impostaLingua();
            online = true;
        }, failedPosition);
    } else {
        window.alert("Geolocation is not supported by this browser.");
        failedPosition(null);
    }
    console.log("init");
}

/**
 * Funzione chiamata in caso di fallimento di {@link navigator.geolocation.getCurrentPosition}
 * @param error
 */
function failedPosition(error) {
    $.get("http://ipinfo.io", function (response) {
        console.log(response);
        $("#qui").html(response.loc + ", " + response.city + ", " + response.country);
        if (response.country !== "IT") {
            lingua = "English";
            $('div[lang="eng"]').show();
            $('div[lang="ita"]').hide();
        }
        $('select option[value='+ lingua +']').attr("selected",true);
        $("#form").show();
    }, "jsonp").fail(function () {
        if (error !== null)
            $("#qui").html("<i>Posizione non accessibile a causa di " + error.constructor.name + "." + errors[error.code] + "</i>");
        else
            $("#qui").html("<i>Posizione non accessibile</i>");
        $("#form").show();
    });
    online = true;
}

/**
 * Imposta la lingua in base alla posizione ottenuta con Geolocation,
 * facendo reverse geocoding tramite le API di Google Maps.
 */
function impostaLingua() {
    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                var types = ["country", "political"];
                for (var i=0; i<results[0].address_components.length; i++) {
                    var tipi = results[0].address_components[i].types;
                    var is_same = tipi.length === types.length && tipi.every(function(element, index) {
                        return element === types[index];
                    });
                    if (is_same) {
                        var stato = results[0].address_components[i].long_name;
                        break;
                    }
                }
                console.log("Stato: " + stato);
                console.log("lingua: " + lingua);
                if (stato !== "Italia") {
                    lingua = "English";
                    $('div[lang="eng"]').show();
                    $('div[lang="ita"]').hide();
                }

                //mostra la posizione, imposta la lingua corretta nel menu a tendina e mostra il form che lo contiene
                $("#qui").html("lat " + latlng.lat + ", lng " + latlng.lng + "<br>" + results[0].formatted_address);
                $('select option[value='+ lingua +']').attr("selected",true);
                $("#form").show();
                return true;
            } else {
                window.alert('No results found');
                $("#qui").html("<i>Posizione non accessibile</i>");
                $("#form").show();
                return false;
            }
        } else {
            //se la posizione non è stata trovata, mostra un avviso e il form per permettere all'utente di sceglierla
            window.alert('Geocoder failed due to: ' + status);
            $("#qui").html("<i>Posizione non accessibile</i>");
            $("#form").show();
            return false;
        }
    });
}

$(document).ready(function () {
    //Se viene aperto il sito in locale e la connessione a internet non è disponibile,
    // mostra il form per permettere all'utente di scegliere la lingua e andare avanti
    if (!online) {
        $("#qui").html("<i>Posizione non accessibile: sei offline</i>");
        $("#form").show();
        console.log("offline");
    }

    //Cliccando sull'immagine dell'altoparlante il suono viene attivato/disattivato
    $("#sound").click(function () {
        var valore = $("#form input[type=hidden]").val();
        if (valore === "on") {
            $("#sound img").attr("src", "resources/immagini/no sound 2.png");
            $("#form input[type=hidden]").val("off");
        } else if (valore === "off") {
            $("#sound img").attr("src", "resources/immagini/sound.png");
            $("#form input[type=hidden]").val("on");
        }
    });

    //Mostra la finestra dei credits
    $("#credits").click(function () {
        $("#finestra-credits").show().children().show();
    });

    //Mostra la finestra about
    $("#about").click(function () {
        $("#finestra-about").show().children().show();
    });

    //Chiude la finestra aperta
    $(".close").click(nascondiModal);

    //Quando l'utente clicca fuori dal modal, chiudilo
    var modal1 = document.getElementById("finestra-credits");
    var modal2 = document.getElementById("finestra-about");
    window.onclick = function(event) {
        if (event.target === modal1 || event.target === modal2) {
            nascondiModal();
        }
    };

    /**
     * Esegue l'animazione di chiusura del modal.
     */
    function nascondiModal() {
        $(".modal-content").animate({
            left:"100vw",
            opacity:0
        }, "slow", function () {
            $(".modal-content").hide().css({
                left:0,
                opacity:1
            });
        });
        $(".modal").animate({
            opacity:0
        }, "slow", function () {
            $(".modal").hide().css({
                opacity:1
            });
        });
    }

    //Cambia la lingua corrente in base alla scelta selezionata dall'utente.
    $("select[name='lingua']").change(function (e) {
        if (e.target.value === "Italiano") {
            $('div[lang="eng"]').hide();
            $('div[lang="ita"]').show();
            console.log("passa ad italiano");
        } else {
            $('div[lang="eng"]').show();
            $('div[lang="ita"]').hide();
            console.log("passa ad inglese");
        }
    });

});