import { hookstate } from "@hookstate/core";

export const subState = hookstate<PushSubscription | null>(null)