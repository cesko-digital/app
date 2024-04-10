# Hacking

> [!TIP]
> Pokud si tenhle soubor prohlížíte na GitHubu, někde kolem je tlačítko, které zobrazí osnovu dokumentu.

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

Při lokálním vývoji patří do souboru `.env.local`, web i různé nástroje kolem si je odsud načtou automaticky.

| Název klíče | Popis | Kde se používá |
| ----------- | ----- | -------------- |
| AIRTABLE_API_KEY | Klíč do databáze, čtení i zápis | Prakticky všude
| ECOMAIL_API_KEY | Klíč od Ecomailu, nástroje pro hromadný mailing | Používáme pro správu newsletterů v uživatelském profilu a pro endpoint pro zájemce o newsletter
| SLACK_CLIENT_ID, SLACK_CLIENT_SECRET | Používá se pro přihlašování k webu slackovým účtem | Pouze v nastavení autentizační knihovny NextAuth
| NEXTAUTH_SECRET | Unikátní klíč, který zabezpečuje přihlašování | V kódu AFAIK nikde není, ale automaticky ho načítá knihovna NextAuth
| SLACK_SIGNING_SECRET | Tajemství používané pro autentizaci callbacků od serverů Slacku | Používáme v endpointech pro potvrzení nových účtů
| SLACK_SYNC_TOKEN | Autentizace přístupu k API Slacku | Používáme všude možně jako „univerzální“ API klíč
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

* Nebojte se psát delší soubory. Mít každou drobnost v samostatném souboru je čistě režie navíc. Lze i zobecnit – míra „procesů“ (abstrakce, dělení do souborů, dělení do funkcí, …) musí odpovídat velikosti řešeného problému. Pokud zakládáte nový soubor kvůli čtyřem řádkům kódu, je slušná šance, že děláte něco špatně. (Výjimkou jsou malé soubory dané rozhraním mezi klientem a serverem – pokud potřebujete oddělit z většího souboru běžícího na serveru malý kousek běžící na klientovi, je to OK.)
* Dvakrát se zamyslete, než přidáte novou závislost. Třikrát, pokud má sama nějaké další závislosti. Pokud jde o vyloženě větší závislost (React, GraphQL, …), domluvme se předem, jestli je to opravdu nutné. Pokud jde místo další závislosti napsat funkce o 10–20 řádcích, je to výrazně lepší. Velký počet závislostí zpomaluje build a celkově zhoršuje ergonomii práce na projektu.

Pokud jde o testy, máme k dispozici následující hierarchii:

1. Typový systém (`npm run test:types`)
2. Jednotkové (unit) testy (`npm run test`)
3. End-to-end (E2E) testy (`npm run test:e2e`)

Čím vyšší číslo v téhle hierarchii test má, tím déle trvá a je potenciálně křehčí (snáz se rozbije). Snažte se proto pohybovat co nejníže – pokud jde pro něco napsat unit test namísto E2E testu, je to lepší. A pokud jde danou invariantu vystihnout přímo v typovém systému, je to úplně nejlepší.

# Uživatelské účty a přihlašování

Hlavní uživatelské účty jsou uložené v tabulce *User Profiles*. Tady jsou data jako jméno, e-mail, kompetence a podobně. A jelikož historicky hrál ve správě uživatelských účtů důležitou roli Slack, je důležitá též tabulka _Slack Users_, kde jsou některá důležitá data získaná ze Slacku. Obě tabulky jsou navzájem provázané, kde to jde – tedy k danému slackovému účtu umíme najít odpovídající uživatelský profil a naopak.

## Založení účtu

1. Uživatel vyplní registrační formulář na na adrese app.cesko.digital/join, kde zadá základní údaje, zejména e-mail. Po odeslání formuláře uložíme do tabulky _User Profiles_ nový uživatelský profil ve stavu `unconfirmed`. Pokud už ale daný e-mail v databázi byl, registrace končí chybou.
2. Po úspěšném odeslání registračního formuláře pošleme uživateli přihlašovací mail na adresu zadanou při registraci. Prvním přihlášením se účet aktivuje, tedy přepne do stavu `confirmed`.

Historicky se proces registrace hodně měnil, takže abychom rozlišili účty založené tímto modernějším procesem, mají v poli `featureFlags` příznak `registrationV2`.

