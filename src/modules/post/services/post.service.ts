import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Post } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { PostsDto } from '../dto';
import { createCustomError } from 'src/common/utils/helpers';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('Posts service');

  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    this.logger.log('postById');
    try {
      const post = await this.prisma.post.findUnique({
        where: postWhereUniqueInput,
      });
      return plainToInstance(PostsDto, post);
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async posts(params: {
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    this.logger.log('getAllPosts');
    try {
      const posts = await this.prisma.post.findMany({
        where: params.where,
        orderBy: params.orderBy,
      });
      return plainToInstance(PostsDto, posts);
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  async getPublishedPosts(): Promise<Post[]> {
    this.logger.log('getPublishedPosts');
    try {
      const publishedPosts = await this.prisma.post.findMany({
        where: { published: true },
      });
      return plainToInstance(PostsDto, publishedPosts);
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    this.logger.log('createPost');
    try {
      const createPost = await this.prisma.post.create({
        data,
      });
      return createPost;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    this.logger.log('updatePost');
    try {
      const { data, where } = params;
      const updatePost = await this.prisma.post.update({
        where: where,
        data: data,
      });
      return updatePost;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    this.logger.log('deletePost');
    try {
      const deletePost = await this.prisma.post.delete({
        where,
      });
      return deletePost;
    } catch (e) {
      throw createCustomError(
        e.message || 'Something went wrong',
        e.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
