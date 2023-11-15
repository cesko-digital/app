# Statistické API

Web poskytuje sadu endpointů, které zpracovávají různá data o fungování Česko.Digital a sypou je ven ve formátu CSV pro vizualizaci [Datawrapperem](https://www.datawrapper.de). Pokud nevyhnil odkaz, výsledné grafy lze najít například [na naší wiki](https://cesko-digital.atlassian.net/l/cp/LYWffaN4).

Obecně řečeno by bylo ideální všechna tato data přesypávat do nějaké sdílené databáze, odkud bychom je mohli analyzovat pomocí nějakého BI nástroje ([viz tohle vlákno na Slacku](https://cesko-digital.slack.com/archives/CS7RPPVUL/p1674120322136839)), ale v praxi jsme nenašli žádné dostatečně jednoduché řešení, takže tahle sbírka skriptů ve spojení s Datawrapperem je pro nás zatím řešení s dobrým poměrem cena/výkon.

## Kešování a rychlost buildu

Endpointy je v každém případě nutno kešovat, jednak kvůli výkonu, jednak kvůli bezpečnosti (abychom nevyrobili snadný DoS vektor). Řada z nich by dokonce mohla být úplně statická, tj. výstup bychom mohli spočítat během buildu webu a následně už klientům jen sypat statický výstup. *To ale nechceme*, hlavně protože nám hodně záleží na rychlosti buildu (developer experience) a generování těch dat během buildu by dlouho trvalo. Takže doporučujeme nechat endpointy dynamické, ale rozumnou dobu je kešovat:

```typescript
// Endpoint bude dynamický, i kdyby nebylo nutně potřeba
export const dynamic = "force-dynamic";
// Data se revalidují jednou za pět minut
export const revalidate = 300;

export async function GET() {…}
```