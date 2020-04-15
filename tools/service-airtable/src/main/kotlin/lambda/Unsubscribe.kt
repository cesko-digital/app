package lambda

import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.RequestHandler
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.module.kotlin.convertValue
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import kotlinx.html.body
import kotlinx.html.h1
import kotlinx.html.html
import kotlinx.html.stream.createHTML
import kotlinx.html.style
import org.koin.core.KoinApplication
import org.koin.core.module.Module
import utils.airtable_api.IAirtable

class Unsubscribe : RequestHandler<Any, HtmlResponse> {

    lateinit var koinApplication: KoinApplication

    fun startKoin(module: Module = lambdaModule) {
        if (!this::koinApplication.isInitialized) {
            koinApplication = org.koin.core.context.startKoin {
                modules(module)
            }
        }
    }

    override fun handleRequest(input: Any, context: Context?): HtmlResponse {
        startKoin()
        val airtable: IAirtable = koinApplication.koin.get()

        try {
            val lambdaInput: LambdaInput = jacksonObjectMapper().convertValue(input)

            airtable.unsubscribe(
                appId = lambdaInput.queryStringParameters.appId,
                userId = lambdaInput.queryStringParameters.userId,
                tableName = lambdaInput.queryStringParameters.tableName
            )
        } catch (e: Exception) {
            // Just ignore errors and return OK
        }

        /*
            For now we return simple text, in future we want to redirect to styled page on main website.
         */
        val html = createHTML().html {
            body {
                style = "text-align: center; padding: 32px;"
                h1 {
                    +"Úspěšně odhlášeno"
                }
            }
        }

        return HtmlResponse(
            statusCode = 200,
            body = html
        )
    }
}

data class HtmlResponse(
    val statusCode: Int,
    val headers: Map<String, String> = mapOf(
        "Content-Type" to "text/html; charset=utf-8"
    ),
    val body: String
)

@JsonIgnoreProperties(ignoreUnknown = true)
data class LambdaInput(
    val queryStringParameters: Parameters
)

@JsonIgnoreProperties(ignoreUnknown = true)
data class Parameters(
    val userId: String,
    val appId: String,
    val tableName: String
)