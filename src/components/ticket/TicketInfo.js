export default function TicketInfo({ ticket }) {
    return (
        <div className="bg-white dark:from-gray-700/50 dark:to-gray-800/50 dark:bg-gradient-to-br shadow-md rounded-lg p-6 border dark:border-gray-600/30">
            <h2 className="text-xl font-semibold text-primary dark:text-white mb-2">🎟️ Ticket Info</h2>
            <p className="text-secondary dark:text-gray-300">
                Ticket ID: <span className="font-mono">{ticket.id}</span>
            </p>
            <p className="text-secondary dark:text-gray-300">
                Valid Until: <span>{new Date(ticket.validUntil).toLocaleString()}</span>
            </p>
            <p className="text-secondary dark:text-gray-300">
                Purchased At: <span>{new Date(ticket.createdAt).toLocaleString()}</span>
            </p>
        </div>
    );
}
