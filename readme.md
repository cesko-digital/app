Repo obsahuje kód aplikace pro zapojování lidí na různých projektech Česko.Digital. Aplikace je napsaná v [TypeScriptu](https://www.typescriptlang.org) a [Next.js](http://nextjs.org/docs/app/building-your-application/routing) a hostovaná na [Vercelu](http://vercel.com), data se načítají převážně z [Airtable](https://airtable.com). Produkční verze běží na <app.cesko.digital>.

# Vývoj

## Instalace

Pokud chcete s webem něco dělat, je potřeba si zejména naklonovat repository a nainstalovat závislosti:

```bash
$ git clone git@github.com:cesko-digital/web.git cesko.digital
$ cd cesko.digital
$ npm ci
$ npm run dev
```

K běhu ale budete potřebovat řadu secrets, například pro připojení do databáze, viz níže. Zatím nevíme, jak s tím nejlíp naložit – pokud si to chcete vyzkoušet, ozvěte se v našem Slacku.

## Secrets

| Název klíče | Popis | Kde se používá |
| ----------- | ----- | -------------- |
| AIRTABLE_API_KEY | Klíč do databáze, čtení i zápis | Prakticky všude
| ECOMAIL_API_KEY | Klíč od Ecomailu, nástroje pro hromadný mailing | Používáme pro správu newsletterů v uživatelském profilu a pro endpoint pro zájemce o newsletter
| SLACK_CLIENT_ID, SLACK_CLIENT_SECRET | Používá se pro přihlašování k webu slackovým účtem | Pouze v nastavení autentizační knihovny NextAuth
| NEXTAUTH_SECRET | Unikátní klíč, který zabezpečuje přihlašování | V kódu AFAIK nikde není, ale automaticky ho načítá knihovna NextAuth
| SLACK_SIGNING_SECRET | Tajemství používané pro autentizaci callbacků od serverů Slacku | Používáme v endpointech pro potvrzení nových účtů
| SLACK_SYNC_TOKEN | Autentizace přístupu k API Slacku | Používáme všude možně jako „univerzální“ API klíč
| SLACK_GREET_BOT_TOKEN | API klíč Slacku | Používáme pro agendu spojenou s Greetbotem – zejména uvítání nových uživatelů
| SLACK_BAZAAR_BOT_TOKEN | API klíč Slacku | Používáme pro přístup ke Slacku v rámci automatizace služby Market-place
| SLACK_BAZAAR_CALLBACK_SECRET | Tajemství pro autentizaci callbacků od Slacku | Používáme při zpracování dialogů slackbota pro službu Market-place
| YOUTUBE_API_KEY | API klíč pro YouTube | Používáme pro načítání seznamu videí z našich playlistů, například na stránkách projektů
| PLAUSIBLE_API_KEY | API klíč pro službu Plausible, kterou používáme pro webovou analytiku | Používá se zejména pro statistické endpointy, které generují statistiky pro grafy v Datawrapperu
| SENDGRID_API_KEY | API klíč pro Sendgrid (rozesílání mailů) | Používáme pro rozesílání notifikací na nové hledané role
| SHASUM_SECRET | Náhodný klíč používaný interně pro autentizaci | Používáme například pro autentizaci odhlašovacích odkazů z notifikačních e-mailů

## Code Style, architektura, testy

Pár postřehů pro jednodušší orientaci a spolupráci:

* Kód a commity jsou anglicky, pull requesty a všechno další česky
* Používáme automatické formátování přes [Prettier](https://prettier.io), doporučujeme správně nastavit VS Code
* Používáme [ESLint](https://eslint.org), doporučujeme správně nastavit VS Code a zkontrolovat přes `npm run lint` před pushnutím

Poznámky k architektuře:

* Nebojte se psát delší soubory. Mít každou drobnost v samostatném souboru je čistě režie navíc. Lze i zobecnit – míra „procesů“ (abstrakce, dělení do souborů, dělení do funkcí, …) musí odpovídat velikosti řešeného problému. Pokud zakládáte nový soubor kvůli čtyřem řádkům kódu, je slušná šance, že děláte něco špatně.
* Dvakrát se zamyslete, než přidáte novou závislost. Třikrát, pokud má sama nějaké další závislosti. Pokud jde o vyloženě větší závislost (React, GraphQL, …), domluvme se předem, jestli je to opravdu nutné. Pokud jde místo další závislosti napsat funkce o 10–20 řádcích, je to výrazně lepší. Velký počet závislostí zpomaluje build a celkově zhoršuje ergonomii práce na projektu.

Pokud jde o testy, máme k dispozici následující hierarchii:

1. Typový systém (`npm run test:types`)
2. Jednotkové (unit) testy (`npm run test`)
3. End-to-end (E2E) testy (`npm run test:e2e`)

Čím vyšší číslo v téhle hierarchii test má, tím déle trvá a je potenciálně křehčí (snáz se rozbije). Snažte se proto pohybovat co nejníže – pokud jde pro něco napsat unit test namísto E2E testu, je to lepší. A pokud jde danou invariantu vystihnout přímo v typovém systému, je to úplně nejlepší.

# Kontakt

Nejvíc se probere na Slacku v kanálu [#run-ceskodigital_web](https://cesko-digital.slack.com/archives/CHG9NA23D). Pokud nejste na Slacku Česko.Digital, [můžete se přidat tady](https://app.cesko.digital/join).