# Statistické API

Web poskytuje sadu endpointů, které zpracovávají různá data o fungování Česko.Digital a sypou je ven ve formátu CSV pro vizualizaci [Datawrapperem](https://www.datawrapper.de). Pokud nevyhnil odkaz, výsledné grafy lze najít například [na naší wiki](https://cesko-digital.atlassian.net/l/cp/LYWffaN4).

Obecně řečeno by bylo ideální všechna tato data přesypávat do nějaké sdílené databáze, odkud bychom je mohli analyzovat pomocí nějakého BI nástroje ([viz tohle vlákno na Slacku](https://cesko-digital.slack.com/archives/CS7RPPVUL/p1674120322136839)), ale v praxi jsme nenašli žádné dostatečně jednoduché řešení, takže tahle sbírka skriptů ve spojení s Datawrapperem je pro nás zatím řešení s dobrým poměrem cena/výkon.

Endpointy je určitě dobré kešovat, protože tahají velké objemy dat z různých databází. Dejte si proto prosím pozor, ať posíláte buď rozumné kešovací hlavičky, anebo ať je endpoint přímo statický, tj. spočítá výstup během překladu webu a následně už klientům jen sype statický výstup.
