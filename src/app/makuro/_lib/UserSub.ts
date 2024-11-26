import { PushSubscription } from 'web-push';
export class UserSub {
   public static subscription: PushSubscription | null;
   public static setSub(subscription: PushSubscription) {
      this.subscription = subscription
   }
}