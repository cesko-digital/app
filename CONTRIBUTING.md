# Jak přispívat

Nápady na zlepšení, hlášení bugů a pull requesty jsou vždy vítány.

## Jazyky

V anglickém jazyce:

- Kód
- Komentáře
- Commit zprávy

V českém jazyce:

- README a jakákoliv jiná dokumentace
- Issues a pull requesty

## Issues

Prosíme vás, snažte se strávit nějaký čas nad dobrým názvem a popisem issue. 

## Pull requesty

Pokud se nejedná o fork branch, prosím použijte následující formát pro svou branch: `{feature,bugfix,content}/slug` nebo `{feature,bugfix,content}/rework/slug`. 

Všechny pull requesty by měly projít code review. Code review může provést jakýkoliv dobrovolník, který je dlouhdobě aktivní na projektu. Techlead se postará o to, že review má kdo provést a bude provedeno.  

Snažíme se udržovat čistou Git historii. Je tedy doporučeno před požádáním o review historii pročistit pomocí interactive rebase. 

## Code Style

O spoustu věcí se stará ESLint a Prettier. Pokud víte o pravidlu, které zde by nemělo chybět, neváhejte ho navrhnout. 

### Organizace souborů

- _kebab-case_ pro všechny soubory a složky
- přípona `.tsx` pro všechny soubory obsahující JSX elementy nebo styly
- složka `components` je vyhrazena pro komponenty všeho druhu
- složka `pages` je vyhrazena pro statické stránky (soubor `about.tsx` vygeneruje stránku `/about`)
- složka `layout` je vyhrazena pro dynamické stránky generované pomocí Gatsby
- organizace komponent, stylů a stories:

```
src
  components
    component
      index.tsx
      styles.tsx  // pokud existují méně než 3 stylizované komponenty, udržujte v index.tsx
      index.stories.tsx
      sub-component // pokud má více než index.tsx, v opačném případě sub-component.tsx
        index.tsx
        styles.tsx // pokud existují méně než 3 stylizované komponenty, udržujte v sub-component.tsx
```

### Styled Components

Používejte následující import ze `styles.tsx` pro jasné oddělení, že se jedná o CSS komponentu: 

```typescript
import * as S from './styles';
```
