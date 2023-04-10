import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exac component={<Home />} />
      {/* <Route path="/artist/:id" exac component={<ArtistPage />} /> */}
    </Router>
  )
}

export default App;
