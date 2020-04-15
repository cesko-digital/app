### Popis
Service pro odhlášení uživatele z mailinglistu (v Airtable) specifického projektu.

### Příprava

#### AWS Služby:

1. SecretsManager
    - Je potřeba vytvořit nové`other secrets` a uložit tam `airtableSecret` 
2. IAM Role
    - Je potřeba vytvořit IAM Role s pravy čtení Secrets z (1)
    - IAM => Roles => Create Role => Lambda => Add SecretsManager Read
    
Nastaveni kličů v profilu, `~/.aws/credentials` by měl mít blok

```shell script
[cesko.digital]
aws_access_key_id=...
aws_secret_access_key=...
```

### Instalace Serverless

```shell script
npm install -g serverless
```

Plugin pro nastavení domén:
```shell script
npm install serverless-domain-manager --save-dev
```

### Nastavení v `serverless.yml`

```yaml
service: service-airtable

plugins:
  - serverless-domain-manager

provider:
  name: aws
  region: eu-west-2
  role: <Role ARM z (2)>
  runtime: java8
  memorySize: 512
  versionFunctions: false
  timeout: 30
  profile: cesko.digital # Profil z ~/.aws/credentials

package:
  artifact: ./build/libs/service-airtable-${opt:version, ''}-all.jar

functions:
  unsubscribe:
    handler: lambda.Unsubscribe
    events:
      - http:
          path: unsubscribe
          method: get

custom:
  stage: ${opt:stage, self:provider.stage}
  domains:
    prod: cesko.digital
    dev: ceskodigital.net
  customDomain:
    domainName: 'tools.${self:custom.domains.${self:custom.stage}}'
    certificateName: '*.${self:custom.domains.${self:custom.stage}}'
    basePath: ''
    stage: ${self:custom.stage}
    createRoute53Record: false
    endpointType: edge
```

### Nastavení projektu/env variables

resources.application.conf

```text
# Settings for various Secret sources
secrets {
    # Nastaveni AWS SecretsManager z (1)
    aws {
        endpoint = "secretsmanager.eu-west-2.amazonaws.com"
        endpoint = ${?AWS_SECRETS_MANAGER_ENDPOINT}
        region = "eu-west-2"
        region = ${?AWS_SECRETS_MANAGER_REGION}
        secretsId = "cd-tools"
        secretsId = ${?AWS_SECRETS_MANAGER_SECRETS_ID}
    }
    
    # Secrets pro LocalSecretsManager (Alternativa k AWS, nastavuje se v DependencyInjection)
    local {
        airtableSecret = ""
    }
}
```

### Deploy
Gradle tasky:

`create-domain` pro vytvoření CloudFront stacku a propojení s doménou/certifikátem. Stačí volat jednou jako setup.

`deploy-lambda` pro deploy aktuální verze na AWS Lambda.

Oba tasky jsou v developerské `aws-dev` a produkční `aws` verzi.

### Použití

`tools.cesko.digital/unsubscribe?appId=APPID&userId=USERID&tableName=TABLENAME`

kde:

- APPID je ID aplikace v Airtable
- USERID je ID radku v tabulce
- TABLENAME je jmeno tabulky

Link se používá ze SendGrid sender bloku v Airtable a je daný pro každou aplikaci (projekt), 
APPID a TABLENAME je fixní podle projektu a USERID je {id}

Například:

`tools.cesko.digital/unsubscribe?appId=appkeyXYZ&userId={id}&tableName=Volunteers`

Pokud potřebujete odkaz pro specifickou tabulku, napište si, prosím, do #core-team