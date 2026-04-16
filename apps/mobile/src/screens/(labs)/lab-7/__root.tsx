import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { lazy } from 'react'

import { Lab7Provider } from '@/screens/(labs)/lab-7/_context'

const Lab7Stack = createNativeStackNavigator()

export default function Lab7() {
  return (
    <Lab7Provider>
      <Lab7Stack.Navigator>
        <Lab7Stack.Screen
          name='login'
          component={lazy(() => import('@/screens/(labs)/lab-7/login'))}
        />
        <Lab7Stack.Screen
          name='profile'
          component={lazy(() => import('@/screens/(labs)/lab-7/profile'))}
        />
        <Lab7Stack.Screen
          name='edit-profile'
          component={lazy(() => import('@/screens/(labs)/lab-7/edit-profile'))}
        />
      </Lab7Stack.Navigator>
    </Lab7Provider>
  )
}
