plugins {
    kotlin("jvm")
}

dependencies {
    implementation(kotlin("stdlib-jdk8"))

    // Config
    implementation("com.typesafe:config:1.4.0")

    // AWS libraries
    implementation("com.amazonaws:aws-java-sdk-secretsmanager:1.11.714")

    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.11.0.rc1")

    // Airtable API
    implementation("dev.fuxing:airtable-api:0.3.1")
}