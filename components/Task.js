import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Modal, TouchableOpacity, Image } from 'react-native';
import { CustomTabs } from '.';
import * as Location from 'expo-location';
import { FAB } from 'react-native-paper';

import styles from "../styles"


export default function Task() {

  //Declaring States
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskdec, setNewTaskDec] = useState('');
  const [long, setLong] = useState(null);
  const [lat, setLat] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false)
  const [tabSelected, setTabSelected] = useState(1)

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

  //function to open new task form modal
  const openModal = () => {
    setModalVisible(true);
  };

  //function to close new task form modal
  const closeModal = () => {
    setModalVisible(false);
  };

  const onTabSelected = (value) => {
    setTabSelected(value)
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
      setNewTaskDec('');
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

  //Card to render list of new task
  const renderItem = ({ item }) => (
    !item.completed &&
    <View
      style={styles.item}
    >
      <View style={styles.name}>
        <Text style={styles.title}> {item.title}</Text>
        <Text style={styles.status}>New</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.region}>Latitude: <Text style={{ color: 'grey' }}>{item.lat}</Text></Text>
          <Text style={styles.region}>Longitude: <Text style={{ color: 'grey' }}>{item.long}</Text></Text>
        </View>
        <TouchableOpacity style={styles.markButton} onPress={() => toggleCompleted(item.id)}>
          <Text>Mark as done</Text>
        </TouchableOpacity>
      </View>
    </View>

  );

  //Card to render list of completed task
  const renderItems = ({ item }) => (
    item.completed &&
    <View
      style={styles.item}

    >
      <View style={styles.name}>
        <Text style={styles.title}> {item.title}</Text>
        <Text style={styles.status}>Completed</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.region}>Latitude: <Text style={{ color: 'grey' }}>{item.lat}</Text></Text>
          <Text style={styles.region}>Longitude: <Text style={{ color: 'grey' }}>{item.long}</Text></Text>
        </View>
      </View>
    </View>

  );

  const handleButton = () => {
    return (
      <View >
        <CustomTabs
          selectionMode={1}
          option1="New Task"
          option2="Completed Task"
          onSelectSwitch={onTabSelected}
        />
        {/*checking which tab you are in and also checking whethere you have added the task or not*/}
        {tabSelected === 1 ?
          tasks.length > 0 ?
            <FlatList
              data={tasks}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
            :
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
              <Image
                source={require('../assets/nothing.png')}
                style={styles.image}
              />
              <Text style={{ fontSize: 13, color: '#000', fontWeight: 'bold' }}>SORRY!</Text>
              <Text style={{ fontSize: 16, color: '#737373', fontWeight: '500' }}>No task added yet..</Text>
            </View>

          :
          <FlatList
            data={tasks}
            renderItem={renderItems}
            keyExtractor={(item) => item.id.toString()}
          />
        }
      </View>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      {/*Rendering task list conditionally*/}
      {handleButton()}

      {/*Floating button for opening new task modal */}
      <FAB
        style={styles.fab}
        small
        icon="plus"
        label="Add Task"
        onPress={openModal}
      />

      {/* Add Task modal */}
      <Modal
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.mainaddtask}>
          <Text style={styles.AddTask}>Add Task</Text>
        </View>
        {/*Input text for title and description*/}
        <Text style={styles.warning}>*max. characters for title is 20</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={newTask}
            maxLength={20}
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
        {/*Button to add new task*/}
        <View style={{ marginHorizontal: 20 }}>
          <Button
            title="Add Task"
            onPress={addTask}
            color='peru'

          />
        </View>

      </Modal>
    </View>
  )
}



