import { StyleSheet, Dimensions } from "react-native"

export default StyleSheet.create({
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

  AddTask: {
    fontSize: 18,
    fontWeight: '800',
    color: 'white',
    marginLeft: 5,
    textAlign: 'center'
  },

  tasklist: {
    fontSize: 18,
    fontWeight: '800',
    color: 'white',
    marginLeft: 5,
    textAlign: 'center'
  },
  completed: {
    backgroundColor: 'red',
    padding: 10,
    width: Dimensions.get("window").width / 4,
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10
  },
  maintasklist: {
    backgroundColor: 'grey',
    paddingBottom: 10,
    paddingVertical: 16
  },
  mainaddtask: {
    backgroundColor: 'grey',
    paddingVertical: 16
  }

  ,
});