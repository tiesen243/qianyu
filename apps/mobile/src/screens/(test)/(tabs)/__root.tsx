import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable'
import { lazy } from 'react'

const Tabs = createNativeBottomTabNavigator({
  screens: {
    explorer: {
      screen: lazy(() => import('@/screens/(test)/(tabs)/explorer')),
      options: {
        title: 'Khám phá',
        tabBarIcon: {
          type: 'image',
          source: require('@/assets/icons/telescope.png'),
        },
      },
    },

    'my-film': {
      screen: lazy(() => import('@/screens/(test)/(tabs)/my-film')),
      options: {
        title: 'Phim của tôi',
        tabBarIcon: {
          type: 'image',
          source: require('@/assets/icons/film.png'),
        },
      },
    },
  },
})

export default Tabs
