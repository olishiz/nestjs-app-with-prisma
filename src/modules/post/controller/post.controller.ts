import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { Post as PostModel } from '@prisma/client';
import { CreatePostsDto } from '../dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: id });
  }

  @Get('post/feed')
  async getPublishedPosts() {
    try {
      const publishedPosts = await this.postService.getPublishedPosts();
      return publishedPosts;
    } catch (error) {
      return error;
    }
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post()
  async createPost(@Body() postData: CreatePostsDto): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Put(':id')
  async updatePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: id },
      data: { published: true },
    });
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: id });
  }
}
