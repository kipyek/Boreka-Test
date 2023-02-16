import React from 'react';
import { View, Text } from 'react-native';
import Task from './components/Task';
import styles from "./styles"

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.maintasklist}>
        <Text style={styles.tasklist}>Task List</Text>
      </View>
      <Task />
    </View>

  );
};
export default App;
