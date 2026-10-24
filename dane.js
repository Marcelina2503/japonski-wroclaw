// Plik dane.js
// Współrzędne zaokrąglono do 6 miejsc po przecinku (ok. 0,1 m) - dokładność
// pomiaru GNSS wynosiła ok. 4 m, więc dalsze miejsca dziesiętne nie niosą informacji.

let wydarzenia = {
"type": "FeatureCollection",
"name": "wydarzenia1",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "id": 1, "Nazwa": "NAMI Airando", "Adres": "Wyspa Słodowa", "Opis": "Cykliczny, plenerowy festiwal kultury japońskiej organizowany przez fundację NAMI. Wydarzenie oferuje pokazy tradycyjnych sztuk walki (kendo, aikido), koncerty na bębnach taiko, warsztaty z kaligrafii oraz strefę gastronomiczną z japońskim street foodem.", "Zdjęcie": "nami.jpg", "Cykl_w_rok": "1", "data_wizyt": "2026-08-22", "Strona_www": "https://namiairando.fundacja-nami.pl/" }, "geometry": { "type": "Point", "coordinates": [ 17.038248, 51.115980 ] } },
{ "type": "Feature", "properties": { "id": 2, "Nazwa": "Festiwal Sakura", "Adres": "Plac Wolności, 50-529 Wrocław", "Opis": "Festiwal Sakura to pełne wrażeń wydarzenie plenerowe, przenoszące odwiedzających na azjatycką ulicę. Impreza to przede wszystkim ogromna strefa gastronomiczna, jak i liczne wydarzenia kulturalne, takie jak warsztaty origami, czy pokazy sztuk walki.", "Zdjęcie": "sakura.jpg", "Cykl_w_rok": null, "data_wizyt": null, "Strona_www": "https://festiwalsakura.pl/" }, "geometry": { "type": "Point", "coordinates": [ 17.028032, 51.106435 ] } },
{ "type": "Feature", "properties": { "id": 3, "Nazwa": "Kino Nowe Horyzonty", "Adres": "ul. Kazimierza Wielkiego 19a/21, 50-077 Wrocław", "Opis": "Największe w Polsce kino studyjne, które odgrywa istotną rolę w popularyzacji japońskiej kinematografii we Wrocławiu. W jego repertuarze regularnie pojawiają się dzieła japońskich twórców - od animacji ze Studia Ghibli, po nagradzane nowości. Instytucja współpracuje m.in. z Festiwalem Sakura. W ramach współpracy organizowane są specjalne pokazy tematyczne i przeglądy filmowe.", "Zdjęcie": "kino.jpg", "Cykl_w_rok": null, "data_wizyt": null, "Strona_www": "https://www.kinonh.pl/" }, "geometry": { "type": "Point", "coordinates": [ 17.026343, 51.109502 ] } }
]
};


let sklepy = {
"type": "FeatureCollection",
"name": "Sklepy",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "id": 1, "Nazwa": "Automat z kartami kolekcjonerskimi", "Adres": "Plac Dominikański 3, 50-159 Wrocław", "Opis": "W asortymencie maszyny znajdują się oryginalne karty kolekcjonerskie z najpopularniejszych japońskich dzieł animowanych, takich jak Pokemon, Naruto, czy One Piece. To wyraźny ślad japońskiej popkultury w przestrzeni komercyjnej.", "Zdjęcie": "karty_kolekcjonerskie.jpg", "Asortyment": "Mangastore", "Strona_www": null }, "geometry": { "type": "Point", "coordinates": [ 17.039690, 51.108216 ] } },
{ "type": "Feature", "properties": { "id": 2, "Nazwa": "Mochimat", "Adres": "Plac Dominikański 3, 50-159 Wrocław", "Opis": "Automat Mochimat prezentuje współczesne japońskie trendy kulinarne. Specjalizuje się w sprzedaży mochi - tradycyjnych japońskich klusek ryżowych, podawanych w nowoczesnej formie deserów lodowych.", "Zdjęcie": "mochimat.jpg", "Asortyment": null, "Strona_www": null }, "geometry": { "type": "Point", "coordinates": [ 17.039693, 51.108264 ] } },
{ "type": "Feature", "properties": { "id": 3, "Nazwa": "Satori", "Adres": "ul. Oławska 16, 50-123 Wrocław", "Opis": "Nowe miejsce na mapie Starego Miasta - otwarty w kwietniu 2026 roku sklep charakteryzuje się sprzedażą gadżetów z anime i mang. W kolekcji posiada m.in. figurki kolekcjonerskie, pluszaki czy najnowsze tomy mang.", "Zdjęcie": "satori.jpg", "Asortyment": "Mangastore", "Strona_www": "https://www.facebook.com/SklepSatori/" }, "geometry": { "type": "Point", "coordinates": [ 17.035720, 51.108511 ] } },
{ "type": "Feature", "properties": { "id": 4, "Nazwa": "Yatta.pl", "Adres": "ul. Kiełbaśnicza 25, 50-110 Wrocław", "Opis": "Punkt związany z japońską popkulturą i ruchem otaku. To najbardziej rozpoznawalny sklep tego typu w ścisłym centrum Wrocławia. Posiada ogromny asortyment licencjonowanych produktów związanych z mangą i anime.", "Zdjęcie": "yatta.jpg", "Asortyment": "Mangastore", "Strona_www": "https://yatta.pl/" }, "geometry": { "type": "Point", "coordinates": [ 17.029663, 51.111655 ] } }
]
};

