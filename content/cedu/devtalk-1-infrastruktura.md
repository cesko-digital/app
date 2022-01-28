---
title: "DevTalk #1 – Infrastruktura"
cover: https://data.cesko.digital/img/080fd790.jpg
date: 2021-11-13-10-10
description: "V prvním dílu série DevTalk se podíváme na infrastrukturu a DevOps, jak se na ně koukáme v rámci Česko.Digital. Na příkladu si ukážeme Terraform, Github Actions a jak to vše zapadá do našeho dobrovolnického workflow."
videoUrl: "https://www.youtube.com/embed/5IlYHMlIZCc"
tags:
  - "infrastruktura"
  - "DevTalk"
  - "AWS"
  - "Terraform"
  - "GitHub"
toc:
  - title: "Úvod"
    time: "0:00"
    start: 1
  - title: "Terraform"
    time: "3:30"
    start: 210
  - title: "GitHub Actions"
    time: "22:07"
    start: 1327
  - title: "Plan on PR"
    time: "31:40"
    start: 1900
  - title: "Parametrizace"
    time: "42:14"
    start: 2534
  - title: "Synchronizace obsahu"
    time: "55:20"
    start: 3320
  - title: "FAQ: Vývojová prostředí"
    time: "01:04:20"
    start: 3860
  - title: "FAQ: Cena cloudu"
    time: "01:14:00"
    start: 4440
  - title: "Shrnutí"
    time: "01:19:20"
    start: 4760
resources:
  - type: Github
    title: "Zdrojové kódy"
    url: "https://github.com/cesko-digital/infra-demo"
  - type: Slack
    title: "Podpora na Slacku"
    url: "https://cesko-digital.slack.com/archives/CS7RPPVUL"
  - type: Other
    title: "Dokumentace Terraformu"
    url: "https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket"
credits:
  - title: "Obsah"
    name: "Martin Wenisch a Tomáš Znamenáček"
  - title: "Post-produkce"
    name: "Lukáš Návesník"
  - title: "Přepis a korektury"
    name: "Kateřina Peřinová a Vanda Adlerová"
---

[0:00](?start=1)

Tomáš: Dnes bychom s vámi rádi prošli takovou kuchařku infrastruktury, tak jak o ní uvažujeme, jak s ní pracujeme v Česko.Digital. Rozhodli jsme se začít tento seriál právě infrastrukturou, protože je to jedno z nejčastějších témat, které řešíme s projekty v Česko.Digital.

Infrastrukturou myslíme to, kde a jak běží databáze, kam se nahrávají data, kde a jak běží CDN a tyhle věci. Klíčový princip pro nás je, aby všechny věci byly pokud možno v rámci jednoho repository na GitHubu. Tedy aby jedno repo na GitHubu obsahovalo dejme tomu frontend, backend a infrastrukturu najednou. Takže když si někdo převede k sobě tohle repo, dostane všechny ty tři věci. Abychom mohli snadno projekt předat mateřské organizaci.

Ten důvod, proč vlastně takhle mocně sázíme na GitHub je hlavně to, že většina lidí ho zná a umí s ním pracovat. Je tam nízký práh interakce a je super, že díky jejich automatizační platformě GitHub Actions se dá spousta z věcí, které běžně děláme, automatizovat, což vám dnes ukážeme.

Teď se můžeme pustit do konkrétního příkladu. Když budeme mluvit o infrastruktuře, tak klíčovým nástrojem pro práci s ní je Terraform. Je to nástroj, který umožňuje deklarativně popsat žádoucí infrastrukturu v kódu, a pak přímo tu infrastrukturu vytvořit u poskytovatele, kterého si vyberete. V našem případě jsou to nejčastěji Amazon Web Services, familiárně „AWSko“.

