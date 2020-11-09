import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Linking from "expo-linking";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

// Route Name Constants
const tabs = {
  CATEGORIES: "categories",
  NEWS: "news",
  PHOTOS: "photos",
  VIDEOS: "videos",
};
const routeNames = {
  HOME: "Home",
  PEOPLE: "People",
};

// Linking Configuration
const linking = {
  config: {
    screens: {
      [routeNames.PEOPLE]: {
        path: "/people/:slug",
        screens: {
          [tabs.NEWS]: "/",
          [tabs.PHOTOS]: "/photos",
          [tabs.VIDEOS]: "/videos",
        },
      },
    },
  },
  prefixes: [Linking.makeUrl("/")],
};

const PeopleSlugContext = React.createContext(null);

const News = ({ route }) => {
  const slug = useContext(PeopleSlugContext);

  useEffect(() => {
    console.log("News Loaded", route);
  }, []);

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>News Page Param:</Text>
      <Text style={{ fontWeight: "700" }}>{slug}</Text>
    </View>
  );
};
const Photos = ({ route }) => {
  const slug = useContext(PeopleSlugContext);

  useEffect(() => {
    console.log("Photos Loaded", route);
  }, []);

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Photos Page Param:</Text>
      <Text style={{ fontWeight: "700" }}>{slug}</Text>
    </View>
  );
};

const Videos = ({ route }) => {
  const slug = useContext(PeopleSlugContext);

  useEffect(() => {
    console.log("Videos Loaded", route);
  }, []);

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Videos Page Param:</Text>
      <Text style={{ fontWeight: "700" }}>{slug}</Text>
    </View>
  );
};

// Child Component that will be deep linked into
const People = ({ route }) => {
  const { width } = useWindowDimensions();
  const slug = route.params?.slug;

  return (
    <PeopleSlugContext.Provider value={slug}>
      <Tab.Navigator
        lazy
        lazyPlaceholder={() => <ActivityIndicator />}
        initialLayout={{ width }}
      >
        <Tab.Screen name={tabs.NEWS} component={News} />
        <Tab.Screen name={tabs.PHOTOS} component={Photos} />
        <Tab.Screen name={tabs.VIDEOS} component={Videos} />
      </Tab.Navigator>
    </PeopleSlugContext.Provider>
  );
};

// Initial Route
const Home = () => (
  <View
    style={{
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text>Home Screen</Text>
  </View>
);

// Parent
const RootNavigator = () => (
  <Stack.Navigator
    mode="modal"
    initialRouteName={routeNames.HOME}
    screenOptions={() => ({
      lazy: true,
      lazyPlaceholder: () => <ActivityIndicator />,
    })}
  >
    <Stack.Screen name={routeNames.HOME} component={Home} />
    <Stack.Screen name={routeNames.PEOPLE} component={People} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <RootNavigator />
    </NavigationContainer>
  );
}
