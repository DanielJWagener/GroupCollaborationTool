import React, {useContext, useState, useEffect} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TopBar from './components/TopBar';
import SignUpPage from './components/SignUp'
import SignInPage from './components/SignIn'
import ProfileViewer from './components/ProfileViewer'
import ProfileEditor from './components/ProfileEditor'
import LandingPage from './components/Landing'
import NewProjectPage from './components/NewProject'
import * as ROUTES from './constants/routes'
import {FirebaseContext} from './components/Firebase'
import {SessionContext} from './components/Session'

import "./App.css";

export default function() {
  const firebase = useContext(FirebaseContext)

  const [user, setUser] = useState( () => firebase.auth.currentUser )

  useEffect( () => {
    const unsubscribe = firebase.auth.onAuthStateChanged( (user) => setUser(user) )
    return () => unsubscribe()
  })

  return (
    <div>
      <SessionContext.Provider value={user}>
        <Router>
          <div className="top-bar">
            <TopBar />
          </div>
          <div>
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route exact path={ROUTES.EDIT_PROFILE} component={ProfileEditor} />
            <Route path={ROUTES.VIEW_PROFILE} component={ProfileViewer} />
            <Route path={ROUTES.NEW_PROJECT} component={NewProjectPage} />
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
          </div>
        </Router>
      </SessionContext.Provider>
    </div>
  );
}
