import React from 'react';
import {WebView} from 'react-native-webview';

function Midtrans(props) {
  const redirectUrl = props.route.params.redirectUrl;
  console.log(redirectUrl);
  return (
    <WebView
      source={{
        uri: redirectUrl,
      }}
      style={{marginTop: 20}}
    />
  );
}

export default Midtrans;
