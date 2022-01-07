Tohle repo obsahuje kód webu Česko.Digital, produkční verze běží na https://cesko.digital.

# Použité technologie

Jde o převážně statický web napsaný v kombinaci [TypeScript](https://www.typescriptlang.org), [React](https://reactjs.org) a [Next.js](https://nextjs.org). Výsledek běží na [Vercelu](https://vercel.com/).

Pro uložení dat používáme převážně [Airtable](https://airtable.com), odkud čteme data přes jejich API. Celek tedy funguje zhruba tak, že načteme hromadu dat z Airtable, přes Next.js a React vygenerujeme hromadu HTML a všechno to nahrneme na Vercel. Po stažení ke klientovi zase „obživne“ React aplikace, ale interaktivitu na straně klienta používáme zatím minimálně.

# Hacking

Základní použití je jednoduché:

```bash
$ git clone git@github.com:cesko-digital/web.git cesko.digital
$ cd cesko.digital
$ yarn install
$ yarn dev
```

Pokud byste rádi s něčím pomohli, mrkněte na tickety označené jako [good first issue](https://github.com/cesko-digital/web/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

Další informace najdete v souboru [CONTRIBUTING](CONTRIBUTING.md).

# Kontakt

Nejvíc se probere na Slacku v kanálu [\#run-ceskodigital_web](https://cesko-digital.slack.com/archives/CHG9NA23D). Pokud nejste na Slacku Česko.Digital, [můžete se přidat tady](https://join.cesko.digital).