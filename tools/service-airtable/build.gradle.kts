plugins {
    kotlin("jvm")
    id("com.github.johnrengelman.shadow") version "5.1.0"
}

dependencies {
    compile(project(":common"))

    implementation(kotlin("stdlib-jdk8"))

    // AWS SDK
    implementation("com.amazonaws:aws-lambda-java-core:1.2.0")

    // Koin DI
    implementation("org.koin:koin-core:2.0.1")

    // Config
    implementation("com.typesafe:config:1.4.0")

    implementation("org.jetbrains.kotlinx:kotlinx-html-jvm:0.6.12")

    implementation("junit:junit:4.13")

    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.11.0.rc1")
}

tasks.register<Exec>("deploy-lambda-dev") {
    executable("sh")
    args("-c","serverless deploy -s dev --version $version")
    dependsOn("clean", "shadowJar")
    tasks.findByName("shadowJar")?.mustRunAfter("clean")
    group = "aws-dev"
}

tasks.register<Exec>("create-domain-dev") {
    executable("sh")
    args("-c","serverless create_domain -s dev")
    group = "aws-dev"
}

tasks.register<Exec>("deploy-lambda") {
    executable("sh")
    args("-c","serverless deploy -s prod --version $version")
    dependsOn("clean", "shadowJar")
    tasks.findByName("shadowJar")?.mustRunAfter("clean")
    group = "aws-prod"
}

tasks.register<Exec>("create-domain") {
    executable("sh")
    args("-c","serverless create_domain -s prod")
    group = "aws-prod"
}