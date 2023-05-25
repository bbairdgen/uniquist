import React from "react";
import "./css/app.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Spotify from "./pages/Spotify";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AllUsers from "./pages/AllUsers";
import Profile from "./pages/Profile";
import Band from "./pages/BandPage";
import CreateBand from "./pages/CreateBand";
import Footer from "./components/Footer";

import Header from "./components/Header";
import Navbar from "./components/Navbar";


import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
//import { Token } from "graphql"; // noah says: idk what this is or where it came from

// This stuff will print helpful error messages to the console
// if any GraphQL stuff fails, rather than a vague "400 error".
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("graphQLErrors", graphQLErrors);
  }
  if (networkError) {
    console.log("networkError", networkError);
  }
});

const httpLink = createHttpLink({
  uri: "/graphql",
});

// This enables header forwarding when any request is made to the backend.
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link: authLink.concat(link),
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
            <Route exact path="/profile/:profileID" element={<Profile />} />
            <Route path="/profile/:profileID/new-band" element={<CreateBand />} />
            <Route path="/bands/:bandID" element={<Band />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