Martin: Já k tomu ještě ve stručnosti dodám, proč jsme si vybrali právě GitHub. Ze všech těch nástrojů je na GitHubu největší komunita, což využívá většina open source softwaru, která se vytváří na GitHubu. Další výhoda je, že je nejvíce z těch nástrojů transparentní, že víceméně všechno, co se v open source děje, je veřejné a jednoduše veřejně přístupné. A taky v neposlední řadě to, že většina nástrojů, jejich Premium, je pro open source projekty zdarma. My budeme pracovat s projektem [cesko-digital/infra-demo](https://github.com/cesko-digital/infra-demo). To, o co nám jde, je ukázat celou pipelinu té infrastruktury, nejít do hloubky, což znamená neřešit konkrétní věci, co deployujeme, ale na minimálním příkladu si ukázat vlastně kompletní cestu, jak ten GitHub a Terraform používáme.

[3:30](?start=210)

Martin: Teď bych rád ukázal, co to je Terraform. Je to nástroj společnosti HashiCorp a jeho cílem je deklarativně popsat infrastrukturu v kódu, a pak se zeptat Terraformu: „Terraforme, co se musí stát, abychom se do tohoto stavu popsané infrastruktury dostali?“ Pro různé providery: my v Česko.Digital pracujeme v AWS, ale je to možné víceméně pro jakéhokoliv public cloud providera, případně i nějaké menší providery, pokud mají plugin Terraform. My tedy budeme používat AWS a plugin Terraformu pro AWS.

Konkrétně tohle je nejminimálnější příklad toho, co Terraform může znamenat. Deklarujeme v souboru terraform.tf v nějaké podsložce `infrastructure/aws` v repozitáři. Terraform už ví, že si má brát tyto soubory. Když se podíváte na většinu repositářů Česko.Digital, tak tam najdete jako složku `infrastructure` a tam většinou AWS pro ty projekty, které používají AWS. Ten resource, na kterém si budeme ukazovat všechny naše příklady, protože nám nejde o to budovat infrastrukturu a učit se nástroje AWS, je `s3_bucket`.

```hcl
terraform {
  required_version = "= 0.15.4"

  required_providers {
    aws = ">= 3.28.0"
  }
}

provider "aws" {
  region = "eu-central-1"
}

resource "aws_s3_bucket" "data-bucket" {
  bucket = "1-terraform-cd-demo"
  acl    = "private"
}
```

[5:40](?start=340)

Martin: Tomáši, co to je `s3_bucket`?

Tomáš: `s3_bucket` neboli kyblíček (hezky česky řečeno) je takový základní stavební kámen infrastruktury v AWS. Je to komponenta, která je určena pro ukládání dat. Takže pokud do AWSka potřebujete uložit libovolná data ve formě souboru – nepotřebujete tedy databázi, ale potřebujete uložit pár souborů – tak vždycky to ukládáte do nějakého kyblíčku na S3, který se potom propojuje s dalšími komponentami a staví se z toho nějaká složitější infrastruktura. Ale kyblíček v S3 je taková z nejjednodušších komponent. Proto jsme si ji vybrali pro ukázku té infrastruktury.

Martin: Já ukážu, jak to vypadá naživo v AWS. Toto je náš AVS účet a služba S3 a všechny buckety, které teď konkrétně máme. Náš cíl je spravovat tady navíc ještě jeden bucket, který se bude jmenovat `1-terraform-cd-demo`. Začíná jedničkou, protože chceme, aby byl nahoře a nemuseli jsme ho hledat. A chceme, aby byl `private`. To je všechno, čeho teď chceme dosáhnout na této infrastruktuře, aniž bychom to museli klikat přes _Create Bucket_.

[6:55](?start=415)

Martin: Já udělám malou odbočku toho, co se děje tady v tom prostředí, které mám. Je to IntelliJ Idea. Jde použít víceméně jakýkoliv jiný textový editor, například VSCode. A mám tam instalovaný plugin pro Terraform, který mi pomáhá tím, že mi u souborů s infrastrukturou poskytuje IntelliSense a můžu například vědět, co všechno za parametry má, třeba ten zdroj `aws_s3_bucket`. Navíc mám terminál, který je ve složce `infrastructure/aws`, a mám nainstalovaný nástroj Terraform verzi 0.15.4. Když si budete procházet stránky Terraformu, tak doporučuji projít si nejdřív „Get Started“, kde si projdete pro váš vybraný cloud tím úplně nejběžnějším příkladem instalování samotného Terraformu.

[8:07](?start=487)

Čímž se dostanete do stavu, že budete mít terminál a budete tam mít funkční Terraform. V tom samém návodu se dozvíte, že první příkaz, který v Terraformu potřebujete, je `init`, který v podstatě připraví všechno k tomu, aby Terraform mohl fungovat. Stáhne pluginy, které se nadefinovaly, pro nás je to AWS ve verzi větší než 3.28. Výborně, teď je víceméně všechno připravené a už se můžeme Terraformu ptát a dávat mu nějaké příkazy. Jak jsme říkali na začátku, toto je deklarativní zápis infrastruktury, kterou chceme mít. Je to v podstatě ten stav, kam se chceme dostat. A my se ptáme Terraformu, jak se do tohoto stavu dostaneme z konkrétního stavu, který teď existuje. Ten příkaz je konkrétně `terraform plan`, kdy my se teda Terraformu ptáme: Terraforme, řekni nám, co se musí stát, abychom se dostali do finálního stavu?

A Terraform nám řekne, že aby se to mohlo stát, musí právě vytvořit právě ten kyblíček. To znamená, vytvoří jeden zdroj, nic víc. Terraform nejenom že vytváří ten plán, ale dokáže to za nás podle toho plánu i sám naklikat. V podstatě to, co udělá, konkrétně dalším, třetím, důležitým commadem Terraformu `apply`, kde mi ten Terraform přes AWS API vytvoří to, co nám řekl, to znamená vytvoří tento bucket. Ještě se nás ptá, jestli to opravdu chceme udělat. My to opravdu chceme udělat.

Tomáš: Mimochodem tady je hromada parametrů ukázaná, přitom my jsme vlastně prosili o bucket, kde jsou zadané jen dva parametry, a teď Terraform říká, že vytvoří bucket, který bude mít všechny tyto parametry. To jsou nějaké výchozí hodnoty?

Martin: Ano. Když se podíváte na dokumentaci Terraformu – což doporučuji si projít, protože Terraform má výbornou dokumentaci – tedy když se třeba podívám na resource `s3_bucket`, což znamená `aws_s3_bucket`, název toho resource je první věc hned za resource a další je jméno toho resource, tak se dozvím několik velmi důležitých věcí. První jsou nejtradičnější příklady použití – nějaké minimální i nějaké více komplikované. Druhá zásadní věc jsou tzv. argumenty. Argumenty jsou to, čím můžu daný zdroj definovat. Já jsem si třeba vzal jen bucket, což je název toho bucketu a vzal jsem si `acl`, což znamená jeho viditelnost. Chci, aby byl `private`. Klidně bych tam mohl přidat podle dokumentace další věci. Když bych chtěl například ten bucket šifrovaný, tak tady dám `server_side_encryption_configuration`, s čímž mi může pomoct můj plugin pro IntelliJ, a mohl bych si takto definovat bucket, který by byl šifrovaný.

[11:42](?start=702)

Teď se podíváme na výsledek našeho Terraform apply, kde vytvářel `s3_bucket` a za 4 vteřiny ho vytvořil, což znamená, že ten Terraform `apply` doběhl úspěšně. Můžeme se podívat, jestli je to pravda. Tady vidíme náš kyblíček, který je zatím prázdný. Pokusíme se ho naplnit a zužitkovat časem.

Tomáš: Takže teď se vlastně stalo úplně to stejné jako bych přišel do té administrační konzole, klikl na _Create Bucket_ a napsal tam, že chci kyblíček s tímto názvem a že chci, aby byl soukromý. Tak se stalo přesně totéž. Akorát místo toho, abychom to klikali ručně, tak jsme to popsali v definici té infrastruktury, nějakým formálním jazykem, a Terraform to poté naklikal za nás.

Martin: Je to přesně tak. A když už jsme u té dokumentace, tak zmíním ještě druhou důležitou věc, a to atributy. Na rozdíl od argumentů, které nám víceméně definují zdroj, atributy popisují ten zdroj ve chvíli, kdy je vytvořený. Například pokud znáte AWS, tak jakýkoli resource má ARN (Amazon Resource Name), a ten se vytvoří až ve chvíli, kdy třeba v našem případě ten bucket je vytvořený. A přes tyto attributes my potom můžeme přistupovat, přes Terraform, k jednotlivým attributes a používat je kdekoliv jinde v tom kódu. Například kdybychom do toho scriptu chtěli přidat `output`, cože je něco jako vyprintovaní nějaké hodnoty, a chtěli bychom vyprintovat právě to ARN nově vytvořeného bucketu, tak to můžeme v podstatě takto adresovat. Když se podíváme, co nám vytvořilo:

```hcl{18-20}
terraform {
  required_version = "= 0.15.4"

  required_providers {
    aws = ">= 3.28.0"
  }
}

provider "aws" {
  region = "eu-central-1"
}

resource "aws_s3_bucket" "data-bucket" {
  bucket = "1-terraform-cd-demo"
  acl    = "private"
}

output "s3-arn" {
  value = aws_s3_bucket.data-bucket.arn
}
```

Tomáš: Tohle mě zajímá. Teď když necháme znovu proběhnout ten Terraform, tak on už se nebude podruhé snažit vytvářet ten kyblíček, protože ten kyblíček už existuje. Takže teď by to mělo udělat – nemělo by to udělat nic a jedině to vypíše ten side effect, vypíše to ARN toho kyblíčku. Je to tak?

Martin: Ano, je to přesně tak. Terraform se podívá na state, ví, že ten kyblíček už tam je, takže ho nechce vytvořit. Jediné, co se snaží vytvořit, je, že my jsme přidali output, kde ten `s3-arn` je opravdu ARN toho našeho kyblíčku `terraform-cd-demo`, který jsme tady víceméně přes ten attribute adresovali.

[14:43](?start=883)

Tomáš: Tímhle jsme si ale ještě nijak zvlášť nepomohli. Místo toho, abychom to naklikali ručně, tak to za nás udělal robot. A jediné, v čem jsme pokročili, je, že tu infrastrukturu máme někde popsanou. Pokud někdo chce vědět, jak ta infrastruktura vypadá, tak nemusí chodit do konzole AWS, ale má jí tady popsanou. Ale jinak jsme žádný zásadní pokrok neudělali.

Martin: Je to přesně tak. Víceméně to, co jsme udělali, je, že při tom lokálním behu Terraformu jsme docílili toho, že já nemusím nic klikat, ale běží mi to tady v konzoli. Ale pořád potřebuji přístup do AWS. Tahleta konzole je vlastně spárovaná s tím AWS účtem přes nějaké klíče. To, jak to jde posunout a na co bychom se rádi podívali teď je, jak to můžeme propojit s GitHubem a jak můžeme využít právě GitHub Actions. A když se podíváte na to, co vlastně ten Terraform vytvořil lokálně, v té lokální složce, tak to jsou nějaké jeho metasoubory, což jsou ty providery, co postahoval, a je to tzv. terraform state. Ten terraform state je soubor, kam si Terraform zapisuje aktuální stav na AWS. Je tam například zapsané, že tenhleten kyblíček, který se jmenuje `1-terraform-cd-demo`, vytvořil on a vytvořil ho za nějakých podmínek. A oproti tomuto stavu on si dělá změny. Tak pozná, že má spravovat ten kyblíček `1-terraform-cd-demo`.

Tomáš: Takže vlastně když ten Terraform startuje, vezme si ten stávající stav (ten může třeba aktualizovat z AWS), udělá rozdíl oproti žádoucímu stavu, vypadne mu z toho seznam akcí, co je potřeba udělat, aby současný stav odpovídal tomu požadovanému, a to je to, co ti vypíše: „hodlám udělat tohle a tohle“ a ty řekneš: „jo udělej to“ a proběhne to.

[17:05](?start=1025)

Martin: A protože my pracujeme lokálně, tak se ten stav uloží lokálně do složky. Pokud bychom chtěli přejít do cloudu a přejit na GitHub a všechno automatizovat, potřebujeme, aby se ten stav nevytvářel lokálně. Vlastně vůbec nebudeme s Terraformem pracovat lokálně, chceme s ním pracovat jenom přes GitHub Actions. To znamená, že musíme soubor `terraform.tfstate` dostat na místo, kam se k němu dostane například běhové prostředí GitHubu. A protože pracujeme s AWS, tak rovnou využijeme toho, že máme službu S3, a vytvoříme tam kyblíček, do kterého uložíme ten `tfstate`. To je výjimka toho, že věci děláme automaticky. Tento kyblíček musíme vytvořit ručně.

Tomáš: To je klasický problém slepice/vejce. Na to, aby fungoval Terraform, potřebujeme kyblíček, takže musíme to založit ještě předtím, než to spustíme.

Martin: Je to přesně z toho důvodu. Takže ten kyblíček si vytvoříme ručně s defaultními hodnotami. Máme ho vytvořený tady. Zatím prázdný.

[18:29](?start=1109)

A ještě než to budu měnit, ukážu další command Terraformu, který je velmi důležitý pro testování. Kdy víceméně všechno, co ten Terraform vytvořil, chceme zase zničit.

Ten command se jmenuje `destroy`. On se zase podívá na ten stav, a zjistí, že tam má jeden kyblíček. Aby se dostal do stavu, kde není vůbec nic, musí ten jeden kyblíček zničit.

Ano, já to chci udělat.

Můžeme se podívat na S3, že se to opravdu stalo a kyblíček zmizel.

Teď jsme v bodě nula. Teď jak propojit Terraform s S3 tzv. backendem, aby se stav nesynchronizoval do lokální složky, ale právě do cloudu do S3. Definujeme to jako backend S3:

```hcl{8-12}
terraform {
  required_version = "= 0.15.4"

  required_providers {
    aws = ">= 3.28.0"
  }

  backend "s3" {
    bucket = "1-terraform-cd-demo-state"
    key = "terraform.tfstate"
    region = "eu-central-1"
  }
}

provider "aws" {
  region = "eu-central-1"
}

resource "aws_s3_bucket" "data-bucket" {
  bucket = "1-terraform-cd-demo"
  acl    = "private"
}

output "s3-arn" {
  value = aws_s3_bucket.data-bucket.arn
}
```

[20:10](?start=1210)

Teď pokud smažeme původní Terraform panely a uděláme znovu Terraform `init`, tak znovu si stáhne všechno, co potřebuje, ale zároveň propojí ten backend s S3 – naším krásným kyblíčkem.

Tomáš: Takže teď když si stáhne aktuální stav z AWS, tak už ten stav neukládá a neznačí si ho k sobě do lokální složky, ale ukládá ten zjištěný stav do toho kyblíčku na S3, abychom na tom mohli případně spolupracovat, aby kdokoli další mohl koukat na ten stejný stav.

Martin: Ano, je to přesně tak. Můžeme si to ukázat na konkrétním příkladu, kdy Terraform, který máme nadefinovaný, odblokujeme. A on nám zase říká, protože jsme předtím udělali `destroy`, abych ten kyblíček vytvořil. Tak musím udělat toto. Jedna ze zajímavostí těch atributů je, že některé nejsou známé předtím, než se ten kyblíček vytvoří, jako je jeho ARN. Když si řekneme, že ano…

Tomáš: Teď se zase dostaneme do stavu – bude vytvořený kyblíček podle nějaké definice naší infrastruktury, ale rozdíl je v tom, že teď stav infrastruktury není uložený na lokálu, ale je uložený v nějakém sdíleném uložišti na AWS.

Martin: Ano. Když se teď podívám do složky `aws`, mám tam `.terraform` soubor, což je stažený AWS provider, mám tam nějaký lock soubor, ale už tam nemám `terraform.tfstate`.

Podívám se do našeho kyblíčku se statem, kde mám `terraform.tfstate`. Takže ten původní, který byl lokálně, je teď na S3 a je s ním propojený.

[22:08](?start=1328)

Co jsou vlastně na GitHubu GitHub Actions? Jsou to v podstatě nějaké kontejnery, kde běží kus kódu nebo klidně nějaké plnotučné programy jako workflow. Což znamená, že my si můžeme nastavit, že chceme, aby se nějaký workflow spustil ve chvíli, kdy vytvoříme pull request nebo přidáme nějaký nový kód do masteru. To, čeho chceme docílit, je, aby když změníme infrastrukturu, to znamená definici Terraformu, ten náš `terraform.tf`, tak aby po mergi do masteru nebo po změně v masteru se provedlo `terraform apply`. Toho docílím právě přes GitHub Actions. Definováním Action, kterou tady mám jako `terraform_apply`.

Tomáš: Takže ty Actions jsou definovány jako nějaký YAML přímo v repository?

Martin: Ano. V adresáři `.github/workflows` se jakýkoliv YAML zkusí vzít jako action (jako workflow) a tady vidíme, co to znamená – nějaké jméno, že chceme „Terraform Apply on push“ a chceme, aby při každém pushnutí do branche master, kde se změní něco v adresáři `infrastructure/aws/` (hvězdičky znamenají „cokoliv pod tím“) se provedly tyhlety joby.

Konkrétně tady máme jeden job terraform, který se skládá z několika kroků – první je check out toho samotného repozitáře, že v tomto stavu budeme mít nějaký Ubuntu virtual machine, který bude mít checkoutnutý celý repozitář. Potom skládáme workflow z nějakých krabiček. Krabička, kterou pro to použijeme, je přímo od HashiCorp, což je tvůrce Terraformu, a je to `terraform-github-action`, kde můžeme použít jednotlivé příkazy Terraformu. Potřebujeme nejdříve `init`, to znamená, že potřebujeme, aby se provedl init té naší virtual machine, to znamená, stáhl se z S3 ten `tfstate` (v našem případě). Hned potom potřebujeme udělat `apply`.

```yaml{2-7,17-21,23,30-31,34}
name: 'Terraform Apply on push'
on:
  push:
    branches:
      - master
    paths:
      - 'infrastructure/aws/**'
env:
  tf_version: '0.15.4'
  tf_working_dir: 'infrastructure/aws'
jobs:
  terraform:
    name: 'Terraform'
    runs-on: ubuntu-latest
    steps:
      - name: 'Checkout'
        uses: actions/checkout@master
      - name: 'Terraform Init'
        uses: hashicorp/terraform-github-actions@master
        with:
          tf_actions_version: ${{ env.tf_version }}
          tf_actions_subcommand: 'init'
          tf_actions_working_dir: ${{ env.tf_working_dir }}
          tf_actions_comment: false
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

      - name: 'Terraform Apply'
        uses: hashicorp/terraform-github-actions@master
        with:
          tf_actions_version: ${{ env.tf_version }}
          tf_actions_subcommand: 'apply'
          tf_actions_working_dir: ${{ env.tf_working_dir }}
          tf_actions_comment: false
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

[24:46](?start=1486)

Obě tyto akce potřebují AWS klíče, které máme sdílené v GitHub Secrets. Konkrétně to vypadá tak, že v nastavení repozitáře jsou Secrets, což nemusí být jenom tajemství, ale můžou to být jakékoliv proměnné, které definují cokoliv, co se v repozitáři děje. Aktuálně mámě dvě, což je víceméně náš deployující klíč a token pro AWS.

Tomáš: Když to shrnu: já udělám nějakou změnu v `terraform.tf`, pushnu to. Jakmile to pushnu do masteru, tak GitHub si všimne: ok, je tady nějaká GitHub Action, která se vztahuje tady na ten push a tady na tu cestu, tak spustí action. Ta vypadá tak, že se někde vycheckoutuje aktuální verze kódu, která souvisí s tím pushem. Inicializuje se Terraform, to znamená, že on si načte stav z té S3, stáhne si komponenty pro AWS apod., podívá se na novou definici infrastruktury, srovná jí se stávajícím stavem, řekne: musím udělat toto a toto, pak si načte z proměnných prostředí přístupové údaje do AWS a přes AWS API provede změny na infrastruktuře. A když to doběhne, bude infrastruktura v tom stavu, který popisuje soubor `terraform.tf`.

Martin: Je to tak. Ukážeme si to prakticky. Tady mám dva víceméně důležité soubory. Jeden je můj `terraform.tf` s deklarativním popisem infrastruktury, kam se chci dostat. A druhý je moje GitHub Action `terraform_apply`, která mi říká, že při každé změně masteru ve složce `infrastructure/aws` provede tyto kroky. Když to commitnu…

Tomáš: Tu GitHub Action necommitujeme pokaždé, že jo? Teď my ji jednou commitneme, ona pak bude vytvořená a už bude fungovat a teď jenom shodou okolností commitujeme obojí najednou, ale kdykoli příště už bychom jen commitli ty změny v definici infrastruktury a to by stačilo.

Martin: Ano, tím, že jsme ten soubor teď vytvořili, tvořili jsme oba, tak je to takový úvodní commit.

Push. Pushujeme přímo do masteru. Do repozitáře.

[27:40](?start=1660)

Chvilka napětí… Můžeme se podívat, že teď tam máme všechny ty tři soubory: v `.github/workflows` náš soubor `terraform_apply`, v `infrastructure/aws` náš soubor `tf` a `.gitignore`, který je tam jako malý bonus.

V Actions přibyla dotyčná action. Která ovšem neběží.

Uděláme náhodný push. Věc, kterou jsme si neukazovali, je změna v tom, že tahle infrastruktura je nasazená po `terraform_apply`. I kdyby se ta action spustila ve chvíli, kdy jsme to tam pushli, tak by se nestalo nic. My si ukážeme, jak to funguje, když máme nějakou změnu. Kdybych chtěl třeba tu viditelnost našeho data bucketu změnit z `private` na `public-read`. Teď už jedu klasický workflow, kdy commituju přímo do masteru:

```hcl{21}
terraform {
  required_version = "= 0.15.4"

  required_providers {
    aws = ">= 3.28.0"
  }

  backend "s3" {
    bucket = "1-terraform-cd-demo-state"
    key = "terraform.tfstate"
    region = "eu-central-1"
  }
}

provider "aws" {
  region = "eu-central-1"
}

resource "aws_s3_bucket" "data-bucket" {
  bucket = "1-terraform-cd-demo"
  acl    = "public-read"
}

output "s3-arn" {
  value = aws_s3_bucket.data-bucket.arn
}
```

A teď už nám běží naše action. Můžeme se podívat, co konkrétně to znamená. Ten job se jmenuje Terraform. Zatím se připravuje, což znamená, že do toho kontejneru se stahují všechny ty jednotlivé bloky, které tam máme. Ty bloky jsou reprezentované nějakými Docker fajly, které se postahovaly. Provedl se Terraform init. Tady můžeme vidět, že se stalo to samé, co se nám stalo lokálně, tedy propojili jsme se s S3 bucketem a postahovaly se všechny pluginy. Teď probíhá `terraform_apply`.

Teď to proběhlo a tady vlastně vidíme změny. Tady vidíme změnu, že náš kyblíček je z `private` na `public-read`. Vidíme, že po aplikaci se nic nepřidávalo, jeden zdroj se změnil a nic se nezničilo.

Tomáš: Super. Takže teď vlastně kdokoli má přístup do masteru, tak může změnou souboru změnit naši živou infrastrukturu na AWS. Je to tak?

Martin: Je to přesně tak. Nepotřebujeme si předávat už přímé přístupy do AWS, nepotřebujeme si předávat klíče, nepotřebujeme, aby člověk, který s tím AWS bude pracovat, byl zároveň administrátorem toho účtu, na kterém pracujeme.

Tomáš: A zároveň už nikdo nemusí dělat v terminálu, jestli tomu dobře rozumím. Stačí tady zmáčknout tečku a spustí se nám nějaký editor, kde si můžu něco změnit v `terraform.tf`, aniž bych cokoli dalšího věděl a uměl, tak se vlastně změní infrastruktura.

[31:33](?start=1893)

Martin: Je to tak. Kdokoli může přijít a přidat nám request. Další důležitá věc a další krok v kompletaci té automatizace je, že kdyby teď někdo přišel, protože ten repozitář `infra-demo` je public, a řekl si, že prostě `public-read` bucket nikdy, všechny buckety musí být `private`, upravil to v integrovaném VSCode, vytvořil nám pull request s tím, že by to přepsal zpět na `private`, tak my bychom vytvářeli review toho pull requestu. To, co bychom nejspíš museli udělat, kdybychom nevěřili samotnému kódu a chtěli bychom vidět, co ten Terraform dělá, je, že bychom si udělali check out toho pull requestu, napárovali to s naším AWS účtem a koukli se: Terraforme, naplánuj nám to, co se má stát.

Tomáš: My vlastně vidíme diff té popisované infrastruktury, ale ten diff v tom zadání se může propsat v nějaké větší změny v realitě.

Martin: Ano, abychom v tomhle pomáhali těm lidem, kteří dělají review – což v Česko.Digital jsme většinou my a my si chceme pomáhat – tak můžeme vytvořit další workflow, který nebude pracovat s masterem, ale bude pracovat konkrétně s pull requesty, a to tak, že na jakémkoli pull requestu, když se něco změní na `infrastructure/aws` a čemkoli pod ní, zase používáme naši tradiční akci pro Terraform, začínáme initem, tím začínáme vždycky a můžeme nechat Terraform naplánovat změny a vypsat je do pull requestu. Finální výsledek je, že kdokoli přijde a udělá nějakou změnu v naší infrastruktuře a vytvoří pull request, tak do toho pull requestu nám Terraform právě tímhle workflow dodá, jaké změny se musí udělat. Pro nás reviewery je pak velmi jednoduché se podívat – tenhle diff chci, tyhle kroky chci, aby Terraform udělal. A merge následně spustí naše předchozí workflow pro `terraform apply`.

```yaml{2-5,15-19,21,28-29,32,35}
name: 'Terraform Plan on PR'
on:
  pull_request:
    paths:
      - 'infrastructure/aws/**'
env:
  tf_version: '0.15.4'
  tf_working_dir: 'infrastructure/aws'
jobs:
  terraform:
    name: 'Terraform'
    runs-on: ubuntu-latest
    steps:
      - name: 'Checkout'
        uses: actions/checkout@master
      - name: 'Terraform Init'
        uses: hashicorp/terraform-github-actions@master
        with:
          tf_actions_version: ${{ env.tf_version }}
          tf_actions_subcommand: 'init'
          tf_actions_working_dir: ${{ env.tf_working_dir }}
          tf_actions_comment: false
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

      - name: 'Terraform Plan'
        uses: hashicorp/terraform-github-actions@master
        with:
          tf_actions_version: ${{ env.tf_version }}
          tf_actions_subcommand: 'plan'
          tf_actions_working_dir: ${{ env.tf_working_dir }}

          tf_actions_comment: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

Tomáš: Čili teď přidáváme tu Github Action, která bude obsluhovat pull requesty, který se týkají infrastruktury. A teď bychom vlastně chtěli do nové větve udělat nějakou změnu. Třeba vrátit ten kýblíček na private.

Martin: Já rozhodně chci vracet kyblíček na `private`. Protože `public` kyblíčky… spousta firem zjistila, že to není dobrý nápad :) Teď workflow nebude takový, že budeme commitovat přímo do masteru, ale vytvoříme si novou branch a commitneme do ní. Teď pushujeme vlastně do branche.

