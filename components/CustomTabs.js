import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from "../styles"

export default function CustomTabs({
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = (value) => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View style={styles.tabs}>

      {/*Creating Tab for new task*/}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode == 1 ? '#a06931' : '#e4e4e4',
          borderRadius: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: getSelectionMode == 1 ? 'white' : 'black',
            paddingRight: 10,
            fontSize: 14
          }}>
          {option1}
        </Text>
      </TouchableOpacity>

      {/*Creating Tab for completed task*/}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode == 2 ? '#a06931' : '#e4e4e4',
          borderRadius: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: getSelectionMode == 2 ? 'white' : 'black',
            paddingHorizontal: 10,
            fontSize: 16
          }}>
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}