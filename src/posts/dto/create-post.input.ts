import { Field, InputType } from "@nestjs/graphql";
import { User } from "../models/user.model";
import { CreateUserInput } from "./create-user.input";

@InputType()
export class CreatePostInput {
    @Field()
    title: string;


    @Field()
    authorId: number;

    @Field((type) => CreateUserInput, { nullable: true})
    user?: CreateUserInput
}