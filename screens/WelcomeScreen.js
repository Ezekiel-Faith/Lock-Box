import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState('');
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    async function welcomeMsg() {
      try {
        const response = await axios.get(
          'https://lock-box-dc753-default-rtdb.firebaseio.com/message.json?auth=' +
            token
        );
        setFetchedMessage(response.data);
      } catch (error) {
        Alert.alert(
          'Error',
          'Failed to fetch message. Please try again later.'
        );
      }
    }

    welcomeMsg();
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
