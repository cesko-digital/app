---
title: 'DevTalk #1 - Infrastruktura'
cover: https://data.cesko.digital/web/projects/cesko-digital/cover.jpg
date: 2021-11-13-10-10
slug: devtalk-1-infrastruktura
description: 'V prvním díle DevTalku se podíváme na infrastrukturu a DevOps, tak jak se na něj koukáme v rámci Česko.Digital. Na příkladu si ukážeme Terraform, Github Actions a jak to vše zapadá do našeho dobrovolnického workflow.'
videoUrl: 'https://www.youtube.com/embed/5IlYHMlIZCc'
tags: 
  - 'Infrastruktura'
  - 'DevTalk'
  - 'AWS'
  - 'Terraform'
  - 'Github'
tableOfContent:
  - title: 'Úvod'
    time: '0:00'
    start: 1
  - title: 'Terraform'
    time: '3:30'
    start: 210
  - title: 'Github Actions'
    time: '22:07'
    start: 1327
  - title: 'Plan on PR'
    time: '31:40'
    start: 1900
  - title: 'Parametrizace'
    time: '42:14'
    start: 2534
  - title: 'Synchronizace obsahu'
    time: '55:20'
    start: 3320
  - title: 'FAQ: Vývojová prostředí'
    time: '01:04:20'
    start: 3860
  - title: 'FAQ: Cena cloudu'
    time: '01:14:00'
    start: 4440
  - title: 'Shrnutí'
    time: '01:19:20'
    start: 4760
sources:
  - type: Github
    title: 'Zdrojové kódy'
    url: 'https://github.com/cesko-digital/infra-demo'
  - type: Slack
    title: 'Podpora na Slacku'
    url: 'https://cesko-digital.slack.com/archives/CS7RPPVUL'
  - type: Other
    title: 'Dokumentace Terraformu'
    url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket' 
credits:
  - title: 'Obsah'
    name: 'Martin Wenisch a Tomáš Znamenáček'
  - title: 'Post-produkce'
    name: 'Lukáš Návesník'
  - title: 'Přepis a korektury' 
    name: 'Kateřina Peřinová a Vanda Adlerová'
---

[0:00](?start=1)

Dnes bychom s vámi rádi prošli takovou kuchařku infrastruktury, tak jak o ní uvažujeme, jak s ní pracujeme v Česko.Digital. Rozhodli jsme se začít tento seriál právě infrastrukturou, protože je to jedno z nejčastějších témat, které řešíme s projektama, který se dějou v Česko.Digital.

Infrastrukturou myslíme to, kde a jak běží databáze, kam se nahrávají data, kde a jak běží CDNka a tyhle věci. Klíčový princip, který je pro nás důležitý je, aby všechny věci byly pokud možno v rámci jednoho repository na GitHubu. Tedy aby jedno repo na GitHubu obsahovalo dejme tomu frontend, backend a infrastrukturu najednou. Takže když si někdo převede k sobě tohle repo, dostane všechny ty tři věci. Pak bychom mohli snadno projekt předat mateřské organizaci.

Ten důvod, proč vlastně takhle mocně sázíme na GitHub je hlavně to, že většina lidí ho zná a umí s ním pracovat. Je tam nízký práh interakce a je super, že díky jejich automatizační platformě GitHub Actions se dá spousta z věcí, které běžně děláme, automatizovat, což vám dnes ukážeme. Teď se můžeme pustit do konkrétního příkladu. Když budeme mluvit o infrastruktuře, tak klíčovým nástrojem pro práci s ní je Terraform. Je to nástroj, který umožňuje deklarativně popsat žádoucí infrastrukturu v takovým jako kódu, a pak přímo tu infrastrukturu vytvořit u poskytovatele, kterého si vyberete. V našem případě jsou to nejčastěji Amazon Web Services, familiárně AWSko.

Já k tomu ještě ve stručnosti dodám, proč jsme si vybrali právě GitHub. Ze všech těch nástrojů je na GitHubu největší komunita, což využívá většina Open Source Software, která se vytváří na GitHubu. Další výhoda je, že je nejvíce z těch nástrojů transparentní, že víceméně všechno, co se v open source děje je veřejné a jednoduše veřejně přístupné. A taky v neposlední řadě to, že většina nástrojů, jejich Premium, je pro open source projekty zdarma. My budeme pracovat s projektem InfraDemo. To, o co nám jde, je ukázat celou pipelinu té infrastruktury, nejít do hloubky, což znamená neřešit konkrétní věci, co deployujeme, ale na minimálním příkladu si ukázat vlastně kompletní cestu, jak ten GitHub a Terraform používáme.

[3:30](?start=210)

Teď bych rád ukázal, co to je Terraform. Je to nástroj společnosti HashiCorp a jeho cílem je deklarativně popsat infrastrukturu v kódu, a pak se zeptat Terraformu: Terraforme, co se musí stát, abychom se do tohoto stavu popsané infrastruktury dostali? Pro různé providery: my v Česko.Digital pracujeme v AWS, ale je to možné víceméně pro jakéhokoliv public cloud providera, případně i nějaké menší providery, pokud mají plugin Terraform. My tedy budeme používat AWS a plugin Terraformu pro AVS. Konkrétně tohle je nejminimálnější příklad toho, co Terraform může znamenat. Deklarujeme v souboru terraform.tf v nějaké podsložce infrastructure/aws v repozitáři. Soubor terraform.tf. Terraform už ví, že si má brát tyto soubory. Když se podíváte na většinu repositářů Česko.Digital, tak tam najdete jako složku infrastructure a tam většinou AWS pro ty projekty, které používají AWS. Ten resource, na kterém si budeme ukazovat všechny naše příklady, protože nám nejde o to budovat infrastrukturu a učit se nástroje AWS, je „s3_bucket“.

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

Tomáši, co to je „s3_bucket“?

„s3_bucket“ neboli kyblíček (hezky česky řečeno) je takový základní stavební kámen infrastruktury v AWS. Je to komponenta, která je určena pro ukládání dat. Takže pokud do AWSka potřebujete uložit libovolná data ve formě souboru - nepotřebujete tedy databázi, ale potřebujete uložit pár souborů - tak vždycky to ukládáte do nějakého s3_kyblíčku, který se potom propojuje s dalšími komponenty a staví se z toho nějaká složitější infrastruktura. Ale kyblíček v s3 je taková z nejjednodušších komponent. Proto jsme si ji vybrali pro ukázku té infrastruktury.“

Já ukážu, jak to vypadá naživo v AWS. Toto je náš AVS účet a služba S3 a všechny buckety, které teď konkrétně máme. Náš cíl je spravovat tady navíc ještě jeden bucket, který se bude jmenovat „1-terraform-cd-demo“. Začíná to jedničkou, protože chceme, aby byl nahoře a nemuseli jsme ho hledat. A chceme, aby byl „private“. To je všechno, čeho teď chceme dosáhnout na této infrastruktuře, aniž bychom to museli klikat přes „create bucket“.

[6:55](?start=415)

Já udělám malou odbočku toho, co se děje tady v tom prostředí, které mám. Je to IntelliJ Idea. Jde použít víceméně jakýkoliv jiný textový editor, například VSCode. A mám tam instalovaný plugin pro Terraform, který mi pomáhá tím, že mi u těhletěch souborů doplňuje intellisense a můžu například vědět, co všechno za parametry má, třeba ten zdroj “aws_s3_bucket”. Navíc mám terminál, který je ve složce aws, vlastně ve struktuře infrastructure/aws, že pracuju v této složce a mám nainstalovaný nástroj Terraform verzi 0.15.4. Když si budete procházet stránky Terraformu, tak doporučuji projít si nejdřív „Get started“, kde si projdete pro váš vybraný cloud ty úplně nejběžnějším příkladem instalování samotného Terraformu.