let restauracje = {
"type": "FeatureCollection",
"name": "Restauracje",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "id": 1, "Nazwa": "Vegan AF Ramen", "Adres": "ul. Oławska 12b, 50-123 Wrocław", "Opis": "Miejsce prezentuje niezwykłą fuzję tradycyjnego jedzenia z nowoczesnymi trendami żywieniowymi, poprzez serwowanie wyłącznie wegańskich wersji dań japońskich. Punkt ukazuje jak japońska kultura kulinarna dopasowuje się do współczesnych potrzeb.", "Zdjęcie": "vegan_ramen.jpg", "glown_menu": "Ramenya", "Autentyczn": null, "Strona_www": "https://wroclaw.veganaframen.pl/" }, "geometry": { "type": "Point", "coordinates": [ 17.035505, 51.108561 ] } },
{ "type": "Feature", "properties": { "id": 2, "Nazwa": "Okami Ramen Bar", "Adres": "ul. Ruska 58/59, 50-079 Wrocław", "Opis": "Lokal specjalizuje się w tradycyjnych ramenach oraz przystawkach, takich jak pierożki gyoza i kurczak karaage. Miejsce to przyciąga mieszkańców autentycznymi smakami, udowadniając jak silną pozycję posiada japońska gastronomia w centrum samego Wrocławia.", "Zdjęcie": "okami.jpg", "glown_menu": "Ramenya", "Autentyczn": null, "Strona_www": "https://www.facebook.com/okamiwroclaw/#" }, "geometry": { "type": "Point", "coordinates": [ 17.027335, 51.110089 ] } },
{ "type": "Feature", "properties": { "id": 3, "Nazwa": "Panda Ramen", "Adres": "ul. Białoskórnicza 17/18, 50-134 Wrocław", "Opis": "Lokal specjalizuje się w tradycyjnej japońskiej zupie ramen na bazie gotowanych wiele godzin wywarów. Dodatkowo miejsce wyróżnia się wystrojem wnętrza, nawiązującym do estetyki japońskiej pop-artu, neonów i kultury komiksu.", "Zdjęcie": "panda.jpg", "glown_menu": "Ramenya", "Autentyczn": null, "Strona_www": "https://www.pandaramen.pl/" }, "geometry": { "type": "Point", "coordinates": [ 17.027787, 51.111917 ] } },
{ "type": "Feature", "properties": { "id": 4, "Nazwa": "Sushi Lovers", "Adres": "ul. Odrzańska 20, 50-114 Wrocław", "Opis": "Lokal koncentruje się na serwowaniu tradycyjnego sushi w różnych formach, takich jak nigiri, maki czy uramaki. Obiekt świetnie pokazuje klasyczne nurty japońskiej tradycji kulinarnej.", "Zdjęcie": "sushi_lovers.jpg", "glown_menu": "Sushi bar", "Autentyczn": null, "Strona_www": "https://slovers.pl/" }, "geometry": { "type": "Point", "coordinates": [ 17.031440, 51.113067 ] } },
{ "type": "Feature", "properties": { "id": 5, "Nazwa": "WSHOKU Sushi & Ramen Bar", "Adres": "ul. Odrzańska 17/1A, 50-113 Wrocław", "Opis": "Nazwa lokalu bezpośrednio nawiązuje do washoku - tradycyjnej japońskiej sztuki kulinarnej wpisanej na listę UNESCO. Menu łączy w sobie dwa najważniejsze filary japońskiej kuchni - sushi i ramen.", "Zdjęcie": "wshoku.jpg", "glown_menu": "Sushi bar", "Autentyczn": null, "Strona_www": "https://wshokusushi.pl/" }, "geometry": { "type": "Point", "coordinates": [ 17.031943, 51.112885 ] } }
]
};

