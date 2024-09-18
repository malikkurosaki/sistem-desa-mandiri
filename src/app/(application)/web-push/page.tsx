import { NotificationManager } from "@/module/_global/components/notification_manager";

const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;

console.log(
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default function Page() {
  return (
    <div>
      {/* <PushNotificationManager publicKey={publicKey} /> */}
      <NotificationManager publicKey={publicKey} />
    </div>
  );
}