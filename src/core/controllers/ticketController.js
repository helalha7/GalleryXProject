import { purchaseTicket, getUserTicket } from '@/core/services/ticketService';

// ✅ POST /api/tickets
export async function purchaseTicketController(req) {
  try {
    const user = req.user;
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: 'You must be logged in to purchase a ticket.' }),
        { status: 401 }
      );
    }

    const ticket = await purchaseTicket(user.id);

    return new Response(
      JSON.stringify({ success: true, data: ticket }),
      { status: 201 }
    );
  } catch (error) {
    console.error('purchaseTicketController Error:', error.message);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Unable to complete ticket purchase. Please try again later.',
      }),
      { status: error.status || 500 }
    );
  }
}

// ✅ GET /api/tickets
export async function getTicketController(req) {
  try {
    const user = req.user;
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: 'You must be logged in to view your ticket.' }),
        { status: 401 }
      );
    }

    const ticket = await getUserTicket(user.id);

    if (!ticket) {
      return new Response(
        JSON.stringify({ success: false, message: 'You do not have an active ticket.' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: ticket }),
      { status: 200 }
    );
  } catch (error) {
    console.error('getTicketController Error:', error.message);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Unable to retrieve ticket. Please try again later.',
      }),
      { status: error.status || 500 }
    );
  }
}
