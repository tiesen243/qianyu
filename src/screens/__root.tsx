import type { StaticParamList } from '@react-navigation/native'

import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { lazy } from 'react'

import Tabs from './(tabs)/__root'

const RootStack = createNativeStackNavigator({
  screens: {
    tabs: {
      screen: Tabs,
      options: { headerShown: false },
    },

    login: {
      screen: lazy(() => import('./login')),
      options: { headerShown: false },
    },
  },
})

export default createStaticNavigation(RootStack)

type RootStackParamList = StaticParamList<typeof RootStack>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
