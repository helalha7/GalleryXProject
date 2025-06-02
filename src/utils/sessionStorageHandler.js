
export function saveUserSession(user, token) {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', token);
    }
}

export function getUserFromSession() {
    if (typeof window !== 'undefined') {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
    return null;
}

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
        sessionStorage.removeItem('token');
    }
}
