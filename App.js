import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { FAB } from 'react-native-paper';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [long, setLong] = useState(null);
  const [lat, setLat] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLong(location.coords.longitude)
      setLat(location.coords.latitude)
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleHiding = (item) => {
    setVisible(!visible)
  }


  const addTask = () => {
    if (newTask) {
      const task = {
        id: tasks.length + 1,
        title: newTask,
        completed: false,
        visible: true,
        lat: lat,
        long: long
      };
      setTasks([...tasks, task]);
      console.log(tasks);
      setNewTask('');
      closeModal();
    }
  };

  const toggleCompleted = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
          visible: !visible,
          lat: lat,
          long: long
        };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => toggleCompleted(item.id)}
    >

      <Text style={[styles.title, item.completed && styles.completed]}>
        {item.completed ? "completed" : "new"}
        {item.title}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>latitude: {item.lat}</Text>
        <Text>longitude: {item.long}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ backgroundColor: 'red', padding: 10 }} onPress={() => toggleHiding()}>
        <Text>Hello</Text>
      </TouchableOpacity>
      <FAB
        icon="plus"
        label="Open Modal"
        onPress={openModal}
      />

      <Modal
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={newTask}
            onChangeText={(text) => setNewTask(text)}
            placeholder="Add a task"
          />
          <Button title="Add" onPress={addTask} />
        </View>
        {/* Your modal content goes here */}
      </Modal>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 10,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  completed: {
    textDecorationLine: 'line-through',
  },
  map: {
    width: 100,
    height: 100,
    flex: 1
  },
});

export default App;
