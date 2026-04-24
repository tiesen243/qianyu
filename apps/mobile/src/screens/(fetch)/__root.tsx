import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FlaskConicalIcon } from 'lucide-react-native'
import { lazy } from 'react'

const Fetch = createBottomTabNavigator({
  screenOptions: {
    tabBarIcon: ({ color, size }) => (
      <FlaskConicalIcon color={color} size={size} />
    ),
  },

  screens: {
    'lab-4': lazy(() => import('@/screens/(fetch)/lab-4')),
    'lab-5': lazy(() => import('@/screens/(fetch)/lab-5')),
    'lab-6': lazy(() => import('@/screens/(fetch)/lab-6')),
  },
})

export default Fetch
