plugins {
    base
    kotlin("jvm") version "1.3.61" apply false
}

allprojects {
    group = "digital.cesko"
    version = "1.0"

    repositories {
        mavenCentral()
        jcenter()
    }
}

dependencies {
    subprojects.forEach {
        archives(it)
    }
}