```hcl{21}
terraform {
  required_version = "= 0.15.4"

  required_providers {
    aws = ">= 3.28.0"
  }

  backend "s3" {
    bucket = "1-terraform-cd-demo-state"
    key = "terraform.tfstate"
    region = "eu-central-1"
  }
}

provider "aws" {
  region = "eu-central-1"
}

resource "aws_s3_bucket" "data-bucket" {
  bucket = "1-terraform-cd-demo"
  acl    = "private"
}

output "s3-arn" {
  value = aws_s3_bucket.data-bucket.arn
}
```

[36:15](?start=2175)

Teď probíhá akce _Terraform Plan on PR_ na větvi `private-bucket`. Zase se můžeme podívat, co přesně dělá. Dělá `checkout`, `terraform init` a `terraform plan`. Tady vlastně vidíme, co se stalo, vidíme ten plán.

Tomáš: Teď tam teda s trochou štěstí přibyl komentář u toho pull requestu.

Martin: Vidíme ten plán, který je změnit `public-read` na `private` a tady nám říká, že vytvořil komentář na pull requestu. Takže já se na ten pull request podívám a mám tady od Terraformu výstup toho plánu, který mi říká, že aby se to stalo, tak musí provést tuhle jednu změnu. Já se na základě toho můžu rozhodnout, ano je to rozhodně vzrušující!, já se na základě tohohle toho můžu jako reviewer rozhodnout, co s tím udělám a protože se mi to líbí a chci private bucket, tak to rozhodně zamerguju.

