# github - repo: cas-fee-projekt1

## CAS FEE Projekt 1

### Das Projekt sollte gut strukturiert sein aber weitgehend auf die Nutzung von Frameworks verzichten.

- Nutzung eines SPA Frameworks (Angular oder React) nicht erlaubt
- Nutzung des MVC Patterns trotzdem sinnvoll
- Nutzung von Layout / Styling-Framework wie Bootstrap nicht erlaubt
- Flexbox nutzen
- Nutzung von simpler Templating Engine (z.B. Handlebars) ist verlangt
- Nutzung von JQuery ist erlaubt

### Ältere Browser müssen nicht unterstützt werden.

### Das Projekt 1 wird in 5 Kategorien angeschaut. Jede Kategorie muss erfüllt sein.

- Funktionsumfang
- Architektur
- JS Qualität
- CSS Qualität
- HTML Qualität

### Der Funktionsumfang ist in den Wire-Frames dargestellt. Diese beinhalten u.a.

- Anzeigen, editieren und erfassen von Notizen
- Sortieren von Notizen
- Filtern von „abgeschlossenen" Notizen
- Abspeichern der Daten auf dem Server
- Wechseln des Styles
- Extra Bonus: Polling Data (Liste aller Notizen) (alle 60 Sekunden)

Weitere Information und Bewertungen, siehe Folie: CAS-FEE-2017-InfosProjektePrüfungNoten.pdf (ab Seite 10)

### JS Code Style

- http://airbnb.io/javascript/


## Installation

```bash
# Repo klonen
git clone https://github.com/aceres/cas-fee-projekt1

# In Verzeichnis wechseln
cd cas-fee-projekt1

# NPM-Dependencies installieren (in package.json definiert)
npm install
```

## Webserver starten

```bash
node index.js
```

Im Browser unter http://localhost:3001 erreichbar.

## Projektstrutkur (Wichtige Übersicht)

### Storage of Note

```bash
/service/noteStorage.js
```

### Model of Note (Class)

```bash
/model/modelNote.js
```

### Service (REST Client) - for the View Controllers

```bash
/public/javascript/services/restClient.js
```

### Utils (AJAX) - Global AJAX util for the REST Client

```bash
/public/javascript/utils/ajaxUtil.js
```

### Front Controller (Request / Response)

```bash
/controller/controllerNote.js
```

### Database

```bash
/data/note.db
```

### Views (HTML)

```bash
/public/html/index.html
/public/html/detailNote.html
```

### View Controllers for views (HTML)

```bash
/public/javascripts/controllerListNote.js
/public/javascripts/controllerDetailNote.js
/public/javascripts/controllerStyleNote.js
```

### JavaScript Libraries (Vendors) for View Controllers

jQuery, Handlebars, Modernizr, moment.js

```bash
/public/javascripts/lib/
```

### Change Style (with the session key)

```bash
/public/javascripts/controller/controllerStyleNote.js
/public/model/modelSessionStorage.js
```

Note: The file: "modelSessionStorage.js" is defined as Interface between View Controller and Browser Session Storage.