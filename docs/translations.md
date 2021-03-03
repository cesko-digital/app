# Překlady

Překlady jsou realizovány pomocí `gatsby-plugin-react-i18next` ve spojení se Airtable. 

Překlady staženy pomocí skriptu `yarn translations:get` v rámci buildu. V rámci tohoto skriptu jsou staženy záznamy a vytvořeny JSON soubory `locale/{en,cs}.translations.json`. Pro lokální vývoj lze spustit `yarn translations:mock` využívající [`translations.example.json`](../locale/translation.example.json) a vložit testovací hodnoty ručně.

V rámci aplikace lze tyto překlady použit pomocí `useTranslation` takto:

```
import { useTranslation } from 'gatsby-plugin-react-i18next'
const { t } = useTranslation()
t('key.for.translation')
```

Inspiraci pro nové překladové klíče naleznete v Airtable zde: [https://airtable.com/shraCQhMJdGUu1xhk](https://airtable.com/shraCQhMJdGUu1xhk). 

V případě nejasností při vývoji nových komponent se nebojte kontaktovat jednoho z techleadů na projektu (viz [kontakty v README](../README.md)).

Pro spuštění skriptu a načtení překladů je nutné mít dostupné environment proměné. Jmenovitě:

- AIRTABLE_TRANSLATION_KEY
- AIRTABLE_TRANSLATION_BASE

Tyto hodnoty lze získat na [API stránce AirTable](https://airtable.com/api).

## Překlady cest

Web využívá vícejazyčné URL adresy, tj. pro komponentu `projects` máme cesty `/projekty` a `/en/projects`. Toho je docíleno pomocí pluginu `gatsby-plugin-translate-urls`. Všechny překlady jsou načteny z JSON souboru a musí obsahovat prefix `"urls."`. Neprobíhá načítání z Airtable, protože se jedná o hodnoty napřímo spojené s kódem.

Příklad přidání nové stránky:

- název komponenty `pages/about-us.tsx`,
- JSON `urls.about-us` (např. en: "about-us", cs: "o-nas"),
- vytvořené cesty:
  - `/en/about-us`
  - `/o-nas`

Příklad pro zanořenou stránku:

- název komponenty `pages/about-us/community.tsx`,
- JSON klíče:
  - `urls.about-us`: (en: "about-us", cs: "o-nas")
  - `urls.community`: (en: "community", cs: "komunita")
- vytvořené cesty:
  - `/en/about-us/community`
  - `/o-nas/komunita`
