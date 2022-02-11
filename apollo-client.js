import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';

const createClient = (url, token) => {
    const httpLink = createHttpLink({
        uri: url,
    });

    const authLink = new ApolloLink((operation, forward) => {
        // Use the setContext method to set the HTTP headers.
        operation.setContext({
            headers: {
                authorization: `Bearer ${token}`,
            },
        });

        // Call the next link in the middleware chain.
        return forward(operation);
    });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
};

// const httpLink = createHttpLink({
//     uri: 'https://api.github.com/graphql',
// });
//
// const authLink = new ApolloLink((operation, forward) => {
//     // Use the setContext method to set the HTTP headers.
//     operation.setContext({
//         headers: {
//             authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
//         },
//     });
//
//     // Call the next link in the middleware chain.
//     return forward(operation);
// });
//
// const githubClient = new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache: new InMemoryCache(),
// });

const githubClient = createClient(
    'https://api.github.com/graphql',
    process.env.GITHUB_API_TOKEN
);

const contentClient = createClient(
    'https://graphql.contentful.com/content/v1/spaces/po83s9xdfqwr/environments/master',
    'uJXLuKL3BwbU3j5gdi7eDuZFpCghFmvIdOHkWw_gn0s'
);

export { githubClient, contentClient };
