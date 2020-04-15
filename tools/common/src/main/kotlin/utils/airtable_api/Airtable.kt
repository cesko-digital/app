package utils.airtable_api

import dev.fuxing.airtable.AirtableApi
import dev.fuxing.airtable.AirtableExecutor
import dev.fuxing.airtable.AirtableRecord
import utils.Secrets

interface IAirtable {
    fun unsubscribe(
        userId: String,
        appId: String,
        tableName: String
    ): Boolean
}

class Airtable(secrets: Secrets) : IAirtable {

    lateinit var airtableApi: AirtableApi

    init {
        if (!this::airtableApi.isInitialized) {
            airtableApi = AirtableApi(secrets.airtableSecret, AirtableExecutor.newInstance(true, 2))
        }
    }

    override fun unsubscribe(userId: String, appId: String, tableName: String): Boolean {
        val recordToUpdate = AirtableRecord()
        recordToUpdate.id = userId
        recordToUpdate.putField("unsubscribed", true)

        val result = airtableApi.base(appId).table(tableName).patch(
            recordToUpdate
        )

        return result != null
    }
}