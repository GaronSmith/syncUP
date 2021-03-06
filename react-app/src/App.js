import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUpForm from "./components/auth/SignUpForm/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import UserProfile from "./components/UserProfile"
import User from "./components/User";
import EventPage from "./components/EventPage"
import { authenticate } from "./services/auth";
import { useDispatch } from "react-redux";
import { setUser } from "./store/session";
import GroupPage from "./components/GroupPage";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";

function App() {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(setUser(user))
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} authenticated ={authenticated} />
      <div className='content'>
        <Switch>
          <Route path="/sign-up" exact={true}>
            <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
          </Route>
          <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
            <UsersList/>
          </ProtectedRoute>
          {/* TODO: Make /users/me protected. */}
          <Route exact path="/users/:id" authenticated={authenticated}>
            <UserProfile/>
          </Route>
          <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
            <User />
          </ProtectedRoute>
          <Route path="/event/:eventId" exact={true} authenticated={authenticated}>
            <EventPage />
          </Route>
          <Route path="/" exact={true} authenticated={authenticated}>
            <LandingPage />
          </Route>
          <Route path="/groups/:groupId" exact={true}>
            <GroupPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
    <Footer />
    </>
  );
}

export default App;