[8:07](?start=487)

Čímž se dostanete do stavu, že budete mít terminál a budete tam mít funkční Terraform. V tom samém návodu se dozvíte, že první příkaz, který v Terraformu potřebujete je „init“, který v podstatě připraví všechno k tomu, aby Terraform mohl fungovat. Stáhne pluginy, které se nadefinovaly, pro nás je to aws ve verzi větší než 3.28. Výborně, teď je víceméně všechno připravené a už se můžeme Terraformu ptát a dávat mu nějaké příkazy. Jak jsme říkali na začátku, toto je deklarativní zápis infrastruktury, kterou chceme mít. Je to v podstatě ten stav, kam se chceme dostat. A to co my děláme, se ptáme Terraformu, jak se do tohoto stavu dostaneme z konkrétního stavu, který teď existuje. Ten příkaz je konkrétně „terraform plan“, kdy my se teda Terraformu ptáme: Terraforme, řekni nám, co se musí stát, abychom se dostali do finálního stavu.

A Terraform nám řekne, že aby se to mohlo stát, musí právě vytvořit právě ten kyblíček. To znamená, vytvoří jeden zdroj, nic víc. Terraform nejenom, že vytváří ten plán, ale dokáže to za nás podle toho plánu i sám naklikat. V podstatě to, co udělá, konkrétně dalším, třetím, důležitým commadem Terraformu „apply“, kde mi ten Terraform přes aws api vytvoří to, co nám řekl, to znamená, vytvoří tento bucket. Ještě se nás ptá, jestli to opravdu chceme udělat. My to opravdu chceme udělat.

Mimochodem tady je hromada parametrů ukázaná, přitom my jsme vlastně prosili o bucket, kde jsou zadané jen dva parametry, a teď Terraform říká, že vytvoří bucket, který bude mít všechny tyto parametry. To jsou nějaké výchozí hodnoty?

Ano. Když se podíváte na dokumentaci Terraformu, což doporučuji si projít, protože Terraform má výbornou dokumentaci. Když se třeba podívám na resource s3_bucket, což znamená aws_s3_bucket, název toho resource je první věc hned za resource a další je jméno toho resource, tak se dozvím několik velmi důležitých věcí. První jsou nejtradičnější příklady použití – nějaké minimální i nějaké více komplikované. Druhá zásadní věc jsou tzv. argumenty. Argumenty jsou to, čím můžu daný zdroj definovat. Já jsem si třeba vzal jen bucket, což je název toho bucketu a vzal jsem si acl, což znamená jeho viditelnost. Chci, aby byl private. Klidně bych tam mohl přidat podle dokumentace další věci. Když bych chtěl například ten bucket šifrovaný, tak tady dám „server_side_encryption_configuration“, s čímž mi může pomoct můj plugin pro IntelliJ a mohl bych si takto definovat bucket, který by byl šifrovaný.

[11:42](?start=702)

Teď se podíváme na výsledek našeho Terraform apply, kde vytvářel s3_bucket a za 4 vteřiny ho vytvořil, což znamená, že ten Terraform apply doběhl úspěšně. Můžeme se podívat, jestli je to pravda. Tady vidíme náš kyblíček, který je zatím prázdný. Pokusíme se ho naplnit a zužitkovat časem.

Takže teď se vlastně stalo úplně to stejné jako bych přišel do té administrační konzole, klikl na „Create bucket“ a napsal tam, že chci kyblíček s tímto názvem a že chci, aby byl soukromý. Tak se stalo přesně totéž. Akorát místo toho, abychom to klikali ručně, tak jsme to popsali v definici té infrastruktury, nějakým formálním jazykem, a Terraform to poté naklikal za nás.

Je to přesně tak. A když už jsme u té dokumentace, tak zmíním ještě druhou důležitou věc, to jsou atributy. Na rozdíl od argumentů, které nám víceméně definují zdroj, atributy popisují ten zdroj ve chvíli, kdy je vytvořený. Například pokud znáte aws, tak jakýkoli resource má arn (amazon něco name) a ten se vytvoří až ve chvíli, kdy třeba v našem případě ten bucket je vytvořený. A přes tyto atributes my potom můžeme přistupovat, přes Terraform, můžeme přistupovat k jednotlivým atributes a používat je kdekoliv jinde v tom kódu. Například, kdybychom do toho scriptu chtěli přidat output, cože je něco jako vyprintovaní nějaké hodnoty, a chtěli bychom vyprintovat právě to arn toho nově vytvořeného bucketu, tak to můžeme v podstatě takto adresovat. Když se podíváme, co nám vytvořilo.

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

Tohle mě zajímá. Teď když necháme znovu proběhnout ten Terraform, tak on už se nebude podruhé snažit vytvářet ten kyblíček, protože ten kyblíček už existuje. Takže teď by to mělo udělat – nemělo by to udělat nic a jedině to vypíše ten side effect, vypíše to arn toho kyblíčku. Je to tak?

Ano, je to přesně tak. Terraform se podívá na state, ví, že ten kyblíček už tam je, takže ho nechce vytvořit. Jediné, co se snaží vytvořit, je, že my jsme přidali output, kde ten s3-arn je opravdu arn toho našeho kyblíčku terraform-cd-demo, který jsme tady víceméně přes ten atribute adresovali.

[14:43](?start=883)

Tímhle jsme si ale ještě nijak zvlášť nepomohli. Místo toho, abychom to naklikali ručně, tak to za nás udělal robot.  A jediný, v čem jsme pokročili, je, že tu infrastrukturu máme někde popsanou. Pokud někdo chce vědět, jak ta infrastruktura vypadá, tak nemusí chodit do konzole awska, ale má jí tady popsanou. Ale jinak jsme žádný zásadní pokrok neudělali.

Je to přesně tak. Víceméně to, co jsme udělali, je, že přitom lokálním behu Terraformu jsme docílili toho, že já nemusím nic klikat, ale běží mi to tady v konzoli. Ale pořád potřebuji přístup do aws. Tahleta konzole je vlastně spárovaná s tím aws účtem přes nějaké klíče. To, jak to jde posunout a na co bychom se rádi podívali teď je, jak to můžeme propojit s GitHubem a jak můžeme využít právě GitHub Actions. A když se podíváte na to, co vlastně ten Terraform vytvořil lokálně, v té lokální složce, tak to jsou nějaké jeho metasoubory, což jsou ty providery, co postahoval, a je to tzv. terraform state. Ten terraform state je soubor, kam si Terraform zapisuje aktuální stav na aws. Je tam například zapsané, že tenhleten kyblíček, který se jmenuje 1-terraform-cd-demo, vytvořil on a vytvořil ho za nějakých podmínek. A oproti tomuto stavu on si dělá změny. Tak pozná, že má spravovat ten terraform-cd-demo kyblíček.

Takže vlastně když ten Terraform startuje, vezme si ten stávající stav (ten může třeba aktualizovat z awska, ale vezme ten stávající stav), udělá rozdíl oproti žádoucímu stavu, vypadne mu z toho seznam akcí, co je potřeba udělat, aby současný stav odpovídal tomu požadovanému a to je to, co ti vypíše: „hodlám udělat tohle a tohle“ a ty řekneš: „jo udělej to“ a proběhne to.

[17:05](?start=1025)

