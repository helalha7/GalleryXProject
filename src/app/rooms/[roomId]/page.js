import Image from 'next/image';
import { roomInfoMap } from '@/data/rooms'; // or define it directly

export default function RoomDetail({ params }) {
    const roomId = params.roomId;
    const room = roomInfoMap[roomId];

    if (!room) return <p className="text-center py-10">Room not found.</p>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">{room.name}</h1>

            <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4 shadow">
                <Image
                    src={room.imageUrl}
                    alt={room.name}
                    fill
                    className="object-cover"
                />
            </div>

            <p className="text-gray-700 text-lg">{room.description}</p>
        </div>
    );
}
