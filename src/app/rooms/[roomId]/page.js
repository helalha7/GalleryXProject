import Image from 'next/image';
import Link from 'next/link';
import { roomInfoMap } from '@/data/rooms';
import Header from '@/components/shared/Header';
import { EnvelopeIcon, PhoneIcon, ClockIcon, MapPinIcon } from 'lucide-react';

export default function RoomDetail({ params }) {
    const roomId = params.roomId;
    const room = roomInfoMap[roomId];

    if (!room) return <p className="text-center py-10">Room not found.</p>;

    return (
        <>
            <Header />

            {/* Room Header - properly responsive to theme changes */}
            <div className="bg-white dark:bg-[#111827] py-6 px-6 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-start">
                        <div>
                            {/* Room title that properly changes with theme */}
                            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white transition-colors duration-300">
                                {room.name}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                                {room.shortDescription}
                            </p>
                        </div>

                        {/* Back to Museum Map link - on the right */}
                        <Link href="/explore" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Back to Museum Map
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main content - with dark/light mode support */}
            <div className="bg-white dark:bg-gray-800 transition-colors duration-300">
                <div className="max-w-3xl mx-auto p-6">
                    <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6 shadow">
                        <Image
                            src={room.imageUrl}
                            alt={room.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 text-lg transition-colors duration-300 mb-8">
                        {room.description}
                    </p>

                    {/* Contact Information Section - Only shown for helpdesk */}
                    {roomId === 'helpdesk' && room.contactInfo && (
                        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contact Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Phone */}
                                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="mr-4 bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{room.contactInfo.phone}</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="mr-4 bg-green-100 dark:bg-green-900 p-3 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                        <a href={`mailto:${room.contactInfo.email}`} className="font-medium text-gray-900 dark:text-white hover:underline">
                                            {room.contactInfo.email}
                                        </a>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="mr-4 bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Hours</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{room.contactInfo.hours}</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="mr-4 bg-red-100 dark:bg-red-900 p-3 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 dark:text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{room.contactInfo.location}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <p className="text-blue-800 dark:text-blue-300">
                                    <span className="font-semibold">Need help?</span> Our visitor services team is ready to assist you with any questions or concerns. Don't hesitate to reach out by phone or email, or visit us at the information desk.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}