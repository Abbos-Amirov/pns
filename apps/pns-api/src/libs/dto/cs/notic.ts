import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Notices{
  @Field (()=> [Notices])
  list: Notices[] }
