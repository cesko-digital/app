package utils

import com.amazonaws.auth.EnvironmentVariableCredentialsProvider
import com.amazonaws.client.builder.AwsClientBuilder
import com.amazonaws.services.secretsmanager.AWSSecretsManagerClientBuilder
import com.amazonaws.services.secretsmanager.model.GetSecretValueRequest
import com.amazonaws.services.secretsmanager.model.InvalidRequestException
import com.amazonaws.services.secretsmanager.model.ResourceNotFoundException
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.typesafe.config.Config
import java.lang.Exception
import java.security.InvalidParameterException

interface ISecretsManager {
    var secrets: Secrets?

    fun get(): Secrets
}

/*
    Loads secrets from AWS secrets manager, endpoint configuration is in local config file.
 */
class AWSSecretsManager(
    val config: Config,
    override var secrets: Secrets? = null
) : ISecretsManager {

    override fun get(): Secrets {
        if (secrets == null) {
            initSecrets()
        }

        return secrets!!
    }

    private fun initSecrets() {
        val endpoint = config.getString("secrets.aws.endpoint")
        val region = config.getString("secrets.aws.region")
        val secretsId = config.getString("secrets.aws.secretsId")

        val config = AwsClientBuilder.EndpointConfiguration(endpoint, region)
        val client = AWSSecretsManagerClientBuilder.standard()
            .withCredentials(EnvironmentVariableCredentialsProvider())
            .withEndpointConfiguration(config)
            .build()

        val getSecretValueRequest = GetSecretValueRequest()
            .withSecretId(secretsId)

        try {
            this.secrets = jacksonObjectMapper().readValue(
                client.getSecretValue(getSecretValueRequest).secretString
            )
        } catch (e: ResourceNotFoundException) {
            System.out.println("The requested secret was not found")
        } catch (e: InvalidRequestException) {
            System.out.println("The request was invalid due to: " + e.message)
        } catch (e: InvalidParameterException) {
            System.out.println("The request had invalid params: " + e.message)
        }
    }
}

/*
    Takes secrets from local config files (they can be passed either as env variables, or if not present using
    hardcoded values.)
 */
class LocalSecretsManager(
    val config: Config,
    override var secrets: Secrets? = null
) : ISecretsManager {

    override fun get(): Secrets {
        if (secrets == null) {
            initSecrets()
        }

        return secrets!!
    }

    private fun initSecrets() {
        this.secrets = Secrets(
            airtableSecret = try {
                config.getString("secrets.local.airtableSecret")
            } catch (e: Exception) {
                ""
            }
        )
    }
}

@JsonIgnoreProperties(ignoreUnknown = true)
data class Secrets(
    val airtableSecret: String
)