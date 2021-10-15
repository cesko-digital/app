![cesko.digital](cesko-digital_logo.png)

# Web Česko.Digital

Zdroje pro web Česko.Digital. Web je k dispozici na [cesko.digital](https://cesko.digital), preview pro editaci obsahu na [web-preview.cesko.digital](https://web-preview.cesko.digital).

## 🚀 Setup projektu

1.  **Požadavky**

    Projekt vyžaduje Node v12+ a Yarn v1.22+.

1.  **Repozitář**

    Naklonujte si repozitář do složky `cesko-digital-web`:

    ```shell script
    git clone https://github.com/cesko-digital/web.git cesko-digital-web
    ```

1.  **Instalace a spuštění**

    Ve složce `cesko-digital-web` nainstalujte požadované závislosti:

    ```shell script
    cd cesko-digital-web
    yarn
    ```

    poté lze spustit vývojový režim:

    ```shell script
    yarn start
    ```

    Na [localhost:8000](http://localhost:8000) by měla běžet lokální verze webu a podporující live reload pro pohodlný vývoj.
    Na [localhost:8000/___graphql](http://localhost:8000/___graphql) by měl běžet lokální GraphQL playground pro datové query.
    
    Komponenty využívají typy generované na základě GraphQL schéma. Při změně schéma je nutné vygenerovat nové:

    ```shell script
    yarn gen:types
    ```
    
    Tento příkaz zároveň vygeneruje soubor [schema.graphql](./schema.graphql), který lze využít pro [IDE podporu](https://plugins.jetbrains.com/plugin/8097-js-graphql) pro datové query. 

## Překlady

Projekt má všechny [texty v AirTable](https://airtable.com/shraCQhMJdGUu1xhk) kvůli překladům. Detailní dokumentace je k nalezení [zde](docs/translations.md).

## ⌨️ Základní příkazy

`yarn start`: Start vývojového režimu

`yarn lint`: Lint kontrola kódu a formátování

`yarn test`: Spuštění testů

`yarn gen:types`: Vygenerování TS a GQL typů

`yarn storybook`: Start dokumentace komponent

`yarn build`: Build produkční verze webu

`yarn serve`: Spuštění produkčního buildu

`yarn format`: Formátování kódu

## 🛠 Jak přispívat

Před zahájením vývoje si prosím projděte soubor [CONTRIBUTING](CONTRIBUTING.md), který obsahuje informace o všech konvencích repozitáře.

## Licence

Zdroje jsou zveřejněny pod [licencí BSD 3-Clause](LICENSE).

## Kontakty

**Koordinátoři:** [Tomáš Jeřábek](https://github.com/tjerabek), [Jindřich Oukropec](https://github.com/miiila)

**Tech leads:** [Matěj 'Horm' Horák](https://github.com/HormCodes), [Tuan Phung](https://github.com/tuanphungcz)
