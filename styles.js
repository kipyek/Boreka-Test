import { StyleSheet, Dimensions } from "react-native"

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30
  },

  form: {
    alignItems: 'center',
    margin: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 300,
    marginVertical: 10,
    paddingVertical: 4,
    paddingLeft: 10,

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
    marginRight: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    borderBottomWidth: 1
  },

  completed: {
    textDecorationLine: 'line-through',
  },
  warning: {
    color: 'red',
    marginLeft: 20,
    marginTop: 5
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
  },
  name: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    flexWrap: 'wrap'

  },
  status: {
    backgroundColor: 'grey',
    padding: 6,
    borderRadius: 22
  },
  markButton: {
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderRadius: 5
  },
  region: {
    fontSize: 16,
    fontWeight: 'bold'
  }

  ,
});