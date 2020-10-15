import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

TaskManager.defineTask('demo-task1', () => {
  console.log('demo-task1 is running');
  return BackgroundFetch.Result.NewData;
});

TaskManager.defineTask('demo-task2', () => {
  console.log('demo-task2 is running');
  return BackgroundFetch.Result.NewData;
});

BackgroundFetch.registerTaskAsync('demo-task1', {
  minimumInterval: 60, // 1 min
  stopOnTerminate: false,
  startOnBoot: true,
}).catch(error => alert(`Error registerTaskAsync: ${error.message}`));

BackgroundFetch.registerTaskAsync('demo-task2', {
  minimumInterval: 60, // 1 min
  stopOnTerminate: false,
  startOnBoot: true,
}).catch(error => alert(`Error registerTaskAsync: ${error.message}`));

export default function App() {
  console.log('sarasa - App.init');
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    console.log('sarasa - App.aca1');
    return null;
  } else {
    console.log('sarasa - App.aca2');
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
