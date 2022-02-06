import React from 'react';

import createStackNavigator from 'repro-app/navigation/create-stack-navigator';
import HomeScreen from 'repro-app/screens/home';
import { HomeStackParams } from 'repro-app/navigation/types';
import { navigatorScreenOptions } from 'repro-app/navigation/navigator-screen-options';

const HomeStack = createStackNavigator<HomeStackParams>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={navigatorScreenOptions}>
      <HomeStack.Screen
        name="home"
        component={HomeScreen}
        options={{ title: 'Home', headerTitle: 'Hello World' }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeNavigator;
