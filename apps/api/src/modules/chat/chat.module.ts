import { SendMessagesUseCase } from '@/modules/chat/application/use-cases/send-message.use-case'
import { chatController } from '@/modules/chat/interfaces/chat.controller'

export const createChatModule = () => {
  const usecases = {
    sendMessage: new SendMessagesUseCase(),
  }

  return {
    controller: chatController(usecases),
    usecases,
  }
}
