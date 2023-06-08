# Projekty

Projekty jsou základní stavební kámen, kolem kterého se všechno točí; většina práce v Česko.Digital se odehraje v rámci některého z projektů. Na webu je najdete na adrese https://cesko.digital/projects.

V Airtable je klíčová tabulka [Projects](https://airtable.com/appkn1DkvgVI5jpME) v databázi Web. (Pokud nemáte přístup do Airtable, řekněte si.)

## Popis projektů

V Airtable je ve sloupci `description`, které má zapnutou podporu formátování, viz [Using rich text with Airtable](https://support.airtable.com/docs/using-rich-text-with-airtable). V API se formátovaný text posílá ve formátu Markdown, viz [Using Markdown in Airtable](https://support.airtable.com/v1/docs/using-markdown-in-airtable).

Protože si v popisu projektů nevystačíme s běžným Markdownem, zpracováváme popis pomocí [Markdoc](https://markdoc.dev), který nabízí možnost přidávat vlastní tagy. Ty vypadají například takhle:

```markdown
Běžný odstavec.

{% callout %}
Zvýrazněný odstavec.
{% /callout %}

Text pokračuje…
```

Tady je použitý vlastní tag `callout`, který je pak možné například v Reactu zobrazit samostatnou komponentou. Tím získáváme možnost používat v popisu projektů pokročilejší prvky, aniž bychom museli používat HTML, které by bylo nepraktické na údržbu, nehledě na problematickou bezpečnost.

### Podporované tagy

Seznam tagů, které můžete používat v popisu projektů nad rámec běžného Markdownu:

#### Callout

Něco jako „zvýrazněný boxík“, když potřebujete přitáhnout pozornost k části textu. Nemá žádné atributy, používá se takhle:

```markdown
Běžný odstavec.

{% callout %}
Zvýrazněný _odstavec_.
{% /callout %}

Text pokračuje…
```

Všimněte si, že v těle „boxíku“ můžete normálně použít další Markdown, nemusí to být jen prostý text.

#### Image

Obrázek. Oproti standardnímu tagu v Markdownu podporujeme optimalizaci obrázků (zdroj může být libovolně velký, web si ho sám zmenší podle potřeby klienta) a dalších pár drobností. Příklad:

```markdown
{% image src="https://data.cesko.digital/web/projects/digitalni-inkluze/cilovky.png" alt="Cílové skupiny digitální inkluze" width=1588 height=888 /%}
```

Povinné atributy jsou `src`, `alt`, `width` a `height`; `src` je URL zdrojového obrázku (musí být uložený na `data.cesko.digital`), `alt` je textový popis obrázku a `width` + `height` jsou rozměry originálního obrázku v pixelech. Rozměry jsou povinné kvůli tomu, aby prohlížeč dopředu věděl, jak bude obrázek velký, a obsah během načítání neposkakoval (což je blbé UX). Všimněte si prosím, že rozměry jsou čísla, nikoliv řetězce – nejsou v uvozovkách.

Nepovinný je atribut `link`, do kterého můžete dát URL, na které se dá obrázkem prokliknout.

### Generované kotvy

Každý nadpis v rámci popisu projektu dostane automaticky generovanou kotvu, na kterou se můžete `#odkazovat`. Například tento nadpis:

```markdown
## Ukázkový nadpis
```

…se v HTML zobrazí takhle:

```html
<h2 id="ukazkovy-nadpis">Ukázkový nadpis</h2>
```

…takže na něj pak můžete odkazovat pomocí `#ukazkovy-nadpis`.

Správné URL, na které se dá odkazovat, můžete snadno zjistit najetím myší poslepu na konec nadpisu – objeví se znak `#`, který je odkazem na dotyčný nadpis.

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

## Stavy projektů

### Draft

Náhledová verze, není určena pro běžné návštěvníky, ale pouze pro editory, aby si mohli odladit data před vydáním. Jakákoliv data spojená s projektem v tomto stavu (například eventy nebo příležitosti) se berou též jako náhledová a neveřejná.

**TODO**: Aktuálně a přechodně implementujeme draft projekty tak, že je nezobrazujeme v přehledu projektů, ale zobrazujeme příležitosti a další data s nimi spjatá (ze kterých ale nesmí jít prokliknout na detail projektu).

### Internal

Interní projekt Česko.Digital, například Příručka Česko.Digital nebo edu.digital. Tyto projekty chceme zobrazovat v přehledu projektů nebo odlišným způsobem, jinak se chovají úplně stejně jako projekty ve stavu `running`.

**TODO**: Aktuálně a přechodně implementujeme stav `internal` stejně jako `draft`, tedy projekty nezobrazujeme v přehledu, ale zobrazujeme příležitosti a další data s nimi spjatá (ze kterých ale nesmí jít prokliknout na detail projektu).

### Incubating

Projekt běží a je v inkubační neboli _pre-product_ fázi. Hledáme správné zadání, cílovku, etc. Na webu zobrazujeme všude, ale můžeme využít odlišnou prezentaci, aby návštěvník projekt rozeznal od projektů v realizační fázi.

Pro skončení inkubace projekt může přejít do stavu `running` (realizační fáze) nebo `finished` (skončil v Česko.Digital a může například hledat realizační tým jinde).

### Running

Projekt běží a je v realizační fázi. (Před kterou mohl a nemusel projít inkubační fází v Česko.Digital.) Na webu zobrazujeme všude.

### Finished

Projekt byl „dokončen“. Neznamená to, že zavřel krám – projekty, které se u nás inkubovaly, mohou přikročit k realizaci, a projekty, které u nás byly v realizační fázi, mohou po dokončení například hledat další rozvoj nebo údržbu jinde.
