import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import GraphCanvas from './components/GraphCanvas';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import LineGraph from './components/LineGraph';

const client = new ApolloClient({
	uri: '/graphql',
	cache: new InMemoryCache(),
});

function App() {
  return <div>
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path={'/'} element={<LineGraph/>}></Route>
        </Routes>
      </Router>
    </ApolloProvider>
  </div>
}

export default App;
