import { User } from "@/types";

export default function isRecentlyLogin (user: User) {
    return user?.last_login_at ? new Date(user?.last_login_at).getTime() > new Date().getTime() - 1000 * 60 * 60 * 24 : false;
}