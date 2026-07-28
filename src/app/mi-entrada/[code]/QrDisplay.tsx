"use client";

import { QRCodeSVG } from "qrcode.react";

interface QrDisplayProps {
  qrCode: string;
}

export default function QrDisplay({ qrCode }: QrDisplayProps) {
  return (
    <div className="flex justify-center">
      <div className="bg-white p-4 rounded-2xl shadow-lg">
        <QRCodeSVG value={qrCode} size={256} level="H" />
      </div>
    </div>
  );
}
