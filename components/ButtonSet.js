import React, {useState} from 'react';
import {StyleSheet, Text, Pressable, View} from 'react-native';

const Button = ({label, command, description, runCommand, cancelCommand}) => (
  <Pressable
    onPressIn={() => runCommand(command)}
    onPressOut={() => cancelCommand && runCommand(cancelCommand)}>
    <Text key={label} title={description} style={styles.button}>
      {label}
    </Text>
  </Pressable>
);

export default function ButtonSet({
  defaultSpeed,
  buttons,
  sendMessage,
  sendJsonMessage,
}) {
  const [speed] = useState(defaultSpeed);

  function runCommand(command) {
    if (typeof command === 'string') {
      sendMessage(command);
    }
    if (typeof command === 'object') {
      sendJsonMessage(command);
    }
  }

  return (
    <View>
      {buttons.map(({name, set, disabled}) => {
        // Do not render disabled controls (see apiButtons.js)
        if (disabled) {
          return null;
        }

        return (
          <View mb={3} key={name}>
            <Text mb={2} sx={{display: 'block'}}>
              {name}
            </Text>
            {set?.map(({type, min, max, ...button}) =>
              type === 'range' ? (
                <Text key={button.command}>
                  {button.label + ' ' + speed + '%'}
                </Text>
              ) : (
                <Button
                  key={button.command}
                  runCommand={runCommand}
                  variant="go"
                  {...button}
                />
              ),
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    display: 'flex',
    marginBottom: 40,
    padding: 10,
    borderRadius: 3,
  },
  button: {
    marginBottom: 5,
    padding: 5,
    backgroundColor: 'aqua',
    borderRadius: 5,
  },
});
