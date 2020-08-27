import React from 'react';
import './login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from '../Firebase/firebase';

function Login() {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => console.log(result))
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.vectorico.com%2Fdownload%2Fsocial_media%2FWhatsapp-Icon.png&f=1&nofb=1" />
        <div className="login__text">
          <h1>Signin to Whatsapp !</h1>
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={signIn}
        >
          sign in to Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
