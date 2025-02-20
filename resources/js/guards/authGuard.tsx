import { Role, Permission, User } from '../types';
import { usePage } from '@inertiajs/react';

interface AuthGuardProps {
    roles?: string | string[];
    permissions?: string | string[];
    requireAll?: boolean;
    children: React.ReactNode;
}

export const AuthGuard = ({ 
    roles, 
    permissions, 
    requireAll = false, 
    children 
}: AuthGuardProps) => {
    const { auth } = usePage().props;
    const user: User = auth.user;

    const checkRoles = (): boolean => {
        if (!roles) return true;
        const roleArray = Array.isArray(roles) ? roles : [roles];
        return (user?.roles ?? []).some((userRole: Role) => 
            roleArray.includes(userRole.name)
        );
    };

    const checkPermissions = (): boolean => {
        if (!permissions) return true;
        const permissionArray = Array.isArray(permissions) ? permissions : [permissions];
        
        // Collect all permissions from user's roles and direct permissions
        const userPermissions = new Set([
            ...(user.permissions?.map(p => p.name) || []),
            ...(user?.roles ?? []).flatMap(role => role.permissions?.map(p => p.name) || [])
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

    // const hasAccess = requireAll 
    //     ? checkRoles() && checkPermissions()
    //     : checkRoles() || checkPermissions();
    //we will skip the permission check for now

    
    const hasAccess = checkRoles();

    return hasAccess ? children : null;
};