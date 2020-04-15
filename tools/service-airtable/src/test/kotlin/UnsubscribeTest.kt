import lambda.LambdaInput
import lambda.Parameters
import lambda.Unsubscribe
import org.junit.BeforeClass
import org.junit.Test

class UnsubscribeTest {
    companion object {
        lateinit var lambda: Unsubscribe

        @BeforeClass
        @JvmStatic
        fun initLambda() {
            lambda = Unsubscribe()
            lambda.startKoin(testModule)
        }
    }

    @Test
    fun itRuns() {
        val response = lambda.handleRequest(
            LambdaInput(
                queryStringParameters = Parameters(
                    appId = "",
                    userId = "",
                    tableName = ""
                )
            ), null
        )

        assert(response.statusCode == 200)
    }
}