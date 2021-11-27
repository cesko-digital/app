![cesko.digital](cesko-digital_logo.png)

# Web Česko.Digital

Zdroje pro web Česko.Digital. Web je k dispozici na [cesko.digital](https://cesko.digital), preview pro editaci obsahu na [web-preview.cesko.digital](https://web-preview.cesko.digital).

## 🚀 Setup projektu

1.  **Požadavky**

    Projekt vyžaduje Node v12+ a Yarn v1.22+.

1.  **Repozitář**

    Naklonujte si repozitář do složky `cesko-digital-web`:

    ```shell script
    git clone https://github.com/cesko-digital/web.git cesko-digital-web && cd cesko-digital-web
    ```

1.  **Instalace a spuštění**

    Ve složce `cesko-digital-web` nainstalujte požadované závislosti:

    ```shell script
    yarn
    ```

    poté lze spustit vývojový režim:

    ```shell script
    yarn start
    ```

    Na [localhost:8000](http://localhost:8000) by měla běžet lokální verze webu a podporující live reload pro pohodlný vývoj.
    Na [localhost:8000/\_\_\_graphql](http://localhost:8000/___graphql) by měl běžet lokální GraphQL playground pro datové query.

    Komponenty využívají typy generované na základě GraphQL schéma. Při změně schéma je nutné vygenerovat nové. Pro tento příkaz musí běžet proces spuštěný přes yarn start:

    ```shell script
    yarn gen:types
    ```

    Tento příkaz zároveň vygeneruje soubor [schema.graphql](./schema.graphql), který lze využít pro [IDE podporu](https://plugins.jetbrains.com/plugin/8097-js-graphql) pro datové query.

## Ostrá data na lokálním serveru

1.  **Prerekvizity**

    Je potřeba mít alespoň read přístup do AirTable.

1.  **Nastavení**

    Zkopíruj soubor .env.example do .env
    
    V něm nastav dvě konfigurační položky:
    ```
    AIRTABLE_API_KEY ... to je personální API klíč, ten nastav podle https://support.airtable.com/hc/en-us/articles/219046777
    AIRTABLE_BASE_URL ... to je URL té Airtable Base, jdi na https://airtable.com/api a tam bys měl/a vidět 'Web' pod "Bases shared with me", klikni na to a na té detailní stránce té Base už bude ten BASE identifikátor - tím nahraď BASE_KEY
    ```


## Překlady

Projekt má všechny [texty v AirTable](https://airtable.com/shraCQhMJdGUu1xhk) kvůli překladům. Detailní dokumentace je k nalezení [zde](docs/translations.md).

## ⌨️ Základní příkazy

`yarn start`: Start vývojového režimu

`yarn lint`: Lint kontrola kódu a formátování

`yarn test`: Spuštění testů

`yarn gen:types`: Vygenerování TS a GQL typů (pro tento příkaz musí běžet proces spuštěný přes yarn start)

`yarn storybook`: Start dokumentace komponent

`yarn build`: Build produkční verze webu

`yarn serve`: Spuštění produkčního buildu

`yarn format`: Formátování kódu

## 🛠 Jak přispívat

Před zahájením vývoje si prosím projděte soubor [CONTRIBUTING](CONTRIBUTING.md), který obsahuje informace o všech konvencích repozitáře.

### Checklist před vytvořením PR

`yarn format && yarn lint --fix && yarn test && yarn type-check && yarn build`

`yarn format`: prettier

`yarn lint --fix`: kontrola formátování s opravou, nemělo by vrátit (neopravitelnou) chybu

`yarn test`: testy, všechny musí projít

`yarn type-check`: kontrola TS

`yarn build`: aplikace se musí zbuildit bez chyb

## Licence

Zdroje jsou zveřejněny pod [licencí BSD 3-Clause](LICENSE).

## Kontakty

**Koordinátoři:** [Tomáš Znamenáček](https://github.com/zoul)

**Tech leads:** [Tomáš Znamenáček](https://github.com/zoul)
