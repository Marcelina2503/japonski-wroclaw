// ==========================================
// 1. INICJALIZACJA MAPY I PODKŁADY
// ==========================================

// Widok domyślny (Stare Miasto) - używany przy starcie i przez przycisk "Home"
const WIDOK_DOMYSLNY = [51.1106, 17.0311];
const ZOOM_DOMYSLNY = 15;

// Obszar, poza który użytkownik nie może przesuwać mapy (okolice Starego Miasta)
const GRANICE_MAPY = L.latLngBounds([51.090, 17.000], [51.130, 17.070]);

// Autorskie tło
let tlo = L.tileLayer('./tlo/{z}/{x}/{y}.png', {
    minZoom: 12,
    maxZoom: 17,
    tms: false,
    attribution: 'Podkład: opracowanie własne na podstawie danych &copy; współtwórcy OpenStreetMap oraz SIP Wrocław',
    errorTileUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
});

// Mapa ogólna OpenStreetMap
let mapaTopo = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
});

// Ortofotomapa
let mapaSatelitarna = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

let mapa = L.map('mapa', {
    zoomControl: true,
    minZoom: 12,
    maxZoom: 17,
    maxBounds: GRANICE_MAPY,
    maxBoundsViscosity: 0.7,
    layers: [tlo],
    fullscreenControl: true
}).setView(WIDOK_DOMYSLNY, ZOOM_DOMYSLNY);

let podklady = {
    "Japoński Wrocław (Autorska mapa)": tlo,
    "Mapa OpenStreetMap": mapaTopo,
    "Ortofotomapa": mapaSatelitarna
};
L.control.layers(podklady).addTo(mapa);

L.control.scale({
    metric: true,
    imperial: false
}).addTo(mapa);

// ==========================================
// 2. KLASTROWANIE I WSPÓLNA LOGIKA (DRY)
// ==========================================

let klasterObiektow = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 50,
    spiderfyOnMaxZoom: true
});