A protože my pracujeme lokálně, tak se ten stav uloží lokálně do složky. Pokud bychom chtěli přejít do cloudu a přejit na GitHub a všechno automatizovat, potřebujeme, aby se ten stav nevytvářel lokálně. Vlastně vůbec nebudeme s Terraformem pracovat lokálně, chceme s ním pracovat jenom přes GitHub Actions. To znamená, že musíme soubor terraform.tfstate dostat na místo, kam se k němu dostane například oběhové prostředí GitHubu. A protože pracujeme s aws, tak rovnou využijeme toho, že máme s3 službu, a vytvoříme tam kyblíček, do kterého uložíme ten tfstate. To je výjimka toho, že věci děláme automaticky. Tento kyblíček musíme vytvořit ručně.

To je klasický problém slepice/vejce. Na to, aby fungoval Terraform, potřebujeme kyblíček, takže musíme to založit ještě předtím, než to spustíme.

Je to přesně z toho důvodu. Takže ten kyblíček si vytvoříme ručně s defaultními hodnotami. Máme ho vytvořený tady. Zatím prázdný. 

[18:29](?start=1109)

A ještě než to budu měnit, ukážu další command Terraformu, který je velmi důležitý pro testování. Kdy víceméně všechno, co ten Terraform vytvořil, chceme zase zničit.

Ten command se jmenuje destroy. On se zase podívá na ten state, zjistí, že tam má jeden kyblíček. Aby se dostal do stavu, kde není vůbec nic, musí ten jeden kyblíček zničit.

Ano, já to chci udělat.

Můžeme se podívat na s3, že se to opravdu stalo a kyblíček zmizel.

Teď jsme v bodě nula. Teď jak propojit Terraform s s3 tzv. backendem, tzn. aby se state nesynchronizoval do složky lokální, ale právě do cloudu do s3. Definujeme to jako backend S3

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

Teď pokud smažeme původní Terraform panely a uděláme znovu Terraform init, tak znovu si stáhne všechno, co potřebuje, ale zároveň propojí ten backend s s3 - naším krásným kyblíčkem.

Takže teď když si stáhne aktuální stav z awska, tak už ten stav neukládá a neznačí si ho k sobě do lokální složky, ale ukládá ten zjištěný stav do toho kyblíčku na s3, abychom na tom mohli případně spolupracovat, abychom kdokoli další mohl koukat na ten stejný stav.

Ano, je to přesně tak. Můžeme si to ukázat na konkrétním příkladu, kdy Terraform, který máme nadefinovaný, odblokujeme. A on nám zase říká, protože jsme předtím udělali destroyed, abych ten kyblíček vytvořil. Tak musím udělat toto. Jedna ze zajímavostí těch atributů je, že některé nejsou známé předtím, než se ten kyblíček vytvoří, jako je jeho arn. Když si řekneme, že ano.

Teď se zase dostaneme do stavu - bude vytvořený kyblíček podle nějaké definice naší infrastruktury, ale rozdíl je v tom, že teď stav infrastruktury není uložený na lokálu, ale je uložený v nějakém sdíleném uložišti na awsku.

Ano. Když se teď podívám do složky aws, mám tam .terraform soubor, což je stažený aws provider, mám tam nějaký lock soubor, ale už tam nemám terraform.tfstate.

Podívám se do našeho kyblíčku se statem, kde mám terraform.tfstate. Takže ten původní, který byl lokálně, je teď na s3 a je s ním propojený.

[22:08](?start=1328)

Co jsou vlastně na GitHubu GitHub Actions? Jsou to v podstatě nějaké kontejnery, kde běží kus kódu nebo klidně nějaké plnotučné programy jako workflow. Což znamená, že my si můžeme nastavit, že chceme, aby se nějaký workflow spustil ve chvíli, kdy vytvoříme pull request nebo ve chvíli, kdy přidáme nějaký nový kód do masteru. To, čeho chceme docílit, je, aby když změníme infrastrukturu, to znamená definici Terraformu, ten náš terraform.tf soubor, tak aby po merch do masteru nebo po změně v masteru se provedlo terraform_apply. Toho docílím právě přes GitHub Actions. Definováním Action, kterou tady mám jako terraform_apply.

Takže ty actions jsou definovány jako nějaký YAML přímo v repository?

Ano. V adresáři .github/workflows se jakýkoliv jeml zkusí vzít jako action (jako workflow) a tady vidíme, co to znamená – nějaké jméno, že chceme „Terraform Apply on push“ a chceme, aby při každém „push“ do branche master, kde se změní něco v adresáři infrastructure/aws/ (** znamenají cokoliv pod tím) se provedly tyhlety joby. Konkrétně tady máme jeden job terraform, který se skládá z několika kroků – první je check out toho samotného repozitář, že v tomto stavu budeme mít nějaký ubuntu virtual machine, který bude mít checkoutnutý celý repositář. Potom skládáme workflow z nějakých krabiček. Krabička, kterou pro to použijeme, je přímo hashicorp, což je tvůrce Terraformu, a je to terraform-github-action, kde můžeme použít jednotlivé commandy Terraformu. Potřebujeme flow nejdříve init, to znamená, že potřebujeme, aby se provedl init té naší virtual machine, to znamená, stáhl se z s3 ten tfstate (v našem případě). Hned potom potřebujeme udělat apply.

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

Obě tyto akce potřebují aws klíče, které máme sdílené v GitHub secrets. Konkrétně to vypadá tak, že v settings repozitáře jsou secrets, což nemusí být jenom secrets, ale můžou to být jakékoliv variables, které definují cokoliv, co se v repozitáři děje. Aktuálně mámě dvě, což je víceméně náš deployující klíč a token pro aws.

Když to shrnu: já udělám nějakou změnu v terraform.tf, pushnu to. Jakmile to pushnu do masteru, tak vlastně Github si všimne: ok, je tady nějaká GitHub Action, která se vztahuje tady na ten push a tady na tu cestu, tak spustí action. Ta vypadá tak, že se někde vycheckoutuje ta aktuální verze kódu, která souvisí s tím pushem. Inicializuje se terraform, to znamená, že on si načte stav z té s3, stáhne si komponenty pro awsko apod., podívá se na novou definici infrastruktury, srovná jí se stávajícím stavem, řekne: musím udělat toto a toto, pak si načte z proměnných prostředí přístupové údaje do awska a přes aws api provede změny na infrastruktuře. A když to doběhne po pushnutí bude infrastruktura v tom stavu, který popisuje soubor terraform.tf.

Je to tak. Ukážeme si to prakticky. Tady mám dva víceméně důležité soubory. Jeden je můj terraform.tf s deklarativním popisem infrastruktury, kam se chci dostat. A druhý je moje GitHub Actions terraform_apply, která mi říká, že při každé změně masteru ve složce infrastructure/aws proveď tyto kroky. Když to commitnu…

Tu GitHub Action necommitujeme pokaždé, že jo? Teď mi jí jednou commitneme, ona pak bude vytvořená a už bude fungovat a teď jenom shodou okolností commitujeme obojí najednou, ale kdykoli příště už bychom jen commitli ty změny v definic infrastruktury a to by stačilo.

Ano, tím, že jsme ten soubor teď vytvořili, tvořili jsme oba, tak je to takový úvodní commit.

Push. Pushujeme přímo do masteru. Do repozitáře.

[27:40](?start=1660)

Chvilka napětí….Můžeme se podívat, že teď tam máme všechny ty tři soubory – v .github/workflows náš soubor terraform_apply, v infrastructure/aws náš soubor tf a .gitignore, který je tam jako malý bonus.

V Actions přibyla dotyčná action. Která ovšem neběží.

