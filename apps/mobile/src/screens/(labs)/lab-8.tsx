import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable'
import { Text } from 'react-native'

const HomeScreen = () => <Text className='text-foreground'>Home</Text>

const SearchScreen = () => <Text className='text-foreground'>Search</Text>

const SettingsScreen = () => <Text className='text-foreground'>Settings</Text>

const Lab8 = createNativeBottomTabNavigator({
  screenOptions: {
    headerShown: true,
  },

  screens: {
    home: {
      screen: HomeScreen,
      options: {
        tabBarIcon: {
          type: 'image',
          source: require('@/assets/icons/house.png'),
        },
      },
    },
    search: {
      screen: SearchScreen,
      options: {
        tabBarIcon: {
          type: 'image',
          source: require('@/assets/icons/search.png'),
        },
      },
    },
    settings: {
      screen: SettingsScreen,
      options: {
        tabBarIcon: {
          type: 'image',
          source: require('@/assets/icons/settings.png'),
        },
      },
    },
  },
})

export default Lab8
