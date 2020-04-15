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
    val secrets: Secrets
}

/*
    Loads secrets from AWS secrets manager, endpoint configuration is in local config file.
 */
class AWSSecretsManager(
        val config: Config
) : ISecretsManager {

    override val secrets: Secrets = initSecrets()

    private fun initSecrets(): Secrets {
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

        return jacksonObjectMapper().readValue(
                client.getSecretValue(getSecretValueRequest).secretString
        )
    }
}

/*
    Takes secrets from local config files (they can be passed either as env variables, or if not present using
    hardcoded values.)
 */
class LocalSecretsManager(
        val config: Config
) : ISecretsManager {
    override val secrets: Secrets = initSecrets()

    private fun initSecrets(): Secrets {
        return Secrets(
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