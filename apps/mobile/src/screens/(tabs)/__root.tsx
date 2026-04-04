import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable'
import { lazy } from 'react'

const Tabs = createNativeBottomTabNavigator({
  initialRouteName: 'index',

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
      linking: { path: 'search' },
      options: {
        title: 'Search',
        tabBarIcon: {
          type: 'image',
          source: require('@/assets/icons/search.png'),
        },
      },
    },

    chat: {
      screen: lazy(() => import('@/screens/(tabs)/chat')),
      linking: { path: 'chat' },
      options: {
        title: 'Chat',
        tabBarIcon: {
          type: 'image',
          source: require('@/assets/icons/chat.png'),
        },
      },
    },

    profile: {
      screen: lazy(() => import('@/screens/(tabs)/profile/screen')),
      linking: { path: 'profile' },
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
