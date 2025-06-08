export function saveUserSession(user, token) {
    if (typeof window !== 'undefined') {
        // Store the token inside the user object
        const userWithToken = { ...user, token };
        sessionStorage.setItem('user', JSON.stringify(userWithToken));
    }
}

export function getUserFromSession() {
    if (typeof window !== 'undefined') {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
    return null;
}

// You no longer need getTokenFromSession if you use the new structure,
// but you can keep it for other uses if needed.
export function getTokenFromSession() {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem('token');
    }
    return null;
}

export function updateUserTicketInSession(ticket) {
    if (typeof window !== 'undefined') {
        const raw = sessionStorage.getItem('user');
        if (!raw) return;

        const user = JSON.parse(raw);
        user.ticket = ticket;
        sessionStorage.setItem('user', JSON.stringify(user));
    }
}

export function clearSession() {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token'); // still safe to clear in case old version saved it
    }
}
