import React from "react";
import "./css/app.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Spotify from "./pages/Spotify";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AllUsers from "./pages/AllUsers";
import Profile from "./pages/Profile";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import AddFavorite from "./components/AddFavorite";
import BandNames from "./pages/BandNames";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />

      {/* <Navbar /> */}
      <Router>
        <Navbar />
        <div className="stuff">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Spotify />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/allusers" element={<AllUsers />} />
            <Route path="/profile/:profileID" element={<Profile />} />
            <Route path="/bandnames" element={<BandNames />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
