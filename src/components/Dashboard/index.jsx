import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Box } from '@chakra-ui/react'
import Navbar from "../Common/Navbar";
import MainSection from "./MainSection";
import Profile from "./Account/Profile";
import AccountEdit from "./Account/AccountEdit";
import GremLin from "./GremLin";

const Home = () => {
  return (
    <>
      <Navbar />
      <Box>
        <Switch>
          <Route exact path="/home" component={MainSection} />
          <Route exact path="/account/edit" component={AccountEdit} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/gremlin" component={GremLin} />
          <Redirect from="/" to="/home" />
        </Switch>
      </Box>
    </>
  );
};

export default Home;
