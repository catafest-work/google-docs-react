//import logo from './logo.svg';
import './App.css';

import React, { useEffect } from 'react';

import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import { gapi } from 'gapi-script';



const CLIENT_ID = "...";
const API_KEY = "...";

const SCOPES = "https://www.googleapis.com/auth/drive";

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY, 
        clientId: CLIENT_ID, 
        scope: SCOPES,
        include_granted_scopes: true
      })
    };
    gapi.load('client:auth2', start);
  })

  function zerofill(i) {
    return (i < 10 ? '0' : '') + i; // 10 
  }

  function getDateString() {
    const date = new Date();
    const year = date.getFullYear();
    const month = zerofill(date.getMonth() + 1);
    const day = zerofill(date.getDate() + 1);
    return year + '-' + month + '-' + day;
  }

  function getTimeString() {
    const date = new Date();
    return date.toLocaleTimeString();
  }

  function createFile(tag) {
    var accessToken = gapi.auth.getToken().access_token;
    var fileName = tag + " Notes, " + getDateString() + " " + getTimeString();
    console.log(accessToken)
    fetch('https://docs.googleapis.com/v1/documents?title=' + fileName, {
      method: 'POST',
      headers: new Headers({ 'Authorization': 'Bearer ' + accessToken})
    }).then((res) => {
      return res.json();
    }).then(function(val) {
      console.log(val);
      console.log(val.documentId);
      window.open("https://docs.google.com/document/d/" + val.documentId + "/edit", "_blank");
    });
  }

  return (
    <div className="App">
      <LoginButton />
      <LogoutButton /> 
      <button onClick={() => createFile('TEST')}>
        Create TEST Notes
      </button>
    </div>
  );
}



export default App;
