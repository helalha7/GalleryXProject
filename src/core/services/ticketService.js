import * as ticketRepo from '@/core/repositories/ticketRepository';
import User from '@/core/models/userModel';

export async function purchaseTicket(userId) {
    const ticket = await ticketRepo.createTicket(userId);

    // Link ticket to user
    await User.findByIdAndUpdate(userId, { ticket: ticket._id });

    return ticket;
}

export async function getUserTicket(userId) {
    return await ticketRepo.getTicketByUserId(userId);
}
