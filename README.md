Tohle repo obsahuje kód webu Česko.Digital, produkční verze běží na https://cesko.digital.

# Použité technologie

Jde o převážně statický web napsaný v kombinaci [TypeScript](https://www.typescriptlang.org), [React](https://reactjs.org) a [Next.js](https://nextjs.org). Výsledek běží na [Vercelu](https://vercel.com/).

Pro uložení dat používáme převážně [Airtable](https://airtable.com), odkud čteme data přes jejich API. Celek tedy funguje zhruba tak, že načteme hromadu dat z Airtable, přes Next.js a React vygenerujeme hromadu HTML a všechno to nahrneme na Vercel. Po stažení ke klientovi zase „obživne“ React aplikace, ale interaktivitu na straně klienta používáme zatím minimálně.

# Hacking

⚠️ Pokud si chcete web sputit lokálně, bohužel zatím budete potřebovat API klíče pro přístup do Airtable, poptejte je na našem Slacku v kanálu [\#run-ceskodigital_web](https://cesko-digital.slack.com/archives/CHG9NA23D). Lepší řešení je na cestě, viz [\#418](https://github.com/cesko-digital/web/issues/418). Pokud máte přímo přístup do Airtable, [můžete si vygenerovat svůj vlastní API klíč](https://support.airtable.com/hc/en-us/articles/219046777).

Až budete mít API klíče k Airtable, můžete si projekt naklonovat a spustit:

```bash
$ git clone git@github.com:cesko-digital/web.git cesko.digital
$ cd cesko.digital
$ echo "AIRTABLE_API_KEY=dostanete_na_slacku" > .env.local
$ yarn install
$ yarn dev
```

Pokud byste rádi s něčím pomohli, mrkněte na tickety označené jako [good first issue](https://github.com/cesko-digital/web/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

Další informace najdete v souboru [CONTRIBUTING](CONTRIBUTING.md).

# Kontakt

Nejvíc se probere na Slacku v kanálu [\#run-ceskodigital_web](https://cesko-digital.slack.com/archives/CHG9NA23D). Pokud nejste na Slacku Česko.Digital, [můžete se přidat tady](https://join.cesko.digital).