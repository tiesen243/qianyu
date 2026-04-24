import { createDrawerNavigator } from '@react-navigation/drawer'

import Tabs from '@/screens/(test)/(tabs)/__root'
import SaveFilmScreen from '@/screens/(test)/save-film'
import SettingsScreen from '@/screens/(test)/settings.tsx'

const Test = createDrawerNavigator({
  screens: {
    tabs: {
      screen: Tabs,
      options: {
        title: 'Quản lý phim',
      },
    },

    'save-film': {
      screen: SaveFilmScreen,
      options: {
        title: 'Lưu phim',
        drawerItemStyle: {
          display: 'none',
        },
      },
    },

    settings: {
      screen: SettingsScreen,
      options: {
        title: 'Cài đặt',
      },
    },
  },
})

export default Test
