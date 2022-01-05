# Style Guide

* V dokumentaci, pull requestech a issues používejte češtinu, v commitech a zdrojovém kódu angličtinu.
* Zapněte si automatické formátování kódu pomocí Prettier. Nemusíme všichni souhlasit se všemi změnami, které Prettier udělá, ale nechat to na něm je lepší než se o tom donekonečna přít :)

# Proměnné prostředí

Pro některé funkce jsou potřeba proměnné prostředí. Tyhle používáme:

* `AIRTABLE_API_KEY` je API klíč pro přístup do Airtable, naší DB. Bez něj se web momentálně nepřeloží, což bychom výhledově chtěli spravit.
* `ECOMAIL_API_KEY` je API klíč pro zapisování nových zájemců o newsletter do Ecomailu.

Velmi elegantně se ty proměnné dají nastavit pomocí souboru `.env.local`, [viz dokumentaci Next.js](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables).

# Poznámky k architektuře

* Nebojte se psát delší soubory. Mít každou drobnost v samostatném souboru je čistě režie navíc. Lze i zobecnit – míra „procesů“ (abstrakce, dělení do souborů, dělení do funkcí, …) musí odpovídat velikosti řešeného problému. Pokud zakládáte nový soubor kvůli čtyřem řádkům kódu, je slušná šance, že děláte něco špatně.
* Dvakrát se zamyslete, než přidáte novou závislost. Třikrát, pokud má sama nějaké další závislosti. Pokud jde o vyloženě větší závislost (React, GraphQL, …), domluvme se předem, jestli je to opravdu nutné. Pokud jde místo další závislosti napsat funkce o 10–20 řádcích, je to výrazně lepší. Velký počet závislostí zpomaluje build a celkově zhoršuje ergonomii práce na projektu.