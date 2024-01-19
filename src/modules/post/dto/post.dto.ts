import { Expose } from "class-transformer";
import { AbstractDto } from "src/common";

export class PostsDto extends AbstractDto {
  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  published: boolean;

  @Expose()
  authorId: string;
}
