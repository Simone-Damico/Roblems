var speed;
const lingueISO = {"Italiano": "it", "English": "en"};
var testi;
var lingua;
var volume;

//Crea l'oggetto con i testi del sito a partire dal file testi.json
parseTesti();

$(document).ready(function () {
    console.log("ready");

    //Popola il DOM con i testi nella lingua scelta dall'utente
    popolaDOM();

    //Associa le opportune funzioni all'evento click dei bottoni

    //bottoni per proseguire con la storia
    $("#bott_avanti_1").click("sect_intro", avanti);
    $("#bott_avanti_2").click("esito_motociclista", avanti);
    $("#bott_avanti_3").click("esito_alcolizzata", avanti);
    $("#bott_avanti_4").click("esito_tunnel", avanti);
    $("#bott_avanti_5").click("esito_colpa", avanti);
    $("#bott_avanti_6").click("esito_diritti", avanti);

    //bottoni per la scelta del dilemma motociclista
    $("#bott_casco").click("sect_motociclista", funz_casco);
    $("#bott_nocasco").click("sect_motociclista", funz_nocasco);
    $("#bott_frena").click("sect_motociclista", funz_frena);
    $("#bott_ignora").click("sect_motociclista", funz_ignora);

    //bottoni per la scelta del dilemma colpa
    $("#bott_sviluppatore").click("sect_colpa", funz_sviluppatore);
    $("#bott_proprietario").click("sect_colpa", funz_proprietario);
    $("#bott_robot").click("sect_colpa", funz_robot);

    //bottoni per la scelta del dilemma alcolizzata
    $("#bott_padrona").click("sect_alcolizzata", funz_padrona);
    $("#bott_dottore").click("sect_alcolizzata", funz_dottore);
    $("#bott_ognitanto").click("sect_alcolizzata", funz_ognitanto);

    //bottoni per la scelta del dilemma diritti
    $("#bott_si").click("sect_diritti", funz_si);
    $("#bott_no").click("sect_diritti", funz_no);

    //bottoni per la scelta del dilemma tunnel
    $("#bott_bambino").click("sect_tunnel", funz_bambino);
    $("#bott_autista").click("sect_tunnel", funz_autista);

    //Fa comparire l'introduzione e avvia il relativo audio
    var testoSelezionato = testi[lingua].p.sect_intro;
    digita(testoSelezionato, "#sect_intro p");
    if (volume === "on") {
        var msg = new SpeechSynthesisUtterance(testoSelezionato);
        msg.lang = lingueISO[lingua];
        window.speechSynthesis.speak(msg);
    } else {
        console.log("volume off");
    }
});

/**
 * Disattiva i bottoni della sezione passata come parametro e mostra la sezione successiva.
 * Se c'è un testo nella sezione successiva, ne avvia l'animazione e la riproduzione.
 * @param sect: la sezione corrente
 */
function avanti(sect) {
    const sezione = sect.data;
    $("#" + sezione + " button").attr("disabled", "true");
    $("#" + sezione + " + section").show(function () {
        var par = "#" + $(this).attr("id") + " p";
        if ($(par).length !== 0) {
            var testoSelezionato = testi[lingua].p[$(this).attr("id")];
            digita(testoSelezionato, "#" + $(this).attr("id") + " p");
            if (volume === "on") {
                var msg = new SpeechSynthesisUtterance(testoSelezionato);
                msg.lang = lingueISO[lingua];
                window.speechSynthesis.speak(msg);
            } else {
                console.log("volume off");
            }
        }
    });
}

/**
 * Va dalla sezione passata come parametro a quella successiva, con le animazioni.
 * Gestisce l'animazione relativa alla scelta effettuata dall'utente.
 * @param sezione: la sezione corrente con i bottoni per le scelte dell'utente.
 */
function funz_casco(sezione) {
    avanti(sezione);
    $("#scelta_motociclista").text(testi[lingua].h3.casco);

    $("#img_macchina").transition({x:-490, y:-100, rotate: '45deg', delay:2000}, 1000);
    $("#img_casco").transition({y:+70, delay:2000}, "slow");
    $("#img_nocasco").transition({y:-70, delay:2000}, "slow");

}

/**
 * Va dalla sezione passata come parametro a quella successiva, con le animazioni.
 * Gestisce l'animazione relativa alla scelta effettuata dall'utente.
 * @param sezione: la sezione corrente con i bottoni per le scelte dell'utente.
 */
