import React, {useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {SessionContext} from '../Session'
import {FirebaseContext} from '../Firebase'
import EmailVerifier from './emailVerifier'
import NameEditor from './nameEditor'
import BiographyEditor from './biographyEditor'
import Button from '@material-ui/core/Button'
import * as ROUTES from '../../constants/routes';

export default function() {
  const history = useHistory()
  const session = useContext(SessionContext)
  const firebase = useContext(FirebaseContext)
  const [viewerLink, setViewerLink] = useState("")

  useEffect( () => {
    if (session) {
      const link = ROUTES.VIEW_PROFILE.replace(":uid", session.uid)
      setViewerLink(link)
    } else {
      setViewerLink(null)
    }
  }, [session])

  const handleLogout = () => {
    firebase.doSignOut()
    history.push(ROUTES.LANDING)
  }

  if (session) {
    return (
      <div>
        <h1>Profile</h1>
        { session &&
          <>
            <EmailVerifier/>
            <NameEditor/>
            <BiographyEditor/>
            <a href={viewerLink}>View this profile</a>
            <br/>
            <Button color="primary" onClick={handleLogout}>
              Click to log out
            </Button>
          </>
        }
      </div>
    )
  } else {
    return (
      <a href="/signin">Please sign in.</a>
    )
  }
}