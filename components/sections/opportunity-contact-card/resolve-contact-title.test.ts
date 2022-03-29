import {resolveContactTitle} from "./resolve-contact-title";

test('Test slack.com', function () {
    const urls = [
        'https://app.slack.com/client/TG21XF887/CUXRHTY58/',
        'https://slack.com/bad',
    ];

    for (const url of urls) {
        expect(resolveContactTitle(url)).toEqual('Kontaktovat přes Slack')
    }
})

test('Test slack.com', function () {
    const urls = [
        'mailto:kalusovaadela@gmail.com',
    ];

    for (const url of urls) {
        expect(resolveContactTitle(url)).toEqual('Kontaktovat přes E-mail')
    }
})

test('Test other links', function () {
    const urls = [
        'https://www.linkedin.com/company/cesko-digital/?originalSubdomain=cz',
        'https://cesko.digital',
    ];

    for (const url of urls) {
        expect(resolveContactTitle(url)).toEqual('Kontaktovat')
    }
})

