import "./css/app.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
// import Matchup from "./pages/Matchup";
// import Vote from "./pages/Vote";
import NotFound from "./pages/NotFound";
import Spotify from "./pages/Spotify";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";



const client = new ApolloClient({
  uri: "/graphql",
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
            {/* <Route path="/matchup" element={<Matchup />} /> */}
            {/* <Route path="/matchup/:id" element={<Vote />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
