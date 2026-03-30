import type { StaticParamList } from '@react-navigation/native'

import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { lazy } from 'react'

import Tabs from '@/screens/(tabs)/__root'
import { PostDetailsHeaderRight } from '@/screens/post-details'

const RootStack = createNativeStackNavigator({
  screens: {
    tabs: {
      screen: Tabs,
      linking: { initialRouteName: 'index' },
      options: { headerShown: false },
    },

    'post-create': {
      screen: lazy(() => import('@/screens/post-create')),
      linking: { path: 'posts/create' },
      options: { title: 'Create Post' },
    },

    'post-details': {
      screen: lazy(() => import('@/screens/post-details')),
      linking: { path: 'posts/:id' },
      options: ({ route }) => ({
        title: 'Post Details',
        headerRight: () => (
          <PostDetailsHeaderRight id={(route.params as { id: number }).id} />
        ),
      }),
    },

    settings: {
      screen: lazy(() => import('@/screens/settings/screen')),
      linking: { path: 'settings' },
      options: { title: 'Settings' },
    },
  },
})

export default createStaticNavigation(RootStack)

type RootStackParamList = StaticParamList<typeof RootStack>

declare global {
  // oxlint-disable-next-line typescript/no-namespace
  namespace ReactNavigation {
    // oxlint-disable-next-line typescript/no-empty-interface, typescript/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
