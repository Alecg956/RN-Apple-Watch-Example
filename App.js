import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import * as watch from 'react-native-watch-connectivity'


const App = () => {

    const [msgCount, setMsgCount] = useState(0)

    // The subscription needs to be wrapped in an effect otherwise you will create a new subscription everytime the component renders
    // See https://reactjs.org/docs/hooks-effect.html
    useEffect(
        () => {
            const unsubscribe = watch.subscribeToMessages((message, err, reply) => {
                console.log("\nrecieved msg: " + Object.keys(message));
                console.log("error: " + err);
                if (!err) {

                    switch (Object.keys(message)[0]) {

                        case "Tapped":
                            setMsgCount(msgCount + 1);

                            break;

                        default:
                            Alert.alert("Error parsing message");
                    }
                } else {
                    console.log("error")
                }

                // uncomment to fix the error
                // unsubscribeMessages();
            });

            // Returning unsubscribe from the effect means it will be called when the component unmounts, unsubscring from watch messages.
            return unsubscribe;
        },
        // No dependencies means this effect will only run when the component mounts (and therefore only registering one listener)
        []
    );


    return (
        // Dismiss keyboard when click out of focus
        <SafeAreaView style={styles.container}>
            <View style={styles.heartRate}>
                <Text style={{margin: 10}}>{msgCount}</Text>
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
        margin: 10,
        alignItems: 'center'
    }
});


export default App;
