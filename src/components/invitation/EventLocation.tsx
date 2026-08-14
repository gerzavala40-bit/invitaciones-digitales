'use client';

interface EventLocationProps {
  venueName: string;
  venueAddress: string;
  mapUrl?: string;
  theme?: 'dark' | 'light';
}

export default function EventLocation({ venueName, venueAddress, mapUrl, theme = 'dark' }: EventLocationProps) {
  const boxBg = theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900';
  const btnClass = 'mt-4 inline-block px-6 py-3 rounded-full font-bold text-white uppercase tracking-wider transition-all hover:scale-105';
  const btnBg = theme === 'dark' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-gray-900 hover:bg-gray-800';

  return (
    <div className={`p-6 rounded-3xl border text-center shadow-xl ${boxBg}`}>
      <div className="mb-4">
        <svg className="w-12 h-12 mx-auto mb-2 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h3 className="text-2xl font-bold mb-1">{venueName}</h3>
        <p className="opacity-75">{venueAddress}</p>
      </div>

      {mapUrl && (
        <a href={mapUrl} target="_blank" rel="noopener noreferrer" className={`${btnClass} ${btnBg}`}>
          Ver en Google Maps
        </a>
      )}
    </div>
  );
}