**E-mailové adresy je potřeba normalizovat**, protože z pohledu standardů i uživatele jsou Foo@bar.cz a foo@bar.cz jen dva různé zápisy jedné e-mailové adresy. Není žádoucí, abychom například dovolili založení účtu Foo@bar.cz, pokud už v databázi máme foo@bar.cz. Proto e-maily v databázi ukládáme konvertované na malá písmena a oholené od whitespace. Pokud pak v databázi vyhledáváte podle uživatelem zadaného mailu (například během přihlašování), je potřeba hledaný mail normalizovat nebo použít API, které už má normalizaci vestavěnou.

## Přihlašování

Pro přihlašování používáme knihovnu [NextAuth.js](https://next-auth.js.org), session ukládáme do JWT tokenů na klientovi. Primární přihlašovací metodou je zaslání přihlašovacího odkazu e-mailem. V databázi se o podporu přihlašování starají následující tabulky a pole:

* Tabulka User Profiles, pole `email` (přihlašovací mail) a `emailVerified` (datum posledního přihlášení e-mailem). Také je zde vazba `externalIdentities` na tabulku *Accounts* (viz níže).
* Tabulka *Sign-in Tokens* obsahuje jednorázové tokeny používané pro přihlášení e-mailem. Úspěšné přihlášení token smaže. Pokud se token nepoužije, nějakou dobu po expiraci se pomocí automatizace smaže.
* Tabulka *Accounts* obsahuje záznamy potřebné pro přihlašování externími poskytovateli identity, tedy například přes Slack (zatím jediný podporovaný způsob). Pokud má fungovat přihlášení externím poskytovatelem, musí mít daný uživatel odpovídající záznam v tabulce *Accounts*.

## Spolupráce se Slackem

Když se někdo přidá do našeho Slacku, server Slacku nám to dá vědět prostřednictvím API endpointu `/api/slack-join`. Pro každého takového nového uživatele založíme nový záznam v tabulce *Slack Users*.

Pokud má nový uživatel Slacku ověřenou e-mailovou adresu, podíváme se také, jestli nemáme uživatele se stejnou adresou v tabulce *User Profiles*. Pokud ano, vytvoříme vazbu mezi příslušnými záznamy z tabulek *User Profiles* a *Slack Users*. A kromě toho založíme nový záznam v tabulce *Accounts*, aby se uživatel mohl k aplikaci přihlašovat slackovým účtem.

# Projekty

Projekty jsou základní stavební kámen, kolem kterého se všechno točí; většina práce v Česko.Digital se odehraje v rámci některého z projektů. Na webu je najdete na adrese https://app.cesko.digital/projects.

V Airtable je klíčová tabulka [Projects](https://airtable.com/appkn1DkvgVI5jpME) v databázi Web. (Pokud nemáte přístup do Airtable, řekněte si.)

## Feature Flags

Pole `featureFlags` obsahuje pár příznaků, které mění chování projektu na webu:

| Příznak | Popis |
| ----------- | -------------- |
| `featured` | Projekt se zobrazuje prioritně, dáváme mu přednost, kde to dává smysl
| `displayProjectTeam` | Na stránce projektu se zobrazuje seznam všech členů a členek projektu

## Popis projektů

V Airtable je ve sloupci `description`, které má zapnutou podporu formátování, viz [Using rich text with Airtable](https://support.airtable.com/docs/using-rich-text-with-airtable). V API se formátovaný text posílá ve formátu Markdown, viz [Using Markdown in Airtable](https://support.airtable.com/v1/docs/using-markdown-in-airtable).

## Projektový tým

Pokud má projekt v poli `featureFlags` uvedený příznak `displayProjectTeam`, na jeho stránce se zobrazuje projektový tým. Data se berou z tabulky Teams, konkrétně pohledu [Public Team Engagements](https://airtable.com/appkn1DkvgVI5jpME/tblszIbIBAluUHvH0/viwK6KXIA78MnPE9q?blocks=hide). V nastavení pohledu je zapnuté filtrování a řazení:

* Pokud má zapojený člen týmu v poli `privacyFlags` nastavený příznak `hidePublicTeamMembership`, jeho zapojení veřejně neukazujeme.
* Pokud má dotyčné zapojení uživatele v týmu nastavený příznak `hideFromPublicView`, zapojení veřejně nezobrazujeme.

## Odkazy

Každý projekt může mít hromádku relevantních odkazů například na web, do hlavního Slackového kanálu, na zdroják na GitHubu a podobně. Odkazy jsou uložené v tabulce [Project Links](https://airtable.com/appkn1DkvgVI5jpME/tblL8S0FHemH4XyeN/viwwojyHfjZfKW7Po?blocks=hide), mezi tabulkou Projects a tabulkou Project Links je vazba 1:M (projekt může mít libovolný počet odkazů).

Každý odkaz má povinný název a povinné URL, na které vede. Kromě nich vedeme ještě příznak `featured`; pokud je zaškrtnutý, stane se z odkazu hlavní modré CTA tlačítko na projektové stránce.

Aby bylo jednodušší načítat odkazy přes API i bez joinů nebo vícenásobných dotazů, jsou všechny odkazy projektu ještě uložené (automaticky) ve sloupci `serializedLinks` ve formátu JSON:

```json
[
  {
    "name": "Slackový kanál",
    "url": "https://app.slack.com/…",
    "featured": false
  },
  {
    "name": "Web projektu",
    "url": "https://www.csgov.cz",
    "featured": true
  }
]
```

Je to prasečí hack, ale je to pohodlné pro klienta :)

# Markdown

Na různých místech, například v popisu projektů nebo akcí, používáme pro formátování textu Markdown. Běžný Markdown nám ale nevystačí na všechno, a proto používáme pro zpracování Markdownu knihovnu [Markdoc](https://markdoc.dev), která nabízí možnost přidávat vlastní tagy. Ty vypadají například takhle:

```markdown
Běžný odstavec.

{% callout %}
Zvýrazněný odstavec.
{% /callout %}

Text pokračuje…
```

Tady je použitý vlastní tag `callout`, který je pak možné například v Reactu zobrazit samostatnou komponentou. Tím získáváme možnost používat ve formátovaných textech pokročilejší prvky, aniž bychom museli používat HTML, které by bylo nepraktické na údržbu, nehledě na problematickou bezpečnost.

## Vlastní tagy

Seznam tagů, které můžete používat nad rámec běžného Markdownu:

### Callout

Něco jako „zvýrazněný boxík“, když potřebujete přitáhnout pozornost k části textu. Nemá žádné atributy, používá se takhle:

```markdown
Běžný odstavec.

{% callout %}
Zvýrazněný _odstavec_.
{% /callout %}

Text pokračuje…
```

Všimněte si, že v těle „boxíku“ můžete normálně použít další Markdown, nemusí to být jen prostý text.

### Image

Obrázek. Oproti standardnímu tagu v Markdownu podporujeme optimalizaci obrázků (zdroj může být libovolně velký, web si ho sám zmenší podle potřeby klienta) a dalších pár drobností. Příklad:

```markdown
{% image src="https://data.cesko.digital/web/projects/digitalni-inkluze/cilovky.png" alt="Cílové skupiny digitální inkluze" width=1588 height=888 /%}
```

Povinné atributy jsou `src`, `alt`, `width` a `height`; `src` je URL zdrojového obrázku (musí být uložený na `data.cesko.digital`), `alt` je textový popis obrázku a `width` + `height` jsou rozměry originálního obrázku v pixelech. Rozměry jsou povinné kvůli tomu, aby prohlížeč dopředu věděl, jak bude obrázek velký, a obsah během načítání neposkakoval (což je blbé UX). Všimněte si prosím, že rozměry jsou čísla, nikoliv řetězce – nejsou v uvozovkách.

Nepovinný je atribut `link`, do kterého můžete dát URL, na které se dá obrázkem prokliknout.

## Generované kotvy

Každý nadpis v rámci formátovaného textu dostane automaticky generovanou kotvu, na kterou se můžete `#odkazovat`. Například tento nadpis:

```markdown
## Ukázkový nadpis
```

…se v HTML zobrazí takhle:

```html
<h2 id="ukazkovy-nadpis">Ukázkový nadpis</h2>
```

…takže na něj pak můžete odkazovat pomocí `#ukazkovy-nadpis`.

Správné URL, na které se dá odkazovat, můžete snadno zjistit najetím myší poslepu na konec nadpisu – objeví se znak `#`, který je odkazem na dotyčný nadpis.