// Zabezpieczenie przed wstrzyknięciem znaczników HTML z atrybutów
function esc(tekst) {
    return String(tekst)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// UNIWERSALNA FUNKCJA GENERUJĄCA PANEL BOCZNY (Zasada DRY)
function generujPanelBoczny(feature, layer) {
    layer.on('click', function () {
        // Współrzędne obiektu pobieramy z geometrii GeoJSON (kolejność: długość, szerokość),
        // a nie ze zdarzenia kliknięcia, które zwraca punkt kliknięcia kursora.
        let lng = feature.geometry.coordinates[0];
        let lat = feature.geometry.coordinates[1];
        let linkDoNawigacji = 'https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng;

        let p = feature.properties; // Skrót dla wygody

        // Budowanie treści panelu
        let tresc = '<h3 style="color: #C53030; margin-top: 0;">' + esc(p.Nazwa || 'Brak nazwy') + '</h3>';
        tresc += '<hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 15px 0;">';

        if (p.Zdjęcie) {
            let podpis = podpisZdjecia(p.Nazwa);
            tresc += '<figure style="margin: 0 0 15px 0;">';
            tresc += '<img src="' + esc(p.Zdjęcie) + '" onerror="this.parentNode.style.display=\'none\'" style="width: 100%; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); display: block;" alt="Zdjęcie obiektu: ' + esc(p.Nazwa || '') + '">';
            if (podpis) {
                tresc += '<figcaption style="font-size: 11px; color: #595959; margin-top: 6px; line-height: 1.4;">' + podpis + '</figcaption>';
            }
            tresc += '</figure>';
        }
        if (p.Adres) {
            tresc += '<p style="margin-bottom: 5px;"><strong>📍 Adres:</strong> ' + esc(p.Adres) + '</p>';
        }
        if (p.Rodzaj_kul) {
            tresc += '<p style="margin-bottom: 5px;"><strong>🏛️ Typ obiektu:</strong> ' + esc(p.Rodzaj_kul) + '</p>';
        }
        if (p.Rodzaj_edu) {
            tresc += '<p style="margin-bottom: 5px;"><strong>🎓 Rodzaj:</strong> ' + esc(p.Rodzaj_edu) + '</p>';
        }
        if (p.glown_menu) {
            tresc += '<p style="margin-bottom: 5px;"><strong>🍜 Menu:</strong> ' + esc(p.glown_menu) + '</p>';
        }
        if (p.Asortyment) {
            tresc += '<p style="margin-bottom: 5px;"><strong>🛍️ Asortyment:</strong> ' + esc(p.Asortyment) + '</p>';
        }
        if (p.Strona_www) {
            tresc += '<p style="margin-bottom: 5px;"><strong>🌐 Strona WWW:</strong> <a href="' + esc(p.Strona_www) + '" target="_blank" rel="noopener" style="color: #C53030; font-weight: bold; text-decoration: none;">Kliknij tutaj</a></p>';
        }
        if (p.Opis) {
            tresc += '<p>' + esc(p.Opis) + '</p>';
        }

        // Przycisk nawigacji
        tresc += '<a href="' + linkDoNawigacji + '" target="_blank" rel="noopener" style="display: block; text-align: center; background-color: #C53030; color: white; padding: 12px; margin-top: 20px; text-decoration: none; border-radius: 8px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">Nawiguj do celu 🚗</a>';

        document.getElementById('opis_obiektu').innerHTML = tresc;
    });
}

// ==========================================
// 3. DEFINICJE WARSTW
// ==========================================

// Restauracje
let ikonaRestauracji = L.icon({ iconUrl: './rysunek_Restauracje.svg', iconSize: [40, 40], iconAnchor: [20, 40] });
let warstwaRestauracje = L.geoJSON(restauracje, {
    pointToLayer: function (feature, latlng) { return L.marker(latlng, { icon: ikonaRestauracji }); },
    onEachFeature: generujPanelBoczny
});
klasterObiektow.addLayer(warstwaRestauracje);

// Kultura
let ikonaKultury = L.icon({ iconUrl: './rysunek_Kultura.svg', iconSize: [40, 40], iconAnchor: [20, 40] });
let warstwaKultura = L.geoJSON(kultura, {
    pointToLayer: function (feature, latlng) { return L.marker(latlng, { icon: ikonaKultury }); },
    onEachFeature: generujPanelBoczny
});
klasterObiektow.addLayer(warstwaKultura);

// Edukacja
let ikonaEdukacji = L.icon({ iconUrl: './rysunek_Edukacja.svg', iconSize: [40, 40], iconAnchor: [20, 40] });
let warstwaEdukacja = L.geoJSON(edukacja, {
    pointToLayer: function (feature, latlng) { return L.marker(latlng, { icon: ikonaEdukacji }); },
    onEachFeature: generujPanelBoczny
});
klasterObiektow.addLayer(warstwaEdukacja);

// Sklepy
let ikonaSklepy = L.icon({ iconUrl: './rysunek_Sklepy.svg', iconSize: [40, 40], iconAnchor: [20, 40] });
let warstwaSklepy = L.geoJSON(sklepy, {
    pointToLayer: function (feature, latlng) { return L.marker(latlng, { icon: ikonaSklepy }); },
    onEachFeature: generujPanelBoczny
});
klasterObiektow.addLayer(warstwaSklepy);

// Wydarzenia
let ikonaWydarzenia = L.icon({ iconUrl: './rysunek_Wydarzenia.svg', iconSize: [40, 40], iconAnchor: [20, 40] });
let warstwaWydarzenia = L.geoJSON(wydarzenia, {
    pointToLayer: function (feature, latlng) { return L.marker(latlng, { icon: ikonaWydarzenia }); },
    onEachFeature: generujPanelBoczny
});
klasterObiektow.addLayer(warstwaWydarzenia);

mapa.addLayer(klasterObiektow);
wypelnijZrodlaZdjec('zrodla_zdjec_tresc');

// ==========================================
// 4. NARZĘDZIA DODATKOWE (Legenda z filtrem, Geolokalizacja, Pomiary)
// ==========================================

// Kategorie widoczne w legendzie (kolejność = kolejność w legendzie)
let kategorieLegendy = [
    { nazwa: 'Sklepy',       alt: 'Sklep',       ikona: './rysunek_Sklepy.svg',       warstwa: warstwaSklepy },
    { nazwa: 'Restauracje',  alt: 'Restauracja', ikona: './rysunek_Restauracje.svg',  warstwa: warstwaRestauracje },
    { nazwa: 'Kultura',      alt: 'Kultura',     ikona: './rysunek_Kultura.svg',      warstwa: warstwaKultura },
    { nazwa: 'Edukacja',     alt: 'Edukacja',    ikona: './rysunek_Edukacja.svg',     warstwa: warstwaEdukacja },
    { nazwa: 'Wydarzenia',   alt: 'Wydarzenia',  ikona: './rysunek_Wydarzenia.svg',   warstwa: warstwaWydarzenia }
];

// Legenda pełni jednocześnie funkcję filtra: pole wyboru włącza/wyłącza kategorię
let legenda = L.control({ position: 'bottomright' });
legenda.onAdd = function () {
    let div = L.DomUtil.create('div', 'legenda-mapy');
    kategorieLegendy.forEach(function (kat) {
        let etykieta = L.DomUtil.create('label', '', div);
        let pole = L.DomUtil.create('input', '', etykieta);
        pole.type = 'checkbox';
        pole.checked = true;
        pole.setAttribute('aria-label', 'Pokaż kategorię ' + kat.nazwa);

        let img = L.DomUtil.create('img', '', etykieta);
        img.src = kat.ikona;
        img.alt = kat.alt;

        let opis = L.DomUtil.create('span', '', etykieta);
        opis.textContent = kat.nazwa;

        L.DomEvent.on(pole, 'change', function () {
            if (pole.checked) {
                klasterObiektow.addLayer(kat.warstwa);
            } else {
                klasterObiektow.removeLayer(kat.warstwa);
            }
        });
    });
    L.DomEvent.disableClickPropagation(div);
    L.DomEvent.disableScrollPropagation(div);
    return div;
};
legenda.addTo(mapa);

let przyciskHome = L.control({ position: 'topleft' });
przyciskHome.onAdd = function () {
    let div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
    let a = L.DomUtil.create('a', '', div);
    a.innerHTML = '🏠';
    a.href = '#';
    a.title = 'Wróć do widoku głównego';
    a.style.fontSize = '16px';
    a.style.textDecoration = 'none';
    a.style.textAlign = 'center';
    a.style.lineHeight = '30px';
    a.style.display = 'block';
    a.style.width = '30px';
    a.style.height = '30px';
    a.style.backgroundColor = 'white';
    a.style.color = '#C53030';

    L.DomEvent.disableClickPropagation(div);
    L.DomEvent.on(a, 'click', function (e) {
        L.DomEvent.preventDefault(e);
        mapa.setView(WIDOK_DOMYSLNY, ZOOM_DOMYSLNY);
    });
    return div;
};
przyciskHome.addTo(mapa);

let przyciskGeo = L.control({ position: 'topleft' });
przyciskGeo.onAdd = function () {
    let div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
    let a = L.DomUtil.create('a', '', div);
    a.innerHTML = '📍';
    a.href = '#';
    a.title = 'Znajdź moją pozycję';
    a.style.fontSize = '16px';
    a.style.textDecoration = 'none';
    a.style.textAlign = 'center';
    a.style.lineHeight = '30px';
    a.style.display = 'block';
    a.style.width = '30px';
    a.style.height = '30px';
    a.style.backgroundColor = 'white';

    L.DomEvent.disableClickPropagation(div);
    L.DomEvent.on(a, 'click', function (e) {
        L.DomEvent.preventDefault(e);
        mapa.locate({ setView: true, maxZoom: 15 });
    });
    return div;
};
przyciskGeo.addTo(mapa);

// Znacznik pozycji użytkownika: czerwona kropka + okrąg błędu (zamiast domyślnej ikony Leaflet)
let znacznikGeo;
let okragDokladnosci;
mapa.on('locationfound', function (e) {
    if (znacznikGeo) {
        mapa.removeLayer(znacznikGeo);
    }
    if (okragDokladnosci) {
        mapa.removeLayer(okragDokladnosci);
    }
    let dokladnosc = Math.round(e.accuracy);
    okragDokladnosci = L.circle(e.latlng, {
        radius: e.accuracy,
        color: '#C53030',
        weight: 1,
        fillColor: '#C53030',
        fillOpacity: 0.12,
        interactive: false
    }).addTo(mapa);
    znacznikGeo = L.circleMarker(e.latlng, {
        radius: 8,
        color: '#FFFFFF',
        weight: 3,
        fillColor: '#C53030',
        fillOpacity: 1
    }).addTo(mapa)
        .bindPopup('Twoja lokalizacja.<br>Dokładność: <strong>' + dokladnosc + ' m</strong>')
        .openPopup();
});

mapa.on('locationerror', function () {
    alert("Nie udało się pobrać lokalizacji. Upewnij się, że masz włączony GPS lub zgadzasz się na udostępnianie lokalizacji w przeglądarce.");
});

let narzedziePomiaru = L.control.polylineMeasure({
    position: 'topright',
    unit: 'metres',
    showBearings: false,
    clearMeasurementsOnStop: true,
    tooltipTextFinish: 'Kliknij dwukrotnie, aby zakończyć',
    tooltipTextDelete: 'Przytrzymaj Shift i kliknij, aby usunąć punkt',
    tooltipTextMove: 'Przeciągnij punkt, aby zmienić trasę',
    tooltipTextResume: 'Kliknij, aby kontynuować rysowanie',
    tooltipTextAdd: 'Kliknij, aby dodać punkt',
    measureControlTitleOn: 'Włącz pomiar odległości',
    measureControlTitleOff: 'Wyłącz pomiar odległości'
});
narzedziePomiaru.addTo(mapa);
