import React from 'react';
import Graph from './components/Graph';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import GraphCanvas from './components/GraphCanvas';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';

const client = new ApolloClient({
	uri: '/graphql',
	cache: new InMemoryCache(),
});

function App() {
  return <div>
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path={'/'} element={<Graph/>}></Route>
        </Routes>
      </Router>
    </ApolloProvider>
  </div>
}

export default App;
