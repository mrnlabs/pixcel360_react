import { User } from "@/types";
import { usePage } from "@inertiajs/react";

export default function isMyAccount(user: User): boolean {
  const authUser = (usePage().props.auth as { user: User }).user;
  return authUser.id === user.id;
}