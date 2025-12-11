# Statistické API

Web poskytuje sadu endpointů, které zpracovávají různá data o fungování Česko.Digital a sypou je ven ve formátu CSV pro vizualizaci [Datawrapperem](https://www.datawrapper.de). Výsledné grafy jde najít například [na tomhle jednoduchém dashboardu](https://app.cesko.digital/stats).

Obecně řečeno by bylo ideální všechna tato data přesypávat do nějaké sdílené databáze, odkud bychom je mohli analyzovat pomocí nějakého BI nástroje ([viz tohle vlákno na Slacku](https://cesko-digital.slack.com/archives/CS7RPPVUL/p1674120322136839)), ale v praxi jsme nenašli žádné dostatečně jednoduché řešení, takže tahle sbírka skriptů ve spojení s Datawrapperem je pro nás zatím řešení s dobrým poměrem cena/výkon.

## Kešování a rychlost buildu

Řada ze statistických endpointů by mohla být statická, tj. data bychom mohli spočítat během buildu a následně už klientům jen sypat statický výstup. *To ale nechceme*, hlavně protože nám hodně záleží na rychlosti buildu a generování těch dat během buildu by dlouho trvalo. Takže doporučujeme nechat endpointy dynamické, ale rozumnou dobu je kešovat:

```typescript
// Endpoint bude dynamický, i kdyby nebylo nutně potřeba
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(…, {
    status: 200,
    headers: {
      // Data se kešují pět minut
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
    },
  });
}
```