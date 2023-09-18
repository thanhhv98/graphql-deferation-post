import { Injectable } from '@nestjs/common';
import { Post } from './models/post.model';
import { CreatePostInput } from './dto/create-post.input';
import { PrismaService } from './prisma.service';

@Injectable()
export class PostsService {

    constructor(private readonly prismaService: PrismaService) { }

    private posts: Post[] = [
        { authorId: 1, id: 1, title: 'Lorem Ipsum' },
        { authorId: 1, id: 2, title: 'Foo' },
        { authorId: 2, id: 3, title: 'Bar' },
        { authorId: 2, id: 4, title: 'Hello World' },
    ];

    findAllByAuthorId(authorId: number): Post[] {
        return this.posts.filter((post) => post.authorId === Number(authorId));
    }

    findOne(postId: number): Post {
        return this.posts.find((post) => post.id === postId);
    }

    async findAll(): Promise<Post[]> {
        const users =  await this.prismaService.post.findMany({
            include: {
                user: true
            }
        });
        console.log(users)
        return users;
    }

    async createPost(createPostInput: CreatePostInput): Promise<Post> {
        return this.prismaService.post.create({
            data: {
                title: createPostInput.title,
                authorId: createPostInput.authorId,
                // user: createPostInput.user
            }
        })
    }

}