Tomáš: A tím se teda spustí už ta předchozí integrace, čili teď se probere ta GitHub Action, která se stará o nasazení změn na AWS, a chvilku se tady bude něco motat a na konci budeme mít kýblíček v AWS zase soukromý.

[38:07](?start=2287)

Martin: Teď jsme se dostali do velmi důležitého milníku, kdy víceméně všechno, celé to flow pull requestu je automatizované. Chtěl bys to nějak shrnout?

Tomáš: Dobře, takže vlastně teď ten zásadní pokrok je v tom, že zatímco předtím bychom museli dávat někomu klíče od AWS a dávat mu administrátorský účet, tak teď vlastně ty lidi už vůbec nepřichází do styku s AWS. Stačí změnit infrastrukturu v `terraform.tf` v libovolném editoru, klidně z telefonu tady na GitHubu udělat nějakou změnu. Vznikne pull request, díky GitHub Action se probere Terraform, řekne „dobře, tyhle změny v infrastruktuře by vypadaly v reálu takhle, tohle já bych reálně měnil“, následně ten, kdo prohlíží ten pull request, řekne jo nebo ne, a pokud řekne jo, mergne to. Naskočí ta druhá integrace, která zavolá znova Terraform. Terraform spočítá, co je potřeba udělat za změny, a ty změny provede a výsledkem je tedy nový stav infrastruktury. A tohle všechno probíhá klasicky za tím gitovým workflow, což má mimo jiné za důsledek, že teď jsme schopní udělat třeba revert změn v infrastruktuře – pokud uděláme nějaké změny, které se ukážou jako nežádoucí, můžeme revertnout commit a tím vlastně vrátíme zpátky ty změny na infrastruktuře.

