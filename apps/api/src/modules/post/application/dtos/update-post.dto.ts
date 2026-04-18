import { createPostDTO } from '@/modules/post/application/dtos/create-post.dto'
import { getPostDTO } from '@/modules/post/application/dtos/get-post.dto'

export const updatePostDTO = createPostDTO.partial().extend({
  id: getPostDTO.shape.id,
})

export type UpdatePostDTO = ReturnType<typeof updatePostDTO.parse>
