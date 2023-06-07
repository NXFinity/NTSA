import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Post, PostSchema } from "../../social/schema/post.schema";
import { Comment, CommentSchema } from "../../social/schema/comment.schema";
import { Like, LikeSchema } from "../../social/schema/like.schema";
import { Dislike, DislikeSchema } from "../../social/schema/dislike.schema";


@Schema()
export class User {
  // Schema for User document
  @ApiProperty()
  @Prop()
    // Unique identifier for the user
  id?: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
    // Username for the user, must be unique
  username: string;

  @ApiProperty()
  @Prop({ required: true })
    // First name of the user
  firstname: string;

  @ApiProperty()
  @Prop({ required: true })
    // Last name of the user
  lastname: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
    // Email address of the user, must be unique
  email: string;

  @ApiProperty()
  @Prop({ required: true })
    // Password for the user
  password: string;

  @ApiProperty()
  @Prop({ default: false })
    // Flag indicating whether the user's email has been verified or not
  isEmailVerified: boolean;

  @ApiProperty()
  @Prop({ default: false })
    // Token used to verify the user's email address
  emailVerificationToken: string;

  @ApiProperty({ type: [PostSchema], default: [] })
  @Prop({ type: [PostSchema], default: [] })
    // List of posts created by the user
  posts: Post[];

  @ApiProperty({ type: [CommentSchema], default: [] })
  @Prop({ type: [CommentSchema], default: [] })
    // List of comments created by the user
  comments: Comment[];

  @ApiProperty({ type: [LikeSchema], default: [] })
  @Prop({ type: [LikeSchema], default: [] })
    // List of likes created by the user
  likes: Like[];

  @ApiProperty({ type: [DislikeSchema], default: [] })
  @Prop({ type: [DislikeSchema], default: [] })
    // List of dislikes created by the user
  dislikes: Dislike[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
