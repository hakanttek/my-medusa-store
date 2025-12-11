import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { BlogModuleService } from "../modules/blog/service"
import { BLOG_MODULE } from "../modules/blog"
import { container } from "@medusajs/framework"

type Input = {
  title: string
}

const createPostStep = createStep(
  "create-post",
  async (input: Input, { container }) => {
    const blogModuleService: BlogModuleService = container.resolve(
      BLOG_MODULE
    )

    const post = await blogModuleService.createPosts(input)

    return new StepResponse(post, post.id)
  },
  async (postId, { container }) => {
    if (!postId)
      return;

    const blogModuleService: BlogModuleService = container.resolve(BLOG_MODULE)

    await blogModuleService.deletePosts(postId)
  }
)