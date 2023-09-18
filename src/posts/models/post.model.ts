import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "./user.model";

@ObjectType()
@Directive('@key(fields: "id")')
export class Post {
    @Field((type) => ID)
    id: number;

    @Field()
    title: string;

    @Field()
    authorId: number;

    @Field((type) => User)
    user?: User
}