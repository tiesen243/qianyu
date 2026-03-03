import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { lazy } from 'react'

const Tabs = createBottomTabNavigator({
  screenOptions: {
    tabBarLabelStyle: { display: 'none' },
  },

  screens: {
    index: lazy(() => import('./_index')),
    counter: lazy(() => import('./counter')),
  },
})

export default Tabs
