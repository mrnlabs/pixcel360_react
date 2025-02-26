import { usePage } from '@inertiajs/react';
import { User, Role, Permission } from '../types';

export const useAuth = () => {
    const { auth } = usePage().props;
    // @ts-expect-error
    const user: User = auth.user;

    const hasRole = (roles: string | string[]): boolean => {
        const roleArray = Array.isArray(roles) ? roles : [roles];
        return (user.roles ?? []).some((userRole: Role) => 
            roleArray.includes(userRole.name)
        );
    };

    const hasPermission = (permissions: string | string[], requireAll = false): boolean => {
        const permissionArray = Array.isArray(permissions) ? permissions : [permissions];
        
        const userPermissions = new Set([
            ...(user.permissions?.map(p => p.name) || []),
            ...(user.roles ?? []).flatMap(role => role.permissions?.map(p => p.name) || [])
        ]);

        if (requireAll) {
            return permissionArray.every(permission => 
                userPermissions.has(permission)
            );
        }

        return permissionArray.some(permission => 
            userPermissions.has(permission)
        );
    };

    return {
        user,
        hasRole,
        hasPermission
    };
};