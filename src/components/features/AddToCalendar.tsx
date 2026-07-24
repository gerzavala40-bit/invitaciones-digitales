"use client";

import { useState } from "react";
import { EventData } from "../templates/types";

export default function AddToCalendar({ event, className = "" }: { event: EventData; className?: string }) {
  const [showOptions, setShowOptions] = useState(false);

  // Parse date and time safely
  const startDate = new Date(event.eventDate);
  if (event.eventTime) {
    const [h, m] = event.eventTime.split(":");
    startDate.setHours(parseInt(h, 10), parseInt(m, 10), 0);
  }
  
  const endDate = new Date(startDate);
  endDate.setHours(startDate.getHours() + 6); // Assume 6 hours duration

  const formatGoogleDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}&details=${encodeURIComponent(event.phrase || "¡Te esperamos!")}&location=${encodeURIComponent(event.venueAddress || event.venueName)}`;

  const generateIcs = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${formatGoogleDate(startDate)}`,
      `DTEND:${formatGoogleDate(endDate)}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.phrase || "¡Te esperamos!"}`,
      `LOCATION:${event.venueAddress || event.venueName}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invitacion_${event.slug}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`relative ${className}`}>
      <button 
        onClick={() => setShowOptions(!showOptions)}
        className="w-full flex items-center justify-center gap-2 border border-current px-4 py-3 rounded hover:opacity-80 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        AGENDAR EVENTO
      </button>

      {showOptions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white text-black rounded shadow-lg z-50 overflow-hidden text-sm flex flex-col text-left border border-gray-200">
          <a href={googleCalendarUrl} target="_blank" rel="noreferrer" className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 flex items-center gap-2">
             Google Calendar
          </a>
          <button onClick={generateIcs} className="px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-left w-full">
             Apple Calendar / Outlook
          </button>
        </div>
      )}
    </div>
  );
}
