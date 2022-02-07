import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';

const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
    const token = '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';

    // Use the setContext method to set the HTTP headers.
    operation.setContext({
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    // Call the next link in the middleware chain.
    return forward(operation);
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