Uděláme náhodný push. Věc, kterou jsme si neukazovali, je změna v tom, že tahle infrastruktura je nasazená po terraform_apply. I kdyby se ta Actions spustila ve chvíli, kdy jsme to tam pushli, tak by se nestalo nic. My si ukážeme, jak to funguje, když máme nějakou změnu. Když bych chtěl třeba tu viditelnost toho našeho data bucketu změnit z private na public-read. Teď už jedu klasický workflow, kdy commituju přímo do mastru.

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

A teď už nám běží naše action. Můžeme se podívat, co konkrétně to znamená. Ten job se jmenuje Terraform. Zatím se připravuje, což znamená, že do toho kontejneru se stahují všechny ty jednotlivé bloky, které tam máme. Ty bloky jsou reprezentované nějakými Docker fily, které se postahovaly. Provedl se Terraform init. Tady můžeme vidět, že se stalo to samé, co se nám stalo lokálně, tzn. že propojili jsme se s s3 bucketem a postahovaly všechny pluginy. Teď probíhá terraform_apply.

Teď to proběhlo a tady vlastně vidíme změny. Tady vidíme změnu, že náš kyblíček je z private na public-read. Vidíme, že po aplikaci se nic nepřidávalo, jeden zdroj se změnil a nic se nezničilo.

Super. Takže teď vlastně kdokoli má přístup do masteru, tak může změnou souboru změnit naši živou strukturu na awsku. Je to tak?

Je to přesně tak. Nepotřebujeme si předávat už přímé přístupy do aws, nepotřebujeme si předávat klíče, nepotřebujeme, aby člověk, který s tím aws bude pracovat, byl zároveň administrátorem toho účtu, na kterém pracujeme.

A zároveň už nikdo nemusí dělat v terminálu, jestli tomu dobře rozumím. Stačí tady zmáčknout tečku a spustí se nám nějaký editor, kde si můžu něco změnit v terraform.tf, aniž bych cokoli dalšího věděl a uměl, tak se vlastně změní infrastruktura.

[31:33](?start=1893)

Je to tak. Kdokoli může přijít a přidat nám request. Další důležitá věc a další krok v kompletaci té automatizace je, že kdyby teď někdo přišel, protože ten infra=demo repozitář je public, a řekl si, že prostě public-read bucket nikdy, všechny buckety musí být private, upravil to v integrovaném vscode, vytvořil nám pull request s tím, že by to přepsal zpět na private, tak my bychom vytvářeli review toho pull requestu. To, co bychom nejspíš museli udělat, kdybychom nevěřili samotnému kódu a chtěli bychom vidět, co ten terraform dělá, je, že bychom si udělali check out toho pull requestu, napárovali to s naším aws účtem a koukli se: Terraforme, naplánuj nám to, co se musí stát, aby ten terraform prošel.

My vlastně vidíme diff tý popisovaný infrastruktury, ale ten diff v tom zadání se může propsat v nějaký větší změny v realitě.

Ano, abychom v tomhle pomáhali těm lidem, kteří dělají review, což v Česko.Digital jsme většinou my a my si chceme pomáhat, tak můžeme vytvořit další workflow, který nebude pracovat s mastrem, ale bude pracovat konkrétně s pull requesty a to tak, že na jakémkoli pull requestu, když se něco změní na infrastructure AWS a čemkoli pod ní, zase používáme náš tradiční hashicorp/terraform akci, začínáme initem, tím začínáme vždycky a můžeme nechat terraform naplánovat naše změny a vypsat je do pull request. To znamená, že ten finální výsledek toho, kam se chceme dostat je, že kdokoli přijde a udělá nějakou změnu v naší infrastruktuře a vytvoří pull request, tak do toho pull requestu nám terraform právě tímhle workflow dodá, jaké změny se musí udělat. Pro nás reviewery je pak velmi jednoduché se podívat - tenhle div chci, tyhle kroky chci aby terraform udělal, zamergovat ho, co pustí ten terraform apply workflow.

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

Čili nejdřív chceme commitnout tu novu action, abychom si vyzkoušeli, že to nejde commitnout najednou obě ty změny. Čili teď přidáváme to github action, která bude obsluhovat pull requesty, který se týkají infrastruktury. Teď bychom vlastně chtěli do nové větve udělat nějakou změnu. Třeba vrátit ten kýblíček na private.

Já rozhodně chci vracet kýblíček na private. Protože public kýblíčky ... spousta firem zjistila, že to není dobrý nápad. Teď workflow nebude takový, že budeme commitovat přímo do masteru, ale vytvoříme si novou branch a commitneme do ní. Teď pushujeme vlastně do branche.

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

Teď probíhá akce Plan on PR on branch private-bucket. Zase se můžeme podívat, co přesně dělá. Dělá Checkout, Terraform init a Terraform plan. Tady vlastně vidíme, co se stalo, vidíme ten plán.

Teď tam teda s trochou štěstí přibyl komentář u toho pull requestu.

Vidíme ten plán, který je změnit public-read na private a tady nám říká, že vytvořil comment on pull request. Takže já se na ten pull request podívám a mám tady od terraformu output toho plánu, který mí říká, že aby se to stalo, tak musí provést tuhle jednu změnu. Já se na základě toho můžu rozhodnout, ano je to rozhodně vzrušující, já se na základě tohohle toho můžu jako reviewer rozhodnout, co s tím udělám a protože se mi to líbí a chci private bucket tak to rozhodně zamerguju.

A tím se teda spustí už ta předchozí integrace, tz. teď se probere ta github action, která se stará o to nasazení změn na AWS a chvilku se tady bude něco motat a na konci budeme mít kýblíček v AWS zase soukromej.

[38:07](?start=2287)

Teď jsme se dostali do velmi důležitého milníku, kdy víceméně všechno, celé to flow pull requestu je automatizované. Chtěl bys to nějak shrnout?

Dobře, takže vlastně teď ten zásadní pokrok je v tom, že zatímco předtím bychom museli dávat někomu klíče od AWS a dávat mu administrátorský účet, tak teď vlastně ty lidi už vůbec nepřichází do styku s AWS. Stačí změnit tu infrastrukturu vlastně v Terraform.TF v libovolným editoru, klidně prostě z telefonu tady na githubu udělat nějakou změnu. Vznikne pull request, díky github action se probere terraform, řekne dobře tadyty změny v infrastruktuře by vypadaly v reálu takhle, tohle já bych reálně měnil, následně ten kdo prohlíží ten pull request řekne jo nebo ne, pokud řekne jo, mergne to. Naskočí ta druhá integrace, která zavolá znova terraform, řekne tyhle změny, nebo respektive tady tu novou infrastrukturu bych chtěl mít. Terraform vlastně spočítá, co je potřeba udělat za změny a ty změny provede a výsledkem je teda novej stav infrastruktury. A tohle všechno probíhá klasicky za tím gitovým workflow, což má mimo jiné za důsledek, že teď jsme schopní udělat třeba revert změn v infrastruktuře, že pokud uděláme nějaký změny, který se ukážou jako nežádoucí, můžeme revertnout commit a tím jakoby vlastně vrátíme zpátky ty změny na infrastruktuře.

Je to tak a má to i opačnou výhodu, když někdo nechtěně rozbije infrastrukturu v konzoli, což se nám také v Česko.Digital stává, protože všechny projekty jsou pod jedním účtem. A nestává se to výjimečně. tak můžeme udělat to, že spustíme terraform apply tak jak je a on víceméně ty změny, kde někdo něco rozbil vrátí do původního stavu, který my chceme.

