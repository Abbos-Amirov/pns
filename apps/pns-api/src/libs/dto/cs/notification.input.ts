import { InputType, Field } from '@nestjs/graphql';
import { NotificationGroup, NotificationStatus, NotificationType } from '../../enums/notification.enum';


@InputType()
export class CreateNotificationInput {
  @Field(() => NotificationType)
  notificationType: NotificationType;

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
}

@InputType()
export class UpdateNotificationInput {
  @Field(() => NotificationStatus, { nullable: true })
  notificationStatus?: NotificationStatus;

  @Field({ nullable: true })
  notificationTitle?: string;

  @Field({ nullable: true })
  notificationDesc?: string;
}