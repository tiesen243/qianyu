import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FlaskConicalIcon } from 'lucide-react-native'
import { lazy } from 'react'

import Lab7 from '@/screens/(labs)/lab-7/__root'
import Lab8 from '@/screens/(labs)/lab-8'

const Labs = createBottomTabNavigator({
  screenOptions: {
    tabBarIcon: ({ color, size }) => (
      <FlaskConicalIcon color={color} size={size} />
    ),
  },

  screens: {
    'lab-1': lazy(() => import('@/screens/(labs)/lab-1')),
    'lab-2': lazy(() => import('@/screens/(labs)/lab-2')),
    'lab-3': lazy(() => import('@/screens/(labs)/lab-3')),
    'lab-4': lazy(() => import('@/screens/(labs)/lab-4')),
    'lab-5': lazy(() => import('@/screens/(labs)/lab-5')),
    'lab-6': lazy(() => import('@/screens/(labs)/lab-6')),
    'lab-7': Lab7,
    'lab-8': Lab8,
  },
})

export default Labs
