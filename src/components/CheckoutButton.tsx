"use client";

import { useState } from "react";

interface CheckoutButtonProps {
  planId: string;
  className?: string;
  children: React.ReactNode;
}

export default function CheckoutButton({ planId, className = "", children }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          buyerEmail: "",
          buyerName: "",
        }),
      });

      const data = await res.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        // Fallback a WhatsApp si MP falla
        window.open(`https://wa.me/5493425299942?text=Hola!%20Quiero%20el%20${encodeURIComponent(planId)}`, "_blank");
      }
    } catch {
      // Fallback a WhatsApp
      window.open(`https://wa.me/5493425299942?text=Hola!%20Quiero%20el%20${encodeURIComponent(planId)}`, "_blank");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleCheckout} disabled={loading} className={`${className} ${loading ? "opacity-50 cursor-wait" : ""}`}>
      {loading ? "Procesando..." : children}
    </button>
  );
}
