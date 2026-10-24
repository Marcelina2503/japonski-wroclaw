// Plik zrodla_zdjec.js
// Autorzy, źródła i licencje zdjęć. Klucze muszą być identyczne z polem "Nazwa" w dane.js.
//
// typ: "wlasne"  -> zdjęcie wykonane przez autorkę pracy
// typ: "commons" -> zdjęcie z Wikimedia Commons (autor, plik i licencja wg strony pliku)
// poglad: true   -> zdjęcie/grafika poglądowa (nie przedstawia dokładnie danego obiektu)
// plik:          -> nazwa pliku na Commons (z paska adresu, ze znakami _ zamiast spacji);
//                   gdy pusta, podpis pokaże "Wikimedia Commons" bez linku do pliku

const ZRODLA_ZDJEC = {
    // --- zdjęcia własne ---
    "NAMI Airando":                         { typ: "wlasne" },
    "Mochimat":                             { typ: "wlasne" },
    "Automat z kartami kolekcjonerskimi":   { typ: "wlasne" },
    "Satori":                               { typ: "wlasne" },
    "Yatta.pl":                             { typ: "wlasne" },
    "Vegan AF Ramen":                       { typ: "wlasne" },
    "Okami Ramen Bar":                      { typ: "wlasne" },
    "Panda Ramen":                          { typ: "wlasne" },
    "Sushi Lovers":                         { typ: "wlasne" },
    "WSHOKU Sushi & Ramen Bar":             { typ: "wlasne" },

    // --- Wikimedia Commons: zdjęcia danych obiektów ---
    "Ogród botaniczny Uniwersytetu Wrocławskiego": {
        typ: "commons",
        autor: "Barbara Maliszewska",
        zrodlo: "Wikipedia",
        plik: "Ogród_Botaniczny_-_widok_na_staw_fot_BMaliszewska.jpg",
        licencja: "CC BY-SA 3.0 PL",
        licencjaUrl: "https://creativecommons.org/licenses/by-sa/3.0/pl/"
    },
    "Muzeum Narodowe we Wrocławiu": {
        typ: "commons",
        autor: "Fallaner",
        zrodlo: "Wikipedia",
        plik: "Building_of_the_National_Museum_in_Wrocław_aerial_view_2017.jpg",
        licencja: "CC BY-SA 4.0",
        licencjaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.pl"
    },
    "Kino Nowe Horyzonty": {
        typ: "commons",
        autor: "Gepardon",
        zrodlo: "Wikipedia",
        plik: "Kino_Nowe_Horyzonty.jpg",
        licencja: "CC BY-SA 4.0",
        licencjaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.pl"
    },

    // --- Wikimedia Commons: zdjęcia i grafiki poglądowe ---
    "Azjatyckie centrum językowe": {
        typ: "commons",
        poglad: true,
        etykieta: "Grafika poglądowa",
        autor: "Infiaria",
        plik: "Hiragana-Katakana-Gojuuon.jpg",
        licencja: "CC BY-SA 4.0",
        licencjaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.pl"
    },
    "Festiwal Sakura": {
        typ: "commons",
        poglad: true,
        autor: "Satdeep Gill",
        plik: "Cherry_Blossom_in_El_Retiro_Park,_Madrid,_Spain.jpg",
        licencja: "CC BY-SA 4.0",
        licencjaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.pl"
    },
    "ICHIGO Japońskie Centrum Kultury i Biznesu": {
        typ: "commons",
        poglad: true,
        autor: "Ayu Nabila",
        plik: "Japanese-Calligraphy-art.jpg",
        licencja: "CC BY-SA 4.0",
        licencjaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.pl"
    }
};

// Zabezpieczenie przed wstrzyknięciem znaczników HTML
function escZ(tekst) {
    return String(tekst)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

const STYL_LINKU_ZRODLA = 'color: #C53030; text-decoration: none;';

// Link do strony pliku. Adres Plik:... na pl.wikipedia.org działa zarówno dla plików wgranych
// lokalnie na Wikipedię, jak i dla plików z Wikimedia Commons. Pole "zrodlo" (domyślnie
// "Wikimedia Commons") to tylko nazwa wyświetlana w podpisie.
function linkDoPlikuCommons(z) {
    let nazwaZrodla = z.zrodlo || 'Wikimedia Commons';
    if (!z.plik) {
        return nazwaZrodla;
    }
    let url = 'https://pl.wikipedia.org/wiki/Plik:' + encodeURI(z.plik);
    return '<a href="' + escZ(url) + '" target="_blank" rel="noopener" style="' + STYL_LINKU_ZRODLA + '">' + escZ(nazwaZrodla) + '</a>';
}

function linkDoLicencji(z) {
    return '<a href="' + escZ(z.licencjaUrl) + '" target="_blank" rel="noopener" style="' + STYL_LINKU_ZRODLA + '">' + escZ(z.licencja) + '</a>';
}

// Podpis pod zdjęciem w panelu bocznym (zwraca HTML; pusty tekst, gdy brak wpisu)
function podpisZdjecia(nazwa) {
    let z = ZRODLA_ZDJEC[nazwa];
    if (!z) {
        return '';
    }
    if (z.typ === 'wlasne') {
        return 'Fot. własna';
    }
    let etykieta = z.etykieta || (z.poglad ? 'Zdjęcie poglądowe' : 'Fot.');
    let przedrostek = z.poglad ? etykieta + ': ' : etykieta + ' ';
    return przedrostek + escZ(z.autor) + ', ' + linkDoPlikuCommons(z) + ', ' + linkDoLicencji(z);
}

// Lista "Źródła zdjęć" (rozwijana w panelu bocznym)
function wypelnijZrodlaZdjec(idKontenera) {
    let el = document.getElementById(idKontenera);
    if (!el) {
        return;
    }
    let wlasne = [];
    let commons = [];
    Object.keys(ZRODLA_ZDJEC).forEach(function (nazwa) {
        let z = ZRODLA_ZDJEC[nazwa];
        if (z.typ === 'wlasne') {
            wlasne.push(escZ(nazwa));
        } else {
            let uwaga = z.poglad ? ' <em>(' + (z.etykieta ? z.etykieta.toLowerCase() : 'zdjęcie poglądowe') + ')</em>' : '';
            commons.push('<li><strong>' + escZ(nazwa) + '</strong>' + uwaga + '<br>' +
                escZ(z.autor) + ', ' + linkDoPlikuCommons(z) + ', ' + linkDoLicencji(z) + '</li>');
        }
    });
    let html = '<p style="margin: 8px 0;"><strong>Zdjęcia własne autorki:</strong> ' + wlasne.join(', ') + '.</p>';
    html += '<p style="margin: 8px 0 4px 0;"><strong>Zdjęcia z Wikimedia Commons:</strong></p>';
    html += '<ul style="margin: 0; padding-left: 18px; line-height: 1.5;">' + commons.join('') + '</ul>';
    el.innerHTML = html;
}
