package lambda

import org.koin.dsl.module
import utils.*
import utils.airtable_api.Airtable
import utils.airtable_api.IAirtable

val lambdaModule = module {
    single<IConfig> { DefaultConfig() }

    single<ISecretsManager> {
        AWSSecretsManager(
            config = this.get<IConfig>().get()
        )
    }

    single<IAirtable> {
        Airtable(
            secrets = this.get<ISecretsManager>().get()
        )
    }
}