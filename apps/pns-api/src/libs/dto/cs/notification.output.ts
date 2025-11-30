import { ObjectType, Field, ID } from '@nestjs/graphql';
import { NotificationGroup, NotificationStatus, NotificationType } from '../../enums/notification.enum';


@ObjectType()
export class Notification {
  @Field(() => ID)
  _id: string;

  @Field(() => NotificationType)
  notificationType: NotificationType;

  @Field(() => NotificationStatus)
  notificationStatus: NotificationStatus;

  @Field(() => NotificationGroup)
  notificationGroup: NotificationGroup;

  @Field()
  notificationTitle: string;

  @Field({ nullable: true })
  notificationDesc?: string;

  @Field()
  authorId: string;

  @Field()
  receiverId: string;

  @Field({ nullable: true })
  propertyId?: string;

  @Field({ nullable: true })
  articleId?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}