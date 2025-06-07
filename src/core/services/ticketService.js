import * as ticketRepo from '@/core/repositories/ticketRepository';
import User from '@/core/models/userModel';

export async function purchaseTicket(userId) {
    const existingTicket = await ticketRepo.getTicketByUserId(userId);

    if (existingTicket) {
        const now = new Date();
        if (existingTicket.expiresAt > now) {
            const error = new Error('You already have an active ticket.');
            error.status = 400;
            throw error;
        }

        // If ticket is expired, delete it
        await ticketRepo.deleteTicketByUserId(userId);
    }

    const ticket = await ticketRepo.createTicket(userId);
    await User.findByIdAndUpdate(userId, { ticket: ticket._id });

    return ticket;
}


export async function getUserTicket(userId) {
    return await ticketRepo.getTicketByUserId(userId);
}
