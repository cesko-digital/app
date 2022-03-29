/**
 * @jest-environment jsdom
 */

import React from "react";
import {queryByText, render, screen} from "@testing-library/react";

import OpportunityContactCard from "./index";

// See https://stackoverflow.com/a/58302876
import {ThemeProvider} from 'styled-components';
import {defaultTheme} from "components/theme/default";
import {PortalOpportunity, PortalProject, PortalUser} from "../../../lib/portal-types";
import * as Url from "url";

let project: PortalProject;
let owner: PortalUser;
let opportunity: PortalOpportunity;

beforeEach(function () {
    project = {
        name: 'test',
        coordinatorIds: ["recheJ92XChLaVlsr", "receJeHvUSgZFvbCt"],
        coverImageUrl: "https://data.cesko.digital/web/projects/spolu-na-dalku/cover-spolu-na-dalku.jpg",
        description: {"source": "test"},
        githubUrl: undefined,
        highlighted: false,
        id: "recvOO9ssGZZtYGux",
        jiraUrl: undefined,
        logoUrl: "",
        slackChannelUrl: undefined,
        slug: "",
        state: "finished",
        tagIds: [],
        tagline: "",
        trelloUrl: undefined,
        url: ""
    };

    owner = {
        "id": "recwOLHFJUPCoPnLX",
        "name": "Adéla Kalusová",
        "profilePictureUrl": "https://data.cesko.digital/people/adela-kalusova.jpg",
        "email": "kalusovaadela@gmail.com"
    };
    opportunity = {
        "id": "rec8IkvvNuEzsaJ78",
        "name": "Grafik pro Učíme online",
        "slug": "rec8IkvvNuEzsaJ78",
        "projectId": "recsIWPWTCFAvE2c2",
        "coverImageUrl": "test",
        "summary": {
            "source": "Hledáme dobrovolníka na výpomoc s tvorbou grafických materiálů pro projekt Učíme online.\n\nJedná se především o tvorbu podkladů pro webináře Učíme nanečisto - úvodní slidy pro prezentace, cover obrázky na sociální sítě a úvodní obrázky k videozáznamům z webinářů a jejich jednotlivým kapitolám, které jsou pak součástí naší Videotéky jako mikrokurzy.\n\nVýpomoc hledáme na několik následujících měsíců, jedná se částečně o nepravidelnou nárazovou činnost. Připravujeme zpravidla jeden webinář týdně, ale velkou část grafiky potřebujeme připravit ve chvíli otevírání registrací, které otevíráme, jakmile dostaneme podklady od lektorů, někdy tedy tři webináře za týden, někdy dva týdny nic :)\n\nCo lze dopředu odhadnout lépe je potřeba se zpracovávání videozáznamu, což probíhá pravidelně jednou týdně po jeho odvysílání.\n\nPodklady máme ve Figmě a Lukáš Návesník, který má pod palcem produkci v Česko.Digital, je připravený vysvětlit, kde co najít, jaké jsou potřeby projektu z hlediska grafiky a případně i ukázat základy práce s Figmou :)\n\nMáš chuť to zkusit? Ozvi se, rádi řekneme více!"
        },
        "timeRequirements": "0–2 hodin týdně",
        "ownerId": "recfTQpPu9LYMIAps",
        "contactUrl": "https://app.slack.com/client/TG21XF887/CUXRHTY58/",
        "skills": [
            "Design"
        ],
        "juniorFriendly": true,
        "status": "live"
    };
})

describe("When displaying opportunity contact card", () => {
    test("Display contact url via slack", async () => {
        const {getByTestId} = render(
            <ThemeProvider theme={defaultTheme}>
                <OpportunityContactCard opportunity={opportunity} parentProject={project} owner={owner}/>
            </ThemeProvider>
        )

        const urlButton = getByTestId('contact-url');
        expect(urlButton.getAttribute('href')).toBe('https://app.slack.com/client/TG21XF887/CUXRHTY58/');
        expect(urlButton.textContent).toBe('Kontaktovat přes Slack');
    });
    test("Display contact url via email", async () => {
        opportunity.contactUrl = 'mailto:kalusovaadela@gmail.com';
        const {getByTestId} = render(
            <ThemeProvider theme={defaultTheme}>
                <OpportunityContactCard opportunity={opportunity} parentProject={project} owner={owner}/>
            </ThemeProvider>
        )

        const urlButton = getByTestId('contact-url');
        expect(urlButton.getAttribute('href')).toBe('mailto:kalusovaadela@gmail.com');
        expect(urlButton.textContent).toBe('Kontaktovat přes E-mail');
    });
    test("Display contact url via email", async () => {
        opportunity.contactUrl = 'https://cesko.digital';
        const {getByTestId} = render(
            <ThemeProvider theme={defaultTheme}>
                <OpportunityContactCard opportunity={opportunity} parentProject={project} owner={owner}/>
            </ThemeProvider>
        )

        const urlButton = getByTestId('contact-url');
        expect(urlButton.getAttribute('href')).toBe('https://cesko.digital');
        expect(urlButton.textContent).toBe('Kontaktovat');
    });
});