Ještě jsme chtěli zmínit jednu věc, abyste si nemysleli, my jsme tady ukazovali konfigurační soubory toho terraformu a konfigurační soubory github actions, všechno jsou to docela, nebo minimálně v případě github actions, jsou to docela dlouhý věci. Rozhodně to není tak, že by Martin přišel a vysypal, třeba nastavení té github action, z rukávu. Je to tak, že tohle je klasický copy and paste, takže vlastně tu github action převezmeme odněkud z dokumentace nebo z nějakých jiných ukázkových github actions nebo z předchozích projektů. Pak jenom upravíme ty věci, který jsou specifický pro tenhle projekt, takže nebojte se, nemusíte to psát od nuly tady ty konfigurace, totéž platí i pro terraform jako takový. Standardní styl práce, když chci dejme tomu konfigurovat nějakou distribuci Cloudfront, tak jdu do dokumentace terraformu, tak si najdu nějaký příklad jak vypadá konfigurace cloudfrontu, naberu si ten kus infrastruktury do schránky, vložím ho k sobě do tý definice infrastruktury, tak upravím nějaký parametry, který jsou relevantní pro ten můj projekt, vyzkouším to, otestuju to a pak to vlastně nasadím do praxe. Takže stručně řečeno, nebojte se, že to budete všechno psát ručně. Je to do velký míry copy and paste a úpravy na místě.

Já bych k tomu dodal, že ta dokumentace terraformu je opravdu dobrá a je tam strašně moc příkladů a dokonce je to i tak, že když chci použít nějaký AWS resource, otevřu si dokumentaci terraformu, tak úplně první blok kódu, který tam je, je přesně tak, jak to chci použít. To se stává velmi často. Opravdu je to velmi silný copy and paste a dá se to psát velmi jednoduše, i velmi komplikované infrastruktury.

[42:14](?start=2534)

S tím tématem copy and paste souvisí naše další téma, kterýmu jsme se chtěli věnovat a to je parametrizace té infrastruktury, protože velmi často člověk potřebuje nechat někde v té definici infrastruktury třeba nějakou proměnnou, kterou nastavuje odněkud zvenčí, v našem případě z githubu. Takže my bychom teď rádi ukázali, jak to funguje, že vlastně můžete jít na github, do té sekce secrets. Jak Martin říkal, mezi secrets není jenom tajemství, jako věci tajný, ale jsou tam i běžný konfigurační parametry. Takže tam půjdem, dáme tam nějakou hodnotu, nějakou proměnnou, kterou následně přebereme v definici tý infrastruktury, abychom mohli tu infrastrukturu konfigurovat přímo přes github, což bude mít svoje nějaké výhody, ke kterým se ještě vrátíme. Martine, mohl bys nám to prosím ukázat?

Ukážu to velmi rád. První krok, který potřebujeme k tomu, abychom z venčí dokázali přidávat nějaké parametry, je pracovat uvnitř toho kódu terraformu s proměnnými. Já udělám malý vstup o tom, jak funguje ta složka terraformu a jak fungují ty tf soubory. Víceméně ten command terraform máme nad složkou AWS, což jsme si ukazovali v tom terminálu, co terraform udělá je, že všechny soubory uvnitř té složky, které mají .tf koncovku vezme a zpracuje je, což znamená, že já si můžu tuhle infrastrukturu, tenhle deklarativní zápis, dělit přesně jak potřebuju na různé soubory. Doporučuju dělat to po nějakých logických blocích. Velmi běžné je přidat variables jako zvláštní soubor. Já si tady přidám variables.tf. Variables definuju jako variable, název, my chceme konkretizovat jméno toho bucketu, takže například data-bucket-name a chceme aby to byl string. Teď mám vlastně tu variable nadefinovanou, zatím k ní nemáme přidanou hodnotu, ale můžeme jít teď už začít používat. My jí chceme nahradit právě název toho bucketu. Dostaneme se k těm variables jako var. data-bucket-name. Teď vlastně ten terraform nahradí ten string, který jsme tam měli právě stringem z variable. 

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


Ukážeme nejdřív, co se stane, když teď spustíme terraform apply. Terraform se nás zeptá na variable data-bucket-name ho nemá, dodáme náš původní název.

A on říká, všechno je v pořádku, není potřeba nic změnit, což znamená, že ten variables se tam opravdu propsala na správné místo. Teď jak dostat variable do terraformu zvenčí. Nejjednodušší způsob a preferovaný způsob více méně na všech infrastrukturách z česko.digital je enviroment variable. Terraform zpracovává enviroment variable a ty které mají předponu tf.var a název proměnné, zpracuje jako tu proměnnou. Což znamená, že kdybych já chtěl tu variable dodat externě, tak použiju export, což je bashovský export variables TF_VAR a název proměnné, což je data-bucket-name a její hodnotu, což je původní terraform-cd-demo.

Takže teď se nás vlastně terraform apply nezeptal na var.data_bucket_name, ale vzal si jí z té naší exportované variable. Teď vlastně co chceme udělat je tuhletu exportovanou variable dodat do githubu do naší github action. Protože kdybysme teď udělali nějaký commit, tak by to neprošlo právě proto, že ta variable by neexistovala v naší action na githubu. Ta změna je poměrně jednoduchá, musíme ji udělat i v apply, i v plan. Takže přidat data_bucket_name a my chceme, aby to bylo parametrizované ze secrets githubu, což znamená využijeme secrets.BUCKET_NAME. A to co se teď stane je, že pro celý běh toho kontejneru, jsme vytvořili enviroment variable, která se vezme ze secrets jako BUCKET_NAME. Ten BUCKET_NAME zatím nemáme v secrets, ten musíme přidat.

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

Teď, když jsme na to narazili, tak kdybychom to pojmenovali jinak, třeba 2-terraform-cd-demo, tak to, co terraform udělá je, né že vytvoří druhý vedle toho prvního, ale smaže ten první a vytvoří nový bucket, protože on si pamatuje, že pracujeme s jedním resource, že to je ten samý resource.

On má někde interně poznačenou tabulku, kde je řečeno, že tomu takhle pojmenovanýmu zdroji odpovídá ten s3 kýblíček s takovým a takovým arn.

Vytvoříme pull request, který nám spustil terraform Plan on PR, ten nám teoreticky měl říct, že žádná změna není potřeba.

[54:18](?start=3258)

No a mezitím, než to doběhne, tak se můžeme zamyslet nad tím, k čemu nám tohle je. My si to vlastně nejlíp ukážeme na příkladu. My totiž teď ten kýblíček, který jsme vytvořili tak je permanentně prázdný. Tak my máme v rukávu nachystaný příklad, který do toho kýblíčku něco nahraje přímo z toho repository. A abychom mohli do toho kýblíčku z repository nahrávat tak potřebujeme znát název toho kýblíčku, k čemuž se nám právě hodí ta proměnná.

Ano, naprosto běžný use case na skoro všech projektech, které používají nějaké statické soubory ať už jsou to react aplikace, nebo jsou to obrázky nebo jakýkoli content je, že z nějakého zdroje je potřeba je dostat na content delivery network (cdn). Právě proto používáme to s3. A například v repozitáři assets, což je podklad pro data česko.digital ho synchronizujeme přímo z content adresáře z repozitáře. Má to spoustu výhod, víceméně veškeré obrázky, co jsou nějaké cover věci na blog, můžeme spravovat přímo v repozitáři přes pull requesty. Ukážeme si velmi jednoduchý způsob, jak to vytvářet. V tom repozitáři jsme udělali složku content, kde máme brand-manual. Jako úplně náhodný příklad nějakého souboru, který chceme v s3 bucketu, protože když máte dobrý brand manuál, tak ho rozhodně chcete v s3 bucketu. Vytvoříme si workflow, specificky, podíváme se na workflow, které zajistí to, že při každé změně v tom content adresáři při push do masteru, se upraví ten content s3, vlastně bude odpovídat tomu contentu v repozitáři. Použijeme na to zase stavební blok akci s3-sync-action, které řekneme, že chceme ty soubory jako private a chceme smazat soubory s s3, které smažeme ze složky content.