Martin: Je to tak, a má to i opačnou výhodu – když někdo nechtěně rozbije infrastrukturu v konzoli (což se nám také v Česko.Digital stává, protože všechny projekty jsou pod jedním účtem, a nestává se to výjimečně), tak můžeme udělat to, že spustíme `terraform apply` a on ty změny, kde někdo něco rozbil, vrátí do původního stavu, který my chceme.

Tomáš: Ještě jsme chtěli zmínit jednu věc. My jsme tady ukazovali konfigurační soubory Terraformu a konfigurační soubory GitHub Actions, všechno jsou to docela dlouhé věci. Rozhodně to není tak, že by Martin přišel a vysypal třeba nastavení GitHub Action z rukávu. Je to tak, že tohle je klasický _copy and paste_, takže tu GitHub Action převezmeme odněkud z dokumentace nebo z nějakých ukázkových GitHub Actions nebo z předchozích projektů. Pak jenom upravíme věci specifické pro tenhle projekt, takže nebojte se, nemusíte to psát od nuly – a totéž platí i pro Terraform. Standardní styl práce, když chci dejme tomu konfigurovat nějakou distribuci Cloudfront, tak jdu do dokumentace Terraformu, najdu si příklad konfigurace Cloudfrontu, naberu si ten kus infrastruktury do schránky, vložím ho k sobě do definice infrastruktury, upravím nějaké parametry relevantní pro ten můj projekt, vyzkouším to, otestuju to a nasadím do praxe. Takže stručně řečeno, nebojte se, že to budete všechno psát ručně. Je to do velké míry copy and paste a úpravy na místě.

Martin: Já bych k tomu dodal, že dokumentace Terraformu je opravdu dobrá a je tam strašně moc příkladů a dokonce je to i tak, že když chci použít nějaký AWS resource a otevřu si dokumentaci Terraformu, tak úplně první blok kódu, který tam je, je přesně tak, jak to chci použít. To se stává velmi často. Opravdu je to velmi silný _copy and paste_ a dá se to psát velmi jednoduše, i velmi komplikované infrastruktury.

[42:14](?start=2534)

Tomáš: S tématem _copy and paste_ souvisí naše další téma, kterému jsme se chtěli věnovat, a to je parametrizace té infrastruktury, protože velmi často člověk potřebuje nechat někde v té definici infrastruktury proměnnou, kterou nastavuje odněkud zvenčí, v našem případě z GitHubu. Takže my bychom teď rádi ukázali, jak to funguje, že vlastně můžete jít na GitHub, do sekce Secrets. Jak Martin říkal, mezi Secrets nejsou jenom „secrets“, tedy tajné věci, ale jsou tam i běžné konfigurační parametry. Takže tam dáme nějakou hodnotu, nějakou proměnnou, kterou následně přebereme v definici infrastruktury, abychom mohli infrastrukturu konfigurovat přímo přes GitHub, což bude mít nějaké výhody, ke kterým se ještě vrátíme. Martine, mohl bys nám to prosím ukázat?

Martin: Ukážu to velmi rád. První krok, který potřebujeme k tomu, abychom z venčí dokázali přidávat nějaké parametry, je pracovat uvnitř toho kódu Terraformu s proměnnými. Já udělám malý vstup o tom, jak funguje ta složka Terraformu a jak fungují ty soubory `.tf`. Když spustíte Terraform, on vezme všechny soubory s koncovkou `.tf` a zpracuje je, což znamená, že já si můžu tuhle infrastrukturu, tenhle deklarativní zápis, dělit přesně jak potřebuju na různé soubory. Doporučuju dělat to po nějakých logických blocích. Velmi běžné je přidat proměnné jako zvláštní soubor. Já si tady přidám `variables.tf`. Proměnné definuju jako `variable`, název, my chceme konkretizovat jméno toho bucketu, takže například `data-bucket-name`, a chceme, aby to byl `string`. Teď mám vlastně tu proměnnou nadefinovanou, zatím k ní nemáme přidanou hodnotu, ale můžeme ji teď už začít používat. My jí chceme nahradit právě název toho bucketu. K proměnným se dostaneme přes `var`, například `var.data-bucket-name`. Teď vlastně Terraform nahradí ten řetězec, který jsme tam měli, řetězcem z proměnné.

```hcl
variable "data_bucket_name" {
   type = string
 }
```

```hcl{20}
terraform {
  required_version = "= 0.15.4"

  required_providers {
    aws = ">= 3.28.0"
  }

  backend "s3" {
    bucket = "1-terraform-cd-demo-state"
    key = "terraform.tfstate"
    region = "eu-central-1"
  }
}

provider "aws" {
  region = "eu-central-1"
}

resource "aws_s3_bucket" "data-bucket" {
  bucket = var.data_bucket_name
  acl    = "private"
}

output "s3-arn" {
  value = aws_s3_bucket.data-bucket.arn
}
```

[45:10](?start=2710)

Ukážeme nejdřív, co se stane, když teď spustíme `terraform apply`. Terraform se nás zeptá na hodnotu proměnné `data-bucket-name`, dodáme náš původní název.

A on říká, všechno je v pořádku, není potřeba nic změnit, což znamená, že ta hodnota se tam opravdu propsala na správné místo. A teď jak dostat proměnnou do Terraformu zvenčí. Nejjednodušší a preferovaný způsob víceméně na všech infrastrukturách z Česko.Digital je proměnná prostředí. Terraform zpracovává proměnné prostředí a ty, které mají předponu `TF_VAR`, zpracuje. Což znamená, že kdybych já chtěl tu proměnnou dodat externě, tak použiju `export`, například `export TF_VAR_data-bucket-name=terraform-cd-demo`.

Takže teď se nás `terraform apply` nezeptal na `var.data_bucket_name`, ale vzal si ji z té naší exportované proměnné. A teď vlastně chceme tuto exportovanou proměnnou dodat do GitHubu do naší GitHub Action. Protože kdybychom teď udělali nějaký commit, tak by to neprošlo právě proto, že ta proměnná by neexistovala v naší action. Ta změna je poměrně jednoduchá, musíme ji udělat i v `apply`, i v `plan`. Takže přidat `data_bucket_name` a my chceme, aby to bylo parametrizované ze Secrets GitHubu, takže využijeme `secrets.BUCKET_NAME`. A tím jsme pro celý běh toho kontejneru vytvořili proměnnou prostředí, která se vezme ze Secrets jako `BUCKET_NAME`. Ten `BUCKET_NAME` zatím nemáme v Secrets, musíme ho přidat.

