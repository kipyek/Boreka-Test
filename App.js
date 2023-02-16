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
  Dimensions,
} from 'react-native';
import { FAB } from 'react-native-paper';
import * as Location from 'expo-location';
import { MaterialIcons } from "@expo/vector-icons"

const App = () => {

  //Declaring States
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskdec, setNewTaskDec] = useState('');
  const [long, setLong] = useState(null);
  const [lat, setLat] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false)

  let completed = newTask.completed

  //Requesting for permission and fetching long and lat in background on task added or completed
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


  //   useEffect(() => {
  //     (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       console.log('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLong(location.coords.longitude)
  //     setLat(location.coords.latitude)
  //   });
  //   return () => clearInterval(intervalId);
  // }, []);

  //function to open new task form modal
  const openModal = () => {
    setModalVisible(true);
  };

  //function to close new task form modal
  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleHiding = (item) => {
    setVisible(!visible)
  }

  //Function to add new task
  const addTask = () => {
    if (newTask) {
      const task = {
        id: tasks.length + 1,
        title: newTask,
        dec: newTaskdec,
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


  //function between task marking the task as copleted or not
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

  //Card to render list of task
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

  const handleButton = () => {
    return (
      <TouchableOpacity style={{ backgroundColor: 'red', padding: 10, width: Dimensions.get("window").width / 4, alignItems: 'center', marginLeft: 20, marginTop: 10 }} onPress={() => toggleHiding()}>
        <Text>Completed</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: 'grey', paddingBottom: 10, paddingVertical: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '800', color: 'white', marginLeft: 5, textAlign: 'center' }}>Task List</Text>
      </View>
      {handleButton()}
      <Modal
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={{ backgroundColor: 'grey', paddingVertical: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '800', color: 'white', marginLeft: 5, textAlign: 'center' }}>Add Task</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={newTask}
            onChangeText={(text) => setNewTask(text)}
            placeholder="Add a task title"
          />

          <TextInput
            style={styles.inputs}
            multiline
            value={newTaskdec}
            onChangeText={(text) => setNewTaskDec(text)}
            placeholder="Add a task description"
          />

        </View>

        <View style={{ marginHorizontal: 20 }}>
          <Button
            title="Add"
            onPress={addTask}

          />
        </View>
        {/* Add Task modal */}
      </Modal>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          label="Add Task"
          onPress={openModal}
        />
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30
  },
  form: {
    alignItems: 'center',
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 300,
    marginVertical: 10,
    paddingVertical: 4,
    paddingLeft: 10
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 300,
    height: 200,
    marginVertical: 10,
    paddingVertical: 4,
    paddingLeft: 10,
    textAlignVertical: 'top'
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: -9,
    backgroundColor: '#fddca7',
    bottom: 0,
  },
});

export default App;