Čili pokud něco není ve složce content a je to v kýblíčku, tak to z toho kýblíčku zmizí.

```yaml
name: 'Sync content to S3'

on:
  push:
    branches:
      - master
    paths:
      - 'content/**'

jobs:
  sync_content:
    name: 'Sync Content'
    runs-on: ubuntu-latest
    steps:
      - name: 'Checkout'
        uses: actions/checkout@master
      - name: 'Sync to S3'
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --acl private --follow-symlinks --delete
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_S3_BUCKET: ${{ secrets.BUCKET_NAME }}
          AWS_REGION: 'eu-central-1'
          SOURCE_DIR: 'content'
```

Přidáme tam naše AWS klíče, což je typické, a zároveň přidáme AWS_S3_BUCKET, který je cíl ze secrets.DATA_BUCKET. Zkontrolujeme si, jestli jsme to opravdu pojmenovali DATA_BUCKET. Pojmenovali jsme to BUCKET_NAME, což je dobré, takže secrets.BUCKET_NAME jsou vlastně ta parametrizace, která je na té nejvyšší, představte si jako že v tom githubu je jakoby nejvyšší úroveň té parametrizace. A když vytvoříme jiný repozitář secrets nebo uděláme forb toho repozitáře ty secrests se nepřenesou. Vlastně nový owner toho repozitáře, pokud by chtěl tu infrastrukturu deploynout tak jak je, zadá jenom vlastní secrets, tím vlastně parametrizuje celou tu infrastrukturu a spustí terraform apply, případně další workflows, které v tom repozitáři jsou. To specificky důležité pro s3, protože zrovna ta jména bucketů jsou globálně unikátní v rámci s3, což znamená, že kdybychom zachovali ten hard=coded string v terraformu a předávali bychom ten projekt třeba zadavateli, což v Česko.Digital běžně děláme. Zadavatel by si připojil vlastní AWS a spustil terraform apply tak by mu ten terraform řekl, že ten bucket už existuje někde jinde, na nějakém jiném účtu a proto ho nemůže vytvořit. Což nechceme a tam se zrovna to parametrizování přes github secrets hodí a dává tam velký smysl.

[59:49](?start=3589)

Takže znova, tady vlastně přidáváme novou akci a ta říká, kdykoli se cokoli změní v adresáři content, tak chceme poté spustit synchronizaci a ten obsah adresáře content nahrajeme do kýblíčku, jehož jméno je definovaný v nějaký proměnný. Ta synchornizace je i destruktivní, ve smyslu, pokud v tom kýblíčku je něco navíc, tak se to smaže. To znamená, že pokud my z toho adresáře conten něco vymažeme, tak se to skutečně vymaže i z toho kyblíčku v s3. A teď vlastně máme commitnutou tu akci a to samo o sobě nic neřeší, ted chceme vůbec commitnout ten adresář content s nějakým obsahem.

Je to tak, můžeme si to vyzkoušet. Nebudeme vytvářet pull request, uděláme to přímo do masteru.

A teď vlastně čekáme, že by měla naskočit ta synchronizační akce, po pushnutí. Takže na git hubu by se měl objevit klasickej oranžovej puntík u toho commitu...vlastně teď to chvilku trvá ten push, protože tam máme velkou objednávku…

Takže teď by u toho commitu měl být ten oranžovej puntík, který říká, že běží nějaká akce.

Běží akce sync content to s3 brand manual, kde se zase připravuje ta virtual machine, stahuje se tam vlastně nějaký Docker file toho s3 sync action. A tady vidíme, že synchronizuje uploaduje content brand manual.

Můžeme se podívat do konzole na AWSku, abychom viděli, že tam naskočil ten soubor?

Terraform demo, máme tady náš brand manual pdf a ještě možná se ptáte, že třeba teď to secret, což je název toho s3 bucketu...github dělá jednu výbornou věc, že v těch actions všechny secrets vyhvězdičkuje. Takže naprosto běžně můžete mít v rámci git hub, v rámci veřejného repozitáře na githubu, můžete mít secrets třeba heslo do databáze, to heslo do databáze může fungovat s terraform infrastrukturou a nemusíte se bát, že ty actions vám veřejně vypisují tu infrastrukturu, protože víceméně všude, kde je někde to heslo do databáze, tak v těch výpisech je vyhvězdičkované. Nestane se vám, že ty secrests nějak leaknou přesto, že máme veřejný repozitář. Takové nebezpeční tam není a proto, je to další výhoda těch github secret oproti nějaké konfiguraci, která je bokem.

[01:03:10](?start=3790)

A teď teda vlastně, teď máme nějaký obsah v tom repu, máme tam nějakou infrastrukturu a je to všechno pohromadě, takže teď vlastně jsme ještě o krok dál v tom, že když budu chtít udělat nějaký revert nebo jakoukoli operaci s tou historií, tak vlastně ta infrastruktura se správně hodí do toho žádoucího cílovýho stavu, podle toho co udělám v gitu a zároveň ten obsah se taky synchronizuje podle toho adresáře content, takže teď můžeme klidně udělat revert v tom adresáři content a zase se ty data odrazí reálně v tom obsahu kýblíčku. Takže máme vlastně ten obsah i tu infrastrukturu krásně verzovanou, kdokoli může vlastně nahrát něco do adresáře content. Github tohle vlastně umí i před drag and drop, takže můžete vlastně drag and drop něco hodit do adresáře content, je to docela přístupný. Zároveň tím vlastně neztrácíte ten hezkej verzovanej model, kdykoliv se cokoliv pokazí tak můžete udělat krok zpátky a všechno se to vrátí. Což já bych jako v životě občas dost uvítal.

[01:04:20](?start=3860)

Teď jsme si ukázali příklad parametrizace a jak to udělat více méně v celé flow té pipeliny až na úroveň git hubu. A teď se podíváme na jeden topic, který je vlastně nejčastější otázka, která navazuje právě na parametrizaci. A to je oddělování vývojových prostředí, development vs. production. Tome, kdy je dobré začít uvažovat o tom, že nebudeme mít jenom jeden master, ale budeme mít víc vývojoých prostředí.