```yaml{11}
name: 'Terraform Apply on push'
on:
  push:
    branches:
      - master
    paths:
      - 'infrastructure/aws/**'
env:
  tf_version: '0.15.4'
  tf_working_dir: 'infrastructure/aws'
  TF_VAR_data_bucket_name: ${{ secrets.BUCKET_NAME }}
jobs:
  terraform:
    name: 'Terraform'
    runs-on: ubuntu-latest
    steps:
      - name: 'Checkout'
        uses: actions/checkout@master
      - name: 'Terraform Init'
        uses: hashicorp/terraform-github-actions@master
        with:
          tf_actions_version: ${{ env.tf_version }}
          tf_actions_subcommand: 'init'
          tf_actions_working_dir: ${{ env.tf_working_dir }}
          tf_actions_comment: false
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

      - name: 'Terraform Apply'
        uses: hashicorp/terraform-github-actions@master
        with:
          tf_actions_version: ${{ env.tf_version }}
          tf_actions_subcommand: 'apply'
          tf_actions_working_dir: ${{ env.tf_working_dir }}
          tf_actions_comment: false
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

Teď, když jsme na to narazili, tak kdybychom to pojmenovali jinak, třeba `2-terraform-cd-demo`, tak Terraform nevytvoří druhý kyblíček vedle toho prvního, ale smaže ten první a vytvoří nový bucket, protože on si pamatuje, že pracujeme s jedním resource, že to je ten samý resource.

On má někde interně poznačenou tabulku, kde je řečeno, že tomu takhle pojmenovanýmu zdroji odpovídá ten S3 kyblíček s takovým a takovým ARN.

Vytvoříme pull request, který nám spustí `terraform plan`, a ten by nám teoreticky měl říct, že žádná změna není potřeba.

[54:18](?start=3258)

Tomáš: No a než to doběhne, tak se můžeme zamyslet nad tím, k čemu nám tohle je. Vlastně si to nejlíp ukážeme na příkladu. My totiž teď ten kyblíček máme zatím permanentně prázdný. A proto máme v rukávu nachystaný příklad, který do toho kyblíčku něco nahraje přímo z toho repository. A abychom mohli do toho kyblíčku z repository nahrávat, potřebujeme znát název toho kyblíčku, k čemuž se nám právě hodí ta proměnná.

Martin: Ano, naprosto běžný use case na skoro všech projektech, které používají nějaké statické soubory – ať už jsou to React aplikace nebo jsou to obrázky nebo jakýkoli content – je, že je potřeba je dostat z nějakého zdroje na Content Delivery Network (CDN). Právě proto používáme to S3.

Například v repozitáři [assets](https://github.com/cesko-digital/assets), což je podklad pro data.cesko.digital, synchronizujeme obsah přímo z adresáře `content` v repozitáři. Má to spoustu výhod, víceméně veškeré obrázky, co jsou nějaké cover věci na blog, můžeme spravovat přímo v repozitáři přes pull requesty.

Ukážeme si velmi jednoduchý způsob, jak to vytvářet. V našem repozitáři jsme udělali složku `content`, kde máme brand manuál. Jako úplně náhodný příklad nějakého souboru, který chceme v S3 bucketu – protože když máte dobrý brand manuál, tak ho rozhodně chcete v S3 bucketu! A teď se podíváme na workflow, které zajistí to, že při každé změně v tom adresáři `content` při push do masteru se obsah adresáře `content` synchronizuje do S3. Použijeme na to akci `s3-sync-action`, které řekneme, že chceme ty soubory jako `private` a soubory, které zmizely z adresáře `content`, chceme smazat i z S3.

Čili pokud něco není ve složce `content` a je to v kýblíčku, tak to z toho kýblíčku zmizí.

```yaml
name: "Sync content to S3"

on:
  push:
    branches:
      - master
    paths:
      - "content/**"

jobs:
  sync_content:
    name: "Sync Content"
    runs-on: ubuntu-latest
    steps:
      - name: "Checkout"
        uses: actions/checkout@master
      - name: "Sync to S3"
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --acl private --follow-symlinks --delete
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_S3_BUCKET: ${{ secrets.BUCKET_NAME }}
          AWS_REGION: "eu-central-1"
          SOURCE_DIR: "content"
