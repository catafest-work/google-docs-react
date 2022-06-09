import React from "react";
import {GoogleLogout} from 'react-google-login';

const clientId = "...";

function Logout() {

  const onSuccess = () => {
    console.log("Log out successfully!");
  }

  return (
    <div id="signOutButton">
      <GoogleLogout 
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  )
}

export default Logout;