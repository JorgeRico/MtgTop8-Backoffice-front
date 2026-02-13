import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import type { ReactNode } from 'react';
import { routing } from '@/types/web-routing';

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { isLoggedIn }  = useAuthStore();

    if (!isLoggedIn) {
        return <Navigate to={routing.home} replace />
    }

    return children
}