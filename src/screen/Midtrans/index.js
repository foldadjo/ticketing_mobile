import React from 'react';
import {ScrollView} from 'react-native';
import WebView, {webView} from 'react-native-webview';
import Footer from '../../component/footer';

function Midtrans(props) {
  return (
    <ScrollView>
      <WebView source={{uri: `${props.route.params}`}} />
      <Footer {...props} />
    </ScrollView>
  );
}

export default Midtrans;
