// hooks/guards/useRequireAuth.js
import useAuth from './useAuth';

export default function useRequireAuth() {
    const { user, loading } = useAuth();
    const isAuthenticated = !!user;

    return { user, loading, isAuthenticated };
}
