import React from 'react';
import {ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import Footer from '../../component/footer';

function Midtrans(props) {
  const redirectUrl = props.route.params.redirectUrl;
  console.log(redirectUrl);
  return (
    <WebView
      source={{
        uri: redirectUrl,
      }}
      //   style={{marginTop: 20}}
    />
  );
}

export default Midtrans;