let kultura = {
"type": "FeatureCollection",
"name": "Kultura0",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "fid": 1, "Nazwa": "Ogród botaniczny Uniwersytetu Wrocławskiego", "Adres": "ul. Henryka Sienkiewicza 23, 50-335 Wrocław", "Opis": "Jeden z najważniejszych punktów na mapie Wrocławia z klimatami japońskimi. Posiada ogromną kolekcję roślin z Azji Wschodniej. Odwiedzając to miejsce, można natrafić na m.in. japońskie klony palmowe, sosny drobnokwiatowe czy japońskie wiśnie sakura, które wiosną sprowadzają dużą rzeszę turystów. Jednak najistotniejsze jest Alpinarium wraz z otoczeniem stawu. Zauważyć można inspirację japońską sztuką ogrodową - kompozycje cechuje asymetria, kamienie połączone z wodą oraz rośliny zmieniające kolor w zależności od pory roku, co nawiązuje do filozofii wabi-sabi. Ogród botaniczny przyciąga również wydarzeniami. Odbywają się tu pokazy formowania drzewek bonsai, wystawy i pokazy związane z kulturą japońską.", "Zdjęcie": "ogrod_botaniczny.jpg", "Rodzaj_kul": "Ogród/park", "Powiazanie": "Gatunki japońskie", "Strona_www": "https://www.ogrodbotaniczny.wroclaw.pl/" }, "geometry": { "type": "Point", "coordinates": [ 17.047758, 51.116229 ] } },
{ "type": "Feature", "properties": { "fid": 2, "Nazwa": "Muzeum Narodowe we Wrocławiu", "Adres": "Plac Powstańców Warszawy 5, 50-153 Wrocław", "Opis": "Kluczowe miejsce na obszarze badań pod kątem japońskiej sztuki i rzemiosła. Muzeum posiada w swoich zbiorach oryginalne eksponaty z Dawnej Japonii - głównie tradycyjną ceramikę, japońską broń, w tym elementy zbroi samurajskich, czy wyroby z tkaniny. Istotne też jest organizowanie wystaw czasowych poświęconych Kraju Kwitnącej Wiśni. W muzeum również organizowane są warsztaty dla najmłodszych, na przykład \"Stwory Japonii\", podczas których organizatorzy zapoznają dzieci ze sztuką japońską, opowiedzą o smokach i karpiach. A na końcu warsztatów najmłodsi mogą stworzyć własną pocztówkę jako pamiątkę z tej podróży.", "Zdjęcie": "muzeum_narodowe.jpg", "Rodzaj_kul": "Muzeum/galeria", "Powiazanie": "", "Strona_www": "https://mnwr.pl/" }, "geometry": { "type": "Point", "coordinates": [ 17.047628, 51.110872 ] } }
]
};

let edukacja = {
"type": "FeatureCollection",
"name": "Edukacja1",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "id": 1, "Nazwa": "Azjatyckie centrum językowe", "Adres": "Dom Handlowy Feniks, ul. Szewska 75/77, 50-121 Wrocław", "Opis": "Jeden z najważniejszych punktów edukacyjnych, zajmujących się profesjonalnym nauczaniem języków azjatyckich, w tym języka japońskiego na różnych poziomach zaawansowania. Szkoła oferuje także warsztaty dotyczące japońskiej kaligrafii czy etykiety.", "Zdjęcie": "centrumjezykowe.jpg", "Rodzaj_edu": "Szkoła językowa", "Grupa_doc": null, "Strona_www": "https://www.acj.edu.pl/" }, "geometry": { "type": "Point", "coordinates": [ 17.034056, 51.109303 ] } },
{ "type": "Feature", "properties": { "id": 2, "Nazwa": "ICHIGO Japońskie Centrum Kultury i Biznesu", "Adres": "ul. Stanisława Leszczyńskiego 4/lokal 25, 50-078 Wrocław", "Opis": "Wrocławski oddział ogólnopolskiej sieci. Głównym filarem działalności jest w pełni profesjonalna szkoła językowa, w której zajęcia są prowadzone przez wykwalifikowanych Japończyków. Centrum promuje kulturę japońską i wspiera relacje biznesowe na linii Polska-Japonia.", "Zdjęcie": "ichigo.jpg", "Rodzaj_edu": null, "Grupa_doc": null, "Strona_www": "https://www.ichigo.pl/oddzial/wroclaw" }, "geometry": { "type": "Point", "coordinates": [ 17.031600, 51.107840 ] } }
]
};
