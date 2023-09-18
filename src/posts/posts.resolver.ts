import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './models/post.model';
import { User } from './models/user.model';
import { CreatePostInput } from './dto/create-post.input';

@Resolver((of) => Post)
export class PostsResolver {

    constructor(private readonly postsService: PostsService) { }

    @Query((returns) => Post)
    post(@Args({ name: 'id', type: () => ID }, ParseIntPipe) id: number): Post {
        return this.postsService.findOne(id);
    }

    @Query((returns) => [Post])
    async posts(): Promise<Post[]> {
        return this.postsService.findAll();
    }

    @Mutation(returns => Post)
    async createPost(@Args('createPostInput') createPostInput: CreatePostInput): Promise<Post> {
        const post = await this.postsService.createPost(createPostInput);
        return post;
    }

    @ResolveField((of) => User)
    user(@Parent() post: Post): any {
        return { __typename: 'User', id: post.authorId };
    }

}
