import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import * as watch from 'react-native-watch-connectivity'


const App = () => {

  const [msgCount, setMsgCount] = useState(0)

  // Use react-native bridge library to subscribe to WatchOS messages
  this.unsubscribeMessages = watch.subscribeToMessages((message, err, reply) => {

    console.log("\nrecieved msg: " + Object.keys(message));
    console.log("error: " + err);
    if (!err) {

      switch(Object.keys(message)[0]) {
        
        case "Tapped":
          setMsgCount(msgCount + 1);

          break;

        default:
          Alert.alert("Error parsing message");
        }
    }
    else {
      console.log("error")
    }

    // uncomment to fix the error
    // unsubscribeMessages();
  })


  return (

      // Dismiss keyboard when click out of focus
      <SafeAreaView style={styles.container}>
        <View style={styles.heartRate}>
          <Text style={{margin:10}}>{msgCount}</Text>
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartRate: {
    flexDirection: 'row', 
    margin:10, 
    alignItems: 'center'
  }
});


export default App;