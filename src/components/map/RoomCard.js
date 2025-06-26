'use client';

import { useState } from 'react';

export default function RoomCard({ room, onClick }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            tabIndex={0}
            role="button"
            aria-pressed={isHovered}
            onClick={() => onClick(room)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            className={`
        relative
        rounded-lg
        overflow-hidden
        cursor-pointer
        shadow-md
        flex flex-col items-center justify-center
        text-center
        p-2
        transition
        duration-300
        transform
        hover:scale-[1.03]
        focus:outline-none
        focus:ring-2
        focus:ring-offset-1
        focus:ring-green-400
        w-full h-full
        border border-gray-600
        bg-cover bg-center
      `}
            style={{
                backgroundImage: `url(${room.imageUrl})`,
            }}
        >
            <div className="absolute inset-0 z-0 bg-white/70 dark:bg-black/60 transition-colors duration-300" />

            <div className="relative z-10">
                <h3 className="font-display font-semibold mb-1 text-xs sm:text-sm text-[#111827] dark:text-white">
                    {room.name}
                </h3>

                {isHovered ? (
                    <>
                        <p className="text-[10px] sm:text-xs mb-1 text-[#374151] dark:text-gray-300">
                            {room.description}
                        </p>
                        <button
                            className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white bg-gradient-to-r from-green-600 to-lime-500 shadow hover:from-lime-500 hover:to-green-600 transition-colors duration-300"
                            aria-label={`Enter ${room.name}`}
                            type="button"
                        >
                            View Room
                        </button>
                    </>
                ) : (
                    <p className="italic text-[10px] text-[#374151] dark:text-gray-300 select-none pointer-events-none">
                        Click to view
                    </p>
                )}
            </div>
        </div>
    );
}
