import org.koin.dsl.module
import utils.*
import utils.airtable_api.Airtable
import utils.airtable_api.IAirtable

val testModule = module {
    single<IConfig> { DefaultConfig() }

    single<ISecretsManager> {
        LocalSecretsManager(
            config = this.get<IConfig>().get()
        )
    }

    single<IAirtable> {
        Airtable(
            secrets = this.get<ISecretsManager>().get()
        )
    }
}