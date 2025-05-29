
import Ticket from '../models/ticketModel';

export async function createTicket(userId) {
    return await Ticket.create({ user: userId });
}

export async function getTicketByUserId(userId) {
    return await Ticket.findOne({ user: userId });
}

export async function deleteTicketByUserId(userId) {
    return await Ticket.findOneAndDelete({ user: userId });
}