Na to není jednoduchá odpověď. Taková základní osa, na které se teď pohybujeme je bezpečnost vs. efektivita, že vlastně ten důvod proč lidi chtějí oddělit vývojový prostředí od produkčního většinou souvisí s tím, že chtějí větší spolehlivost, je s tím spojený často taky s nějaký větší testování apod. Na druhou stranu je to nějaký proces a každý proces znamená nějakou překážku v efektivitě. Takže jako když to vezmu vulgárně, tak když to budu prát všechno do masteru, tak jsme všichni krásně produktivní, ale jednou za čas nám to prostě umře. A když bude něco, klidně i na několik úrovní integrace třeba a testování třeba, než to vůbec přijde do masteru a nasadí se to někam na produkci, tak je to výrazně bezpečnější, ale často výrazně pomalejší a je tam jako špatná ta zpětnovazební smyčka při vývoji. Teď jako jak to máme v Česko.Digitál, tím chci říct, že vlastně, že na tuhle otázku neexistuje jedna správná odpověď. Ta situace Česko.Digital je specifická v tom, že my zřídkakdy máme nějakou hromadu testerů a předepsaných testovacích ručních scénářů, který by někdo projížděl. Většinou to vypadá tak, že máte třeba vývojové prostředí a v tom se něco integruje, vytvoří se nějaký jako release kandidát , toho si vezme do prádla hromada testerů, najdou na něm chyby, nenajsou na něm chyby, když nenajdou mergne se do masteru a pokračuje se. Tenhle luxus my v česko.digital nemáme, protože nám chybí ta hromada testerů, takže máme tendenci spíš směřovat k tomu dávat věci do masteru, pokud to není něco ultra citlivého a tím se zbavit tady určitý překážky v efektivitě. Ale samozřejmě vyžaduje to tím pádem větší určitou vlastní zodpovědnost od vývojářů, kteří nemůžou říct: jo jako z dálky to na mě působilo docela dobře, tak to tam hoďme a uvidíme. Člověk jako sám musí být zodpovědný za to, že to co mergne, že nerozbije master. Takže my spíš jako směřujeme k tomu neoddělovat ty věci a přikročit k tomu oddělení teprv v okamžiku, kdy máme jasný problém, který stojí za to snížení efektivity vlastně.

To co se většinou snažíme učit vývojáře, nebo je k tomu navádět je opravdu zodpovědnost za ten kód, který vytvoří. Zodpovědnost za to, že jejich kód jde rovnou do produkce. Má to benefity v tom, že není tam takový falešný pocit toho, že když to nepůjde rovnou do produkce, ale do nějakého ale nějakého development mezikroku, tak tam to za mě někdo vyřeší, někdo to zkontroluje a všechny problémy se tam odladí, což se většinou nemusí dít ani v komerčním světě a specificky se to neděje v rámci česko.digitál v dobrovolnických projektech, protože ty zdroje na opravdu kontrolu každého release prostě nejsou. Spíš je to opravdu takový falešný pocit bezpečí, že když to jde do development tak se to vyřeší a ono se to nevyřeší a naopak více chyb ještě projde do toho masteru produkce. Kdežto když ten člověk je rovnu zodpovědný za to a ví že ve chvíli, kdy se mergne ten jeho pull request tak to okamžitě půjde do produkce, tak je zaprvé více motivovaný, protože ta cesta do produkce je kratší a vidí ty výsledky okamžitě a zároveň cítí tu zodpovědnost za kód, který vytváří.

[01:08:46](?start=4126)

Teď bychom se mohli podívat na to, co to znamená z pohledu infrastruktury, protože k tomu rozdělení vývojových prostředí je několik možných cest. Ta nejjednodušší je opravdu tu infrastrukturu dobře parametrizovat a rozdělit ji opravdu na kopie 1:1. Což znamená znamená, že mám buď dva repozitáře nebo dvě branche, kde každý z těch wokrflows pro development a production má vlastní set github secrets, což jsou ty naše parametry. A opravdu se vytváří dvě exaktní kopie celé té infrastruktury. V komerčním světě se toto běžně dělá, že je produkční fork repositáře a development fork repositáře, kde admin vývojáři mají přístup do toho produkčního. Zároveň jsou dva cloudové účty, kde na jednom běží kopie té infrastruktury vývojová a na druhém ta produkční. Nicméně, do toho stavu je velmi jednoduché se dostat s tím, co máme teď. Stačí vytvořit teď fork toho repositáře. Jediná změna, která je potřeba udělat je bucket pro terraform state. Protože, jak jsme si říkali, tenhleten name, což je “1-terraform-cd-demo-state”, je globálně unikátní, tzn. může být na jednom globálním účtu. Ale kdybychom si vytvořili fork tohoto repositáře, změnili bucket na 2, což znamená vytvořili manuálně nový bucket v “eu-central-1” nebo klidně v jakémkoliv jiném regionu.

Potřebujeme dva stavy toho terraformu, která musí být ve dvou různých kyblíčcích. To by byla jediná změna, kterou bychom potřebovali udělat ve forku toho repositáře. Všechno ostatní by zařídily secrets, které by parametrizovaly i účet, na který pushujeme, což znamená klíčem a tokenem, i jak se bude jmenovat i ten kyblíček, který je parametrizovaný secrets.

[01:11:10](?start=4270)

Druhá velmi běžná cesta, jak řešit oddělení development a produkční prostředí, je že vše je v jednom repositáři v masteru a ten development a production sdílí část kódu a vytváří si jenom ty rozdíly. Většinou je to kvůli ceně, protože spoustu zdrojů, které v tom cloudu vytváříme, můžou být sdílené. U toho bucketu to nedává moc smysl, protože i kdyby byl produkční a development bucket, tak by byly napsané vedle sebe, což znamená měli bychom data bucket production, který by se zase jmenoval “data_bucket_production” a byl samozřejmě private - vždycky to chceme private. A vytvořili bychom novou proměnou a tu bychom přidali do celé pipliny. U toho samotného bucketu to není vidět, protože ta infrastruktura nesdílí vůbec nic. Ale ve chvíli, kdybychom měli databázovou instanci, což je velmi drahá věc v rámci cloudu, tak běžně v deploymentech, víceméně na všech projektech Česko.Digital, je pouze jedna databázová instance pro organizaci nebo pro projekt a na ní běží několik instancí databáze, třeba development verze databáze, ke které mají vývojáři přístup a hrají si s ní a ladí nad tím potom produkční verze databáze, do které se připojuje master. Což znamená, že ty variables by nebyly jako rozdílná databáze (jako url té databáze) uživatelské jméno a heslo, ale bylo by to ta konkrétní databáze v rámci databázové instance, což by byl parametr pro to, jestli je to development nebo produkční prostředí. Stejně tak jde sdílet jde load balanced, sdílet jde síťové prvky - velmi drahý je třeba NAT, network address translator. Naopak nějaké deploymenty, třeba Docker filů, když chceme něco spustit v dokkeru, tak máme produkční běhové prostředí a development běhové prostředí.

To nejdůležitější opravdu je nedělat to zbytečně, ale dělat to až ve chvíli, kdy máme silný case pro to tyhlety prostředí rozdělit.

[01:14:03](?start=4443)

Super, díky. Ty jsi zmínil o jedné věci, o které se v souvislosti s AVSkem mluví a to je cena. Že vlastně častý dojem je -  já to nechci mít na AVSku, protože to bude drahý. Jakým způsobem se s tímhle, zvlášť v neziskovým prostředí, se dá pracovat. Dá se vůbec říct, obecně jako unblock, jestli je AVSko drahý? Jak se na tohle díváš?

Tam dost záleží na tom, co chceme za tu cenu dostat. Protože aws má strašně moc služeb a nabízí toho strašně moc a obecně platí, nejen na aws ale v jakémkoliv IT, že čím méně managujeme my, což znamená čím více za nás ta služba managuje a dává nám v podstatě zadarmo, tak tím je dražší. Většinou, když se udělá velký skok v těch věcech, tak se cena zdvojnásobí. Jako příklad je, když mám vpsku, i klidně na AWS, jenom čistou ec2 vpsku, tak ta cena je x, ve chvíli, kdy deployuju dokker na třeba na Fargate, což je automatický management oběhového prostředí, kdy jenom vezmu Docker a řeknu, že chci, aby tohle běželo a je mi úplně kde a je mi úplně jedno jak, ale prostě chci, aby to běželo, tak se ta cena zdvojnásobí. A když udělám ten krok ještě dál, že neřeším vůbec, že to je dokker, ale mám jenom kus kódu a chci, aby ten kus kódu někde běžel a nezajímá mě opravdu vůbec nic, což je například služba AWS Lambda nebo mimo AWS například na Vercelu jejich např. jejich api servisy, tak zase zaplatím za v podstatě ten samý zdroj (CPU, paměti, času) ještě dvakrát tolik. Takže už v té nejvyšší abstrakci, kde mám jenom kód a nezajímá mě vůbec nic jiného, platím například 4x tolik, než kolik bych platil, kdybych měl vlastní vps a tu si sám spravoval na úrovni systému.

