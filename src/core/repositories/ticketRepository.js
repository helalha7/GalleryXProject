import Ticket from '../models/ticketModel';
import { connectToDatabase } from '@/lib/mongoose';

export async function createTicket(userId) {
    await connectToDatabase();
    return await Ticket.create({ user: userId });
}

export async function getTicketByUserId(userId) {
    await connectToDatabase();
    return await Ticket.findOne({ user: userId });
}

export async function deleteTicketByUserId(userId) {
    await connectToDatabase();
    return await Ticket.findOneAndDelete({ user: userId });
}