function funz_nocasco(sezione) {
    avanti(sezione);
    $("#scelta_motociclista").text(testi[lingua].h3.nocasco);

    $("#img_macchina").transition({x:-730, y:+100, rotate: '-30deg', delay:2000}, 1000);
    $("#img_casco").transition({y:+70, delay:2000}, "slow");
    $("#img_nocasco").transition({y:-70, delay:2000}, "slow");
}

/**
 * Va dalla sezione passata come parametro a quella successiva, con le animazioni.
 * Gestisce l'animazione relativa alla scelta effettuata dall'utente.
 * @param sezione: la sezione corrente con i bottoni per le scelte dell'utente.
 */
function funz_frena(sezione) {
    avanti(sezione);
    $("#scelta_motociclista").text(testi[lingua].h3.frena);

    $("#img_macchina").transition({x:-700, delay:2000}, 1000);
    $("#img_casco").transition({y:+70, delay:2000}, "slow");
    $("#img_nocasco").transition({y:-70, delay:2000}, "slow");
}

/**
 * Va dalla sezione passata come parametro a quella successiva, con le animazioni.
 * Gestisce l'animazione relativa alla scelta effettuata dall'utente: decide in modo randomico se colpire
 * il motociclista con il casco o quello senza.
 * @param sezione: la sezione corrente con i bottoni per le scelte dell'utente.
 */
function funz_ignora(sezione) {
    avanti(sezione);
    $("#scelta_motociclista").text(testi[lingua].h3.ignora);

    if (Math.random() > 0.5) {
        //prendi quello col casco
        $("#img_macchina").transition({x:-490, y:-100, rotate: '45deg', delay:2000}, 1000);
        $("#img_casco").transition({y:+70, delay:2000}, "slow");
        $("#img_nocasco").transition({y:-70, delay:2000}, "slow");
    } else {
        //prendi quello senza casco
        $("#img_macchina").transition({x:-730, y:+100, rotate: '-30deg', delay:2000}, 1000);
        $("#img_casco").transition({y:+70, delay:2000}, "slow");
        $("#img_nocasco").transition({y:-70, delay:2000}, "slow");
    }
}

/**
 * Va dalla sezione passata come parametro a quella successiva, con le animazioni.
 * Gestisce l'animazione relativa alla scelta effettuata dall'utente.
 * @param sezione: la sezione corrente con i bottoni per le scelte dell'utente.
 */
function funz_padrona(sezione) {
    avanti(sezione);
    $("#scelta_alcolizzata").text(testi[lingua].h3.padrona);

    $("#img_vecchiavino").hide();
    $("#img_robotnovino").hide();

    $("#div-robot").transition({x:-600, delay:2000}, 2000, function () {
        $("#img_vecchianovino").hide();
        $("#img_vecchiavino").show();
        $("#img_robotvino").hide();
        $("#img_robotnovino").show().transition({transform: "scaleX(-1)"});
    }).transition({x:0}, 2000, function () {
        $("#img_vecchiavino").hide();
        $("#img_vecchianovino").show();
        $("#img_robotnovino").hide();
        $("#img_robotvino").show().transition({transform: "scaleX(+1)"});
    }).transition({x:-600}, 2000, function () {
        $("#img_vecchianovino").hide();
        $("#img_vecchiavino").show();
        $("#img_robotvino").hide();
        $("#img_robotnovino").show().transition({transform: "scaleX(-1)"});
    }).transition({x:0}, 2000, function () {
        $("#img_vecchiavino").hide();
        $("#img_vecchianovino").show();
        $("#img_robotnovino").hide();
        $("#img_robotvino").show().transition({transform: "scaleX(+1)"});
    }).transition({x:-600}, 2000, function () {
        $("#img_vecchianovino").hide();
        $("#img_vecchiavino").show();
        $("#img_robotvino").hide();
        $("#img_robotnovino").show().transition({transform: "scaleX(-1)"});
    }).transition({x:0}, 2000, function () {
        $("#img_vecchiavino").hide();
        $("#img_vecchianovino").show();
        $("#img_robotnovino").hide();
        $("#img_robotvino").show().transition({transform: "scaleX(+1)"});
    });
}

/**
 * Va dalla sezione passata come parametro a quella successiva, con le animazioni.
 * Gestisce l'animazione relativa alla scelta effettuata dall'utente.
 * @param sezione: la sezione corrente con i bottoni per le scelte dell'utente.
 */
function funz_dottore(sezione) {
    avanti(sezione);
    $("#scelta_alcolizzata").text(testi[lingua].h3.dottore);

    $("#img_vecchiavino").hide();
    $("#img_robotvino").hide();

    $("#div-robot").transition({x:-600, delay:2000}, 2000, function () {
        $("#img_robotnovino").transition({transform: "scaleX(-1)"});
    }).transition({x:0}, 2000, function () {
        $("#img_robotnovino").transition({transform: "scaleX(+1)"});
    }).transition({x:-600}, 2000, function () {
        $("#img_robotnovino").transition({transform: "scaleX(-1)"});
    }).transition({x:0}, 2000, function () {
        $("#img_robotnovino").transition({transform: "scaleX(+1)"});
    }).transition({x:-600}, 2000, function () {
        $("#img_robotnovino").transition({transform: "scaleX(-1)"});
    }).transition({x:0}, 2000, function () {
        $("#img_robotnovino").transition({transform: "scaleX(+1)"});
    });
}

/**
 * Va dalla sezione passata come parametro a quella successiva, con le animazioni.
 * Gestisce l'animazione relativa alla scelta effettuata dall'utente: il robot soddisfa una volta la padrona e
 * due Bob e il dottore.
 * @param sezione: la sezione corrente con i bottoni per le scelte dell'utente.
 */
function funz_ognitanto(sezione) {
    avanti(sezione);
    $("#scelta_alcolizzata").text(testi[lingua].h3.ognitanto);

    $("#img_vecchiavino").hide();
    $("#img_robotvino").hide();

    $("#div-robot").transition({x:-600, delay:2000}, 2000, function () {
        $("#img_robotnovino").transition({transform: "scaleX(-1)"});
    }).transition({x:0}, 2000, function () {
        $("#img_robotnovino").hide();
        $("#img_robotvino").show().transition({transform: "scaleX(+1)"});

    }).transition({x:-600}, 2000, function () {
        $("#img_vecchianovino").hide();
        $("#img_vecchiavino").show();
        $("#img_robotvino").hide();
        $("#img_robotnovino").show().transition({transform: "scaleX(-1)"});
    }).transition({x:0}, 2000, function () {
        $("#img_vecchiavino").hide();
        $("#img_vecchianovino").show();
        $("#img_robotnovino").transition({transform: "scaleX(+1)"});

    }).transition({x:-600}, 2000, function () {
        $("#img_robotnovino").transition({transform: "scaleX(-1)"});
    }).transition({x:0}, 2000, function () {
        $("#img_robotnovino").hide();
        $("#img_robotvino").show().transition({transform: "scaleX(+1)"});
    });
}

/**
 * Va dalla sezione passata come parametro a quella successiva, con le animazioni.
 * Gestisce l'animazione relativa alla scelta effettuata dall'utente.
 * @param sezione: la sezione corrente con i bottoni per le scelte dell'utente.
 */
function funz_sviluppatore(sezione) {
    avanti(sezione);
    $("#scelta_colpa").text(testi[lingua].h3.sviluppatore);

    var pos1 = $("#img_sviluppatore").css("left");
    setTimeout(function() {
        $("#img_croce_colpa").css("left", pos1).slideDown();
    }, 1000);
}

/**
 * Va dalla sezione passata come parametro a quella successiva, con le animazioni.
 * Gestisce l'animazione relativa alla scelta effettuata dall'utente.
 * @param sezione: la sezione corrente con i bottoni per le scelte dell'utente.
 */
function funz_proprietario(sezione) {
    avanti(sezione);
    $("#scelta_colpa").text(testi[lingua].h3.proprietario);

    var pos1 = $("#img_proprietario").css("left");
    setTimeout(function() {
        $("#img_croce_colpa").css("left", pos1).slideDown();
    }, 1000);
}

/**
 * Va dalla sezione passata come parametro a quella successiva, con le animazioni.
 * Gestisce l'animazione relativa alla scelta effettuata dall'utente.
 * @param sezione: la sezione corrente con i bottoni per le scelte dell'utente.
 */
function funz_robot(sezione) {
    avanti(sezione);
    $("#scelta_colpa").text(testi[lingua].h3.robot);

    setTimeout(function() {
        $("#img_croce_colpa").css("left", 576).slideDown();
    }, 1000);
}

/**
 * Va dalla sezione passata come parametro a quella successiva, con le animazioni.
 * Gestisce l'animazione relativa alla scelta effettuata dall'utente.
 * @param sezione: la sezione corrente con i bottoni per le scelte dell'utente.
 */
