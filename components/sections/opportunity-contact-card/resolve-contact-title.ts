interface TitleResolver {
    title: string;
    resolve: (url: URL) => boolean;
}

const resolvers: TitleResolver[] = [
    {
        title: 'Kontaktovat přes Slack',
        resolve: (url) => url.hostname.indexOf('slack.com') !== -1
    },
    {
        title: 'Kontaktovat přes E-mail',
        resolve: (url) => url.protocol === 'mailto:'
    },
];

export function resolveContactTitle(url: string): string {
    const urlObject = new URL(url)
    for (const resolver of resolvers) {
        if (resolver.resolve(urlObject)) {
            return resolver.title;
        }
    }

    return 'Kontaktovat';
}
