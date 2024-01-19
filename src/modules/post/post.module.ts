import { Module } from "@nestjs/common";
import { PostService } from "./services/post.service";
import { PostController } from "./controller/post.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