Dá se to shrnout tím, že z toho není extra cesta ven a člověk si může jen vybrat, jaký poměr vlastní práce a vlastních peněz, chci vynaložit? Buďto budu mít levný a udělám hodně ručně nebo to budu mít drahý a holt mám to s nějakým komfortem.

Jako rule of thumb se dá říct, že přesně takhle to funguje. Čím větší chci komfort, čím větší chci předatelnost a nebýt závislý na konkrétních lidech, kteří mají know how a potřeboval bych se jim třeba dovolat v noci, tak tím více za to zaplatím. Ale dá se říct, že tenhleten poměr je odpovídající. Třeba kdybych měl vpsku a měl člověka, který mi spravuje tu wps, tak na konci roku ty náklady budou stejné, oproti tomu, když tam toho člověka nemám a běží mi to v nějaké manage službě v nějakém public cloudu.

A tak stručné shrnutí by bylo, že pro účely Česko.Digital, čili pro neziskovky, to AWSko je vyhovující služba ve většině věcí, že ty náklady jsou odpovídající tomu, co za to člověk dostane?

Rozhodně. Ty public cloudy mají velkou výhodu v tom, že není potřeba dedikovaný člověk na správu, je potřeba akorát člověk, který třeba v tom terraformu v repositáři ty věci nasadí, případně upravuje, ale ne někdo, kdo je na telefonu jako standby, když se náhodou někde něco rozbije. A druhá výhodná věc je, že i pro neziskovky jde získat poměrně dost kreditů, ať už pro AWS nebo i jiné cloudy, v rámci různých programů - v Česku je to třeba TechSoup od nadace Via, který spravuje spoustu technických produktů, které neziskovky můžou získat zdarma a poměrně široce je využívat. Takže i na AWS poměrně rozsáhlá infrastruktura jde provozovat zdarma.

Ještě by asi stálo za to říct, že Terraform není věc, která by byla přímo spjatá s AWSkem, že vlastně v případě, že má někdo obavy z AWSka nebo se mu chce vyhnout z libovolných důvodů, tak to, co jsme ukazovali úplně stejně jde spustit klidně nad Digital Ocean nebo nad někým takovým, nad nějakým poskytovatelem wps. Logika zůstává stejná - mám nějak deklarativně popsanou infrastrukturu, poskládanou z těch stavebních prvků, které nabízí Digital Ocean a vlastně akorát ve výsledku to nevolá AWSko, volá to Digital Ocean a postatí to něco z jejich stavebních bloků a mám jednodušší to účtování, které je spojené s vpskou. Je to tak?

[01:19:19](?start=4759)

Je to přesně tak. Tím bych uzavřel téma ceny. Nechceš shrnout, co jsme se dnes všechno naučili a do jakého stavu jsme se dostali?

Základní věc je, že zsh nemá rádo pomlčky v názvech proměnných. To je taková důležitá věc, kterou jsme si s Martinem odnesli pro příště.

Když to shrnu - zásadní pro nás je, aby projekty, na kterých děláme, byly pokud možno na jednom místě, aby byly dobře třeba předatelný, aby se o ně dalo dobře jednodušše snadno starat, aby k tomu nebyli potřeba lidi, který budou mít pager a budou k dispozici v noci. Proto hodně pracujeme s GitHubem a s automatizací. Ideální případ pro nás je, když celý projekt je v jednom repu - frontend, backend a infrastruktura. Ta infrastruktura je popsaná deklarativně čili ne tak co je potřeba udělat, aby byla, ale jaká má být, a o aktualizace  infrastruktury se nestará konkrétní člověk, zase někdo s nějakým nebohým pagerem nebo telefonem, ale o aktualizace infrastruktury se stará robot. Takže kdokoliv a kdykoli je třeba změnit infrastrukturu, tak může někdo přijít, pošle klasicky pull request, probere se robot a řekne: Jo,  pokud chcete tu infrastrukturu mít takovouhle, tak to znamená tyhle a tyhle změny. Pak stačí vlastně mu říct: Jo, přesně tohle chceme. Kód se merchne, terraform se postará o odpovídající změny infrastruktury, ať už v AWSku nebo kdekoli jinde, a následně může třeba proběhnout nějaký další krok jako třeba ten deployment typu vezmu nějaká data z nějakého adresáře a nacpu je do nějakého kyblíčku na s3 a tím třeba nahraju novou novou verzi aplikace na cdnku. Důležité téma je parametrizace infrastruktury, díky které třeba v našem případě, když vyvíjíme nějakou aplikaci v Česko.Digital, tak jí vyvíjíme pod organizací Česko.Digital na GitHubu, ale pak v rámci předávání tomu zadavateli tady to repo změní organizaci na nějakou jinou organizaci. Tam je důležitý moment, aby to neznamenalo, že nějaký nebožák bude procházet ty zdrojáky a bude přepisovat názvy kyblíčků a takovéhle věci, nějaké na tvrdo zakódované řetězce. Takže při přesunu toho repa k jiný organizaci zmizí všechny secrets pochopitelně, protože to je citlivá věc, která zůstává s tou organizací. Takže my předáme to repo někomu, kdo si tam nastaví nové ty secrets, nové parametry obecně, a jakmile tohle se chytne, oživne to na novém místě, tak to v jejich novém účtu na awsku vybuduje úplně stejnou infrastrukturu, kterou to mělo u nás a ideálně ji to naplní relevantními daty a ideálně ten proces předání by měl být, co nejméně bolestivý, což je to, co chceme a to, co by měl asi chtít každý, kdo ty věci chce dělat rozumně. A ukazovali jsme si ještě konkrétní use case té parametrizace, což je rozdělení vývojového prostředí a produkce. Tady je hrozně důležité říct, že je dobré tohle nedělit automaticky, nedělat to reflexivně, ale je dobré počkat, až budete mít konkrétní problémy. Ty konkrétní problémy pak budou dobře definovat, co je správné řešení. Teprve na základě toho je možné udělat minimální změny, které nebudou zbytečně duplikovat infrastrukturu a přitom pokryjí tu vaši use case.

A vlastně na závěr jsme se bavili, že AWSko není nutně nějaká drahá věc, že to může klidně běžet zadarmo. Já můžu dodat, provozuju noviny, máme v AWSku hromadu dat, používáme to pro uložení obrázků a jiný věci, a platíme malé stakoruny měsíčně, takže je to něco, co nestojí za řeč v rámci té organizace. Zapomněli jsme na něco, Martine?

[01:23:48](?start=5028)

Bylo to naprosto vyčerpávající. Kdyby měli diváci nějaké otázky, jak jim můžeme pomoci?

Jsme pro ně k dispozici ve slacku Česko.Digital, nejlépe v kanálu českodigital-tech a moc se na vás těšíme. Vyzkoušejte si to, repo je k mání na GitHubu, takže se můžete podívat na všechny příklady, můžete je využít jako zdroj dalšího copy and paste, stejně jako jsme to udělali my. A budeme se těšit na vaše dotazy, připomínky. Ať vám to funguje.