function funz_si(sezione) {
    avanti(sezione);
    $("#scelta_diritti").text(testi[lingua].h3.si);

    $("#img_robotdiritti").hide();
    $("#img_politiconofoglio").hide();


    $("#div1").transition({x: 550, delay: 2000}, 2000, function () {
        $("#img_spunta_diritti").transition({x: 50}, 1).transition({opacity: 1}, 499);
        $("#img_robotnodiritti").hide();
        $("#img_robotdiritti").transition({x: -20},{opacity: 1},1000).show();
        $("#img_politicofoglio").hide();
        $("#img_politiconofoglio").show().transition({transform: "scaleX(-1)"})
    }).transition({x:0, delay:500}, 2000, function() {
        $("#img_politiconofoglio").transition({transform: "scaleX(1)"})
    });

}

/**
 * Va dalla sezione passata come parametro a quella successiva, con le animazioni.
 * Gestisce l'animazione relativa alla scelta effettuata dall'utente.
 * @param sezione: la sezione corrente con i bottoni per le scelte dell'utente.
 */
function funz_no(sezione) {
    avanti(sezione);
    $("#scelta_diritti").text(testi[lingua].h3.no);

    $("#img_robotdiritti").hide();
    $("#img_politicofoglio").hide();

    $("#div1").transition({x:550, delay:2000}, 2000, function() {
        $("#img_croce_diritti").transition({x:120}, 1).transition({opacity:1}, 499);
        $("#img_politiconofoglio").transition({transform: "scaleX(-1)"})
    }).transition({x:0, delay:500}, 2000, function() {
        $("#img_politiconofoglio").transition({transform: "scaleX(1)"})
    });
}

/**
 * Va dalla sezione passata come parametro a quella successiva, con le animazioni.
 * Gestisce l'animazione relativa alla scelta effettuata dall'utente.
 * @param sezione: la sezione corrente con i bottoni per le scelte dell'utente.
 */
function funz_bambino(sezione) {
    avanti(sezione);
    $("#scelta_tunnel").text(testi[lingua].h3.bambino);
    $("#img_bimbo").transition({y:-70, delay:2000}, 1000);
    $("#img_macchina2").transition({x:-460, delay:2000},600);

}

/**
 * Va dalla sezione passata come parametro a quella successiva, con le animazioni.
 * Gestisce l'animazione relativa alla scelta effettuata dall'utente.
 * @param sezione: la sezione corrente con i bottoni per le scelte dell'utente.
 */
function funz_autista(sezione) {
    avanti(sezione);
    $("#scelta_tunnel").text(testi[lingua].h3.autista);

    $("#img_bimbo").transition({y:-80, delay:2000}, 1000);
    $("#img_macchina2").transition({x:-530, y:-200, rotate: '-22deg', delay:2000}, 1000);
}


/**
 * Fa comparire il testo passato come primo parametro nell'elemento del DOM passato come secondo parametro.
 * @param testo: testo da far comparire
 * @param elemento: elemento in cui far comparire il testo
 */
function digita(testo, elemento) {

    function scrivi(testo, elemento, output, i) {
        var next = testo.charAt(i);
        if (next === '<') {
            next = "<br>";
            i+=4;
        } else
            i++;
        output += next;
        $(elemento).html(output);
        if(i < testo.length) {
            setTimeout(scrivi, speed, testo, elemento, output, i);
        }
    }

    var output = "";
    var i = 0;
    scrivi(testo, elemento, output, i);

}

/**
 * Crea l'oggetto con i testi del sito a partire dal file testi.json.
 */
function parseTesti() {
    $.ajax({
        url: "./resources/testi.json",
        async: false,
        dataType: "json"
    }).done(function(d) {
        testi = d;
        console.log("caricamento dej JSON riuscito :)");
    }).fail(function() {
        console.log("caricamento dej JSON fallito :(");
    });
}

/**
 * Popola il DOM con i testi nella lingua scelta dall'utente, presi dall'oggetto creato da {@link parseTesti()},
 * impostando la velocità di comparsa del testo.
 */
function popolaDOM() {
    var searchParams = new URLSearchParams(window.location.search);
    lingua = searchParams.get('lingua');
    volume = searchParams.get('volume');
    speed = volume === "on" ? 70 : 40;
    console.log(lingua);

    $("button").text(function () {
        return testi[lingua].button[$(this).attr("id")];
    });
    for (sezione in testi[lingua].h2) {
        $("#" + sezione + " h2").text(function () {
            return testi[lingua].h2[sezione];
        });
    }
    console.log("popolaDom");
}

