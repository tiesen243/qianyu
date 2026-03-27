import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable'
import { lazy } from 'react'

const Tabs = createNativeBottomTabNavigator({
  initialRouteName: 'index',
  screenOptions: {
    tabBarLabelVisibilityMode: 'auto',
  },

  screens: {
    index: {
      screen: lazy(() => import('@/screens/(tabs)/_index')),
      options: {
        title: 'Home',
        tabBarIcon: {
          type: 'image',
          source: require('@/assets/icons/house.png'),
        },
      },
    },

    search: {
      screen: lazy(() => import('@/screens/(tabs)/search')),
      options: {
        title: 'Search',
        tabBarIcon: {
          type: 'image',
          source: require('@/assets/icons/search.png'),
        },
      },
    },

    profile: {
      screen: lazy(() => import('@/screens/(tabs)/profile/screen')),
      options: {
        title: 'Profile',
        tabBarIcon: {
          type: 'image',
          source: require('@/assets/icons/user.png'),
        },
      },
    },
  },
})

export default Tabs
