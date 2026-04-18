import { homeController } from '@/modules/home/interfaces/home.controller'

export const createHomeModule = () => ({
  controller: homeController(),
})
