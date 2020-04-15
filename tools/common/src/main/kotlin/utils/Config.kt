package utils

import com.typesafe.config.Config
import com.typesafe.config.ConfigFactory

interface IConfig {
    fun get(): Config
}

class DefaultConfig: IConfig {
    override fun get(): Config {
        return ConfigFactory.load("application.conf").resolve()
    }
}