import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeIcon } from 'lucide-react-native'
import { lazy } from 'react'

const Tabs = createBottomTabNavigator({
  screenOptions: {
    tabBarShowLabel: false,
  },

  screens: {
    index: {
      screen: lazy(() => import('@/screens/(tabs)/_index')),
      options: {
        title: 'Home',
        tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
      },
    },
  },
})

export default Tabs
