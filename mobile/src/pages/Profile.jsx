import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const styles = StyleSheet.create({ web: { flexGrow: 1 } });

const Profile = ({ navigation }) => (
  <WebView style={styles.web} source={{ uri: `https://github.com/${navigation.getParam('githubUsername')}` }} />
);

export default Profile;
