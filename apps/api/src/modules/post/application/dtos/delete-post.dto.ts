import { getPostDTO } from '@/modules/post/application/dtos/get-post.dto'

export const deletePostDTO = getPostDTO

export type DeletePostDTO = ReturnType<typeof deletePostDTO.parse>