```

Přidáme tam naše AWS klíče, což je typické, a zároveň přidáme `AWS_S3_BUCKET`, jehož hodnota se nastavuje přes `secrets.BUCKET_NAME`. Když vytvoříme jiný repozitář nebo uděláme fork toho repozitáře, secrets se nepřenesou. A nový vlastník toho repozitáře, pokud by chtěl tu infrastrukturu deploynout tak, jak je, zadá jenom vlastní secrets. Tím vlastně parametrizuje celou tu infrastrukturu a spustí `terraform apply`, případně další workflows, které v tom repozitáři jsou. Tohle je důležité zejména pro S3, protože zrovna ta jména bucketů jsou globálně unikátní v rámci S3. To znamená, že kdybychom zachovali ten hard-coded string v Terraformu a předávali bychom ten projekt třeba zadavateli (což v Česko.Digital běžně děláme), zadavatel by si připojil vlastní AWS a spustil `terraform apply` a Terraform by mu řekl, že ten bucket už existuje někde jinde, na nějakém jiném účtu, a proto ho nemůže vytvořit. Což nechceme – a tam se zrovna to parametrizování přes GitHub Secrets hodí a dává tam velký smysl.

[59:49](?start=3589)

Tomáš: Takže znova, tady vlastně přidáváme novou akci a ta říká, že kdykoli se cokoli změní v adresáři `content`, tak chceme poté spustit synchronizaci a ten obsah adresáře `content` nahrajeme do kyblíčku, jehož jméno je definované v nějaké proměnné. Ta synchornizace je i destruktivní, takže pokud v tom kyblíčku je něco navíc, tak se to smaže. To znamená, že pokud my z toho adresáře `content` něco vymažeme, tak se to skutečně vymaže i z toho kyblíčku v S3. A teď vlastně máme commitnutou tu akci a to samo o sobě nic neřeší, teď chceme commitnout ten adresář `content` s nějakým obsahem.

Martin: Je to tak, můžeme si to vyzkoušet. Nebudeme vytvářet pull request, uděláme to přímo do masteru.

Tomáš: A teď vlastně čekáme, že by měla naskočit ta synchronizační akce, po pushnutí. Takže na GitHubu by se měl objevit klasický oranžový puntík u toho commitu… vlastně teď to chvilku trvá ten push, protože tam máme velkou objednávku…

Takže teď by u toho commitu měl být ten oranžový puntík, který říká, že běží nějaká akce.

Martin: Běží akce „Sync Content to S3“, kde se zase připravuje ta virtual machine, stahuje se tam nějaký Docker file toho s3-sync-action. A tady vidíme, že synchronizuje a uploaduje brand manuál.

Tomáš: Můžeme se podívat do konzole na AWS, abychom viděli, že tam naskočil ten soubor?

Martin: Tady máme náš brand manuál. A ještě GitHub dělá jednu výbornou věc – v těch actions všechny secrets vyhvězdičkuje. Takže naprosto běžně můžete mít v rámci veřejného repozitáře na GitHubu třeba heslo do databáze, to heslo do databáze může fungovat s Terraform infrastrukturou a nemusíte se bát, že ty actions veřejně vypisují tu infrastrukturu, protože všude, kde je to heslo do databáze, je vyhvězdičkované. Nestane se vám, že ty secrests nějak leaknou, přestože máme veřejný repozitář. Takové nebezpečí tam není – a to je další výhoda těch GitHub Secrets oproti nějaké konfiguraci, která je bokem.

[01:03:10](?start=3790)

Tomáš: Teď máme nějaký obsah v tom repu, máme tam nějakou infrastrukturu a je to všechno pohromadě, takže jsme vlastně ještě o krok dál v tom, že když budu chtít udělat nějaký revert nebo jakoukoli operaci s tou historií, tak ta infrastruktura se správně hodí do žádoucího cílového stavu, podle toho, co udělám v Gitu, a zároveň ten obsah se taky synchronizuje podle adresáře `content`. Takže teď můžeme klidně udělat revert v adresáři `content` a zase se ta data odrazí reálně v obsahu kýblíčku. Takže máme vlastně obsah i infrastrukturu krásně verzované, a kdokoli může nahrát něco do adresáře `content`. GitHub tohle vlastně umí i přes _drag and drop_, takže můžete něco hodit do adresáře `content`, je to docela přístupné rozhraní. Zároveň tím neztrácíte ten hezký verzovaný model – kdykoliv se cokoliv pokazí, můžete udělat krok zpátky a všechno se to vrátí. (Což já bych v životě občas dost uvítal.)

[01:04:20](?start=3860)

Martin: Teď jsme si ukázali příklad parametrizace a jak to udělat víceméně v celé flow té pipeline až na úroveň GitHubu. A teď se podíváme na jedno téma, které je vlastně nejčastější otázka a navazuje právě na parametrizaci. A to je oddělování vývojových prostředí, _development_ vs. _production_. Tome, kdy je dobré začít uvažovat o tom, že nebudeme mít jenom jeden master, ale budeme mít víc vývojových prostředí?

Tomáš: Na to není jednoduchá odpověď. Taková základní osa, na které se teď pohybujeme, je bezpečnost vs. efektivita. Ten důvod, proč lidi chtějí oddělit vývojové prostředí od produkčního, většinou souvisí s tím, že chtějí větší spolehlivost, často je s tím spojené taky nějaké větší testování apod. Na druhou stranu je to nějaký proces a každý proces znamená překážku v efektivitě.

Takže když to – vulgárně řečeno – budu prát všechno do masteru, tak jsme všichni krásně produktivní, ale jednou za čas nám to prostě umře. A když budeme mít několik úrovní integrace a testování, než vůbec kód přijde do masteru a nasadí se někam na produkci, tak je to výrazně bezpečnější, ale často výrazně pomalejší a je tam špatná ta zpětnovazební smyčka při vývoji. Takže na tuhle otázku neexistuje jedna správná odpověď.

Situace Česko.Digital je specifická v tom, že my zřídkakdy máme nějakou hromadu testerů a předepsaných testovacích ručních scénářů, které by někdo projížděl. Většinou to vypadá tak, že máte vývojové prostředí a v tom se něco integruje, vytvoří se nějaký release kandidát, toho si vezme do prádla hromada testerů, najdou na něm chyby, a když nenajdou, mergne se do masteru a pokračuje se. Tenhle luxus my v Česko.Digital nemáme, protože nám chybí ta hromada testerů, takže máme tendenci dávat věci spíš do masteru, pokud to není něco ultra citlivého – a tím se zbavit určité překážky v efektivitě. Ale samozřejmě to tím pádem vyžaduje větší vlastní zodpovědnost od vývojářů, kteří nemůžou říct: _Jó jako z dálky to na mě působilo docela dobře, tak to tam hoďme a uvidíme._ Člověk musí být sám zodpovědný za to, že to, co mergne, nerozbije master. Takže my spíš směřujeme k tomu neoddělovat ta prostředí a přikročit k jejich oddělení teprv v okamžiku, kdy máme opakovaně jasný problém, který stojí za to snížení efektivity.

Martin: To, co se většinou snažíme učit vývojáře, nebo je k tomu navádět, je zodpovědnost za kód, který vytvoří. Zodpovědnost za to, že jejich kód jde rovnou do produkce. Má to benefity v tom, že nevzniká takový falešný pocit, že když to nepůjde rovnou do produkce, ale do nějakého development mezikroku, tak tam to za mě někdo vyřeší, někdo to zkontroluje a všechny problémy se tam odladí – což se většinou nemusí dít ani v komerčním světě a specificky se to neděje v rámci Česko.Digital v dobrovolnických projektech, protože ty zdroje na kontrolu každého release prostě nejsou. Spíš je to takový falešný pocit bezpečí, že když to jde do vývojové větve, tak se to vyřeší – a ono se to nevyřeší a naopak více chyb projde do produkce. Kdežto když je člověk zodpovědný a ví, že jeho pull request půjde rovnou do produkce, tak je zaprvé více motivovaný, protože ta cesta do produkce je kratší a vidí ty výsledky okamžitě, a zároveň cítí tu zodpovědnost za kód, který vytváří.

[01:08:46](?start=4126)

Teď bychom se mohli podívat na to, co to znamená z pohledu infrastruktury, protože k tomu rozdělení vývojových prostředí je několik možných cest. Ta nejjednodušší je tu infrastrukturu dobře parametrizovat a rozdělit ji na kopie 1:1. Což znamená, že mám dva repozitáře nebo dvě branche, kde každý z těch wokrflows pro development a production má vlastní set GitHub Secrets, což jsou ty naše parametry. A opravdu se vytváří dvě exaktní kopie celé té infrastruktury. V komerčním světě se toto běžně dělá, že je produkční fork repozitáře a development fork repozitáře, kde admin vývojáři mají přístup do toho produkčního. Zároveň jsou dva cloudové účty, kde na jednom běží kopie té infrastruktury vývojová a na druhém ta produkční.

Do tohoto stavu je velmi jednoduché se dostat s tím, co máme teď. Stačí vytvořit fork toho repozitáře. Jediná změna, kterou je potřeba udělat, je přejmenovat bucket pro stav Terraformu. Protože, jak jsme si říkali, název toho kyblíčku je globálně unikátní. Potřebujeme dva stavy Terraformu, ve dvou různých kyblíčcích. To by byla jediná změna, kterou bychom potřebovali udělat ve forku toho repozitáře. Všechno ostatní by zařídily secrets, které by parametrizovaly i účet, na který pushujeme, což znamená klíčem a tokenem, i jak se bude jmenovat i ten kyblíček, který je parametrizovaný pomocí secrets.

[01:11:10](?start=4270)

Druhá velmi běžná cesta, jak řešit oddělení development a produkční prostředí, je mít všechno v jednom repozitáři v masteru, kde ten development a production sdílí část kódu a vytváří si jenom ty rozdíly. Většinou je to kvůli ceně, protože spousta zdrojů, které v tom cloudu vytváříme, může být sdílená.

U toho S3 bucketu to nedává moc smysl, protože i kdyby byl produkční a development bucket, tak by byly napsané vedle sebe, takže bychom měli produkční datový bucket, který by se jmenoval `data_bucket_production` (a byl samozřejmě `private` – vždycky to chceme `private`). A vytvořili bychom novou proměnou a tu bychom přidali do celé pipliny. U toho samotného bucketu to není vidět, protože ta infrastruktura nesdílí vůbec nic.

Ale ve chvíli, kdybychom měli databázovou instanci, což je velmi drahá věc v rámci cloudu, tak běžně v deploymentech, víceméně na všech projektech Česko.Digital, je pouze jedna databázová instance pro organizaci nebo pro projekt a na ní běží několik databází. Třeba development verze databáze, ke které mají vývojáři přístup a hrají si s ní a ladí nad tím, a potom produkční verze databáze, do které se připojuje master. Což znamená, že ty proměnné by neoznačovaly dvě rozdílné databázové instance, ale označovaly by dvě různé databáze v rámci jedné instance.

Stejně tak jde sdílet load balancer nebo síťové prvky – velmi drahý je třeba NAT (Network Address Translator). Naopak nějaké deploymenty, třeba Docker filů, když chceme něco spustit v Dockeru, tak máme produkční běhové prostředí a development běhové prostředí.

To nejdůležitější je nedělat to zbytečně, ale dělat to až ve chvíli, kdy máme silný case pro rozdělení obou prostředí.

[01:14:03](?start=4443)

Tomáš: Super, díky. Ty ses zmínil o jedné věci, o které se v souvislosti s AWS mluví, a to je cena. Častý dojem je: já to nechci mít na AWS, protože to bude drahé. Jakým způsobem se s tímhle, zvlášť v neziskovém prostředí, dá pracovat? Dá se vůbec říct, _en bloc_, jestli je AWS drahé? Jak se na tohle díváš?

Martin: Tam dost záleží na tom, co chceme za tu cenu dostat. Protože AWS má strašně moc služeb a nabízí toho strašně moc a obecně platí – nejen na AWS, ale v jakémkoliv IT – že čím méně managujeme my, což znamená čím více za nás ta služba managuje a dává nám v podstatě zadarmo, tak tím je dražší. Většinou, když se udělá velký skok v těch věcech, tak se cena zdvojnásobí.

Když mám například VPS, i klidně na AWS, jenom čistou EC2 VPS, tak ta cena je _x_, ale ve chvíli, kdy deployuju Docker na třeba na Fargate, což je automatický management oběhového prostředí, kdy jenom vezmu Docker a řeknu, že chci, aby tohle běželo a je mi úplně kde a jak, tak se ta cena zdvojnásobí. A když udělám ten krok ještě dál, že neřeším vůbec, že to je Docker, ale mám jenom kus kódu a chci, aby ten kus kódu někde běžel a nezajímá mě opravdu vůbec nic, což je například služba AWS Lambda nebo mimo AWS například na Vercelu jejich serverless funkce, tak zase zaplatím za v podstatě ten samý zdroj (CPU, paměť, čas) ještě dvakrát tolik. Takže v té nejvyšší abstrakci, kde mám jenom kód a nezajímá mě vůbec nic jiného, platím například 4✕ tolik, než kolik bych platil, kdybych měl vlastní VPS a tu si sám spravoval na úrovni systému.

Tomáš: Dá se to shrnout tím, že z toho není extra cesta ven a člověk si může jen vybrat, jaký poměr vlastní práce a vlastních peněz chce vynaložit? Buďto to budu mít levně a udělám hodně ručně, nebo to budu mít draho a holt to mám s nějakým komfortem?

Martin: Jako _rule of thumb_ se dá říct, že přesně takhle to funguje. Čím větší chci komfort, čím větší chci předatelnost a nezávislost na konkrétních lidech, kteří mají know how a potřeboval bych se jim třeba dovolat v noci, tak tím více za to zaplatím. Ale dá se říct, že tenhle poměr je odpovídající. Třeba kdybych měl VPS a měl člověka, který mi ho spravuje, tak na konci roku ty náklady budou stejné, jako když tam toho člověka nemám a běží mi to v nějaké managed službě v nějakém public cloudu.

Tomáš: Takže stručné shrnutí by bylo, že pro účely Česko.Digital, čili pro neziskovky, to AWS je vyhovující služba ve většině věcí, že ty náklady jsou odpovídající tomu, co za to člověk dostane?

Martin: Rozhodně. Ty public cloudy mají velkou výhodu v tom, že není potřeba dedikovaný člověk na správu, je potřeba akorát člověk, který třeba v Terraformu v repozitáři ty věci nasadí, případně upravuje, ale ne někdo, kdo je na telefonu jako standby, když se náhodou někde něco rozbije. A druhá výhodná věc je, že i pro neziskovky jde získat poměrně dost kreditů, ať už pro AWS nebo i jiné cloudy, v rámci různých programů – v Česku je to třeba TechSoup od nadace Via, který spravuje spoustu technických produktů, které neziskovky můžou získat zdarma a poměrně široce je využívat. Takže i na AWS poměrně rozsáhlá infrastruktura jde provozovat zdarma.

Tomáš: Ještě by asi stálo za to říct, že Terraform není věc, která by byla přímo spjatá s AWS. Pokud má někdo obavy z AWS nebo se mu chce vyhnout z libovolných důvodů, tak to, co jsme ukazovali, jde úplně stejně spustit klidně nad Digital Ocean nebo libovolným podobným poskytovatelem VPS. Logika zůstává stejná – mám nějak deklarativně popsanou infrastrukturu, poskládanou z nějakých stavebních prvků, které nabízí Digital Ocean a vlastně akorát ve výsledku to nevolá AWS, volá to Digital Ocean a postaví to něco z jejich stavebních bloků a mám jednodušší to účtování, které je spojené s VPS. Je to tak?

[01:19:19](?start=4759)

Martin: Je to přesně tak. Tím bych uzavřel téma ceny. Nechceš shrnout, co jsme se dnes všechno naučili a do jakého stavu jsme se dostali?

Tomáš: Když to shrnu – zásadní pro nás je, aby projekty, na kterých děláme, byly pokud možno na jednom místě, aby byly dobře předatelné, aby se o ně dalo snadno starat, aby k tomu nebyli potřeba lidi, kteří budou mít pager a budou k dispozici v noci. Proto hodně pracujeme s GitHubem a s automatizací. Ideální pro nás je, když je celý projekt v jednom repu – frontend, backend a infrastruktura.

Ta infrastruktura je popsaná deklarativně, čili ne _co je potřeba udělat_, ale _jaká má být_, a o aktualizace infrastruktury se nestará konkrétní člověk, zase nějaký nebožák s pagerem nebo telefonem, ale o aktualizace infrastruktury se stará robot. Takže kdykoli je třeba změnit infrastrukturu, tak může někdo přijít, pošle klasicky pull request, probere se robot a řekne: _Jo, pokud chcete tu infrastrukturu mít takovouhle, tak to znamená tyhle a tyhle změny._ Pak stačí vlastně mu říct: Jo, přesně tohle chceme. Kód se mergne, Terraform se postará o odpovídající změny infrastruktury, ať už v AWS nebo kdekoli jinde, a následně může třeba proběhnout nějaký další krok jako třeba ten deployment typu „vezmu nějaká data z nějakého adresáře a nacpu je do nějakého kyblíčku na S3 a tím třeba nahraju novou novou verzi aplikace na CDN“.

Důležité téma je parametrizace infrastruktury. Když v Česko.Digital vyvíjíme nějakou aplikaci, tak ji vyvíjíme pod organizací Česko.Digital na GitHubu, ale pak v rámci předávání zadavateli tohle repo převedeme na nějakou jinou organizaci. Tam je důležitý moment, aby to neznamenalo, že nějaký nebožák bude procházet ty zdrojáky a bude přepisovat názvy kyblíčků a takovéhle věci, nějaké natvrdo zakódované řetězce. Při přesunu toho repa k jiné organizaci zmizí všechny secrets pochopitelně, protože to je citlivá věc, která zůstává s tou organizací. Takže my předáme repo někomu, kdo si tam nastaví nové secrets, nové parametry obecně, a jakmile se tohle chytne, oživne to na novém místě, tak to v jejich novém účtu na AWS vybuduje úplně stejnou infrastrukturu, kterou to mělo u nás, a ideálně ji to naplní relevantními daty. Proces předání by měl být co nejméně bolestivý, což je to, co chceme a co by měl asi chtít každý, kdo ty věci chce dělat rozumně.

A ukazovali jsme si ještě konkrétní use case parametrizace, což je rozdělení vývojového prostředí a produkce. Tady je hrozně důležité říct, že je dobré tohle nedělat automaticky, nedělat to reflexivně, ale je dobré počkat, až budete mít konkrétní problémy. Ty konkrétní problémy pak budou dobře definovat, co je správné řešení. Teprve na základě toho je možné udělat minimální změny, které nebudou zbytečně duplikovat infrastrukturu a přitom pokryjí ten váš use case.

A na závěr jsme se bavili, že AWS není nutně drahá věc, že to může klidně běžet zadarmo. Já můžu dodat, že provozuju noviny, máme v AWS hromadu dat, používáme ho pro uložení obrázků a příloh, a platíme malé stokoruny měsíčně, takže je to něco, co nestojí v rámci té organizace za řeč. Zapomněli jsme na něco, Martine?

[01:23:48](?start=5028)

Martin: Bylo to naprosto vyčerpávající. Kdyby měli diváci nějaké otázky, jak jim můžeme pomoci?

Jsme pro vás k dispozici ve Slacku Česko.Digital, nejlépe v kanálu [\#ceskodigital-tech](https://cesko-digital.slack.com/archives/CS7RPPVUL), a moc se na vás těšíme. Vyzkoušejte si to, repo je k mání na GitHubu, takže se můžete podívat na všechny příklady, můžete je využít jako zdroj dalšího _copy and paste_, stejně jako jsme to udělali my. A budeme se těšit na vaše dotazy, připomínky. Ať vám to funguje!
