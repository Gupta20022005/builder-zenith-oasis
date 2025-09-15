import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface Coords { lat: number; lon: number }
export interface LocationState {
  coords: Coords | null;
  cityLine: string | null; // e.g. "Melbourne, Victoria"
  loading: boolean;
  error: string | null;
  requestLocation: () => Promise<void>;
}

const LocationCtx = createContext<LocationState | null>(null);

const STORAGE_KEY = "app:location";
const PROMPT_FLAG = "app:promptLocation";

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [cityLine, setCityLine] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load last known location
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { coords?: Coords; cityLine?: string };
        if (parsed.coords) setCoords(parsed.coords);
        if (parsed.cityLine) setCityLine(parsed.cityLine);
      }
    } catch {}
  }, []);

  const reverseGeocode = async (pos: Coords) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${pos.lat}&lon=${pos.lon}`;
      const res = await fetch(url, { headers: { "Accept": "application/json" } });
      const data = await res.json();
      const city = data?.address?.city || data?.address?.town || data?.address?.suburb || data?.address?.county || "";
      const state = data?.address?.state || data?.address?.region || "";
      const line = [city, state].filter(Boolean).join(", ");
      return line || `${pos.lat.toFixed(3)}, ${pos.lon.toFixed(3)}`;
    } catch (e) {
      return `${pos.lat.toFixed(3)}, ${pos.lon.toFixed(3)}`;
    }
  };

  const requestLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const coords = await new Promise<Coords>((resolve, reject) => {
        if (!("geolocation" in navigator)) return reject(new Error("Geolocation not supported"));
        navigator.geolocation.getCurrentPosition(
          (p) => resolve({ lat: p.coords.latitude, lon: p.coords.longitude }),
          (err) => reject(err),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
        );
      });
      setCoords(coords);
      const line = await reverseGeocode(coords);
      setCityLine(line);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ coords, cityLine: line }));
    } catch (e: any) {
      setError(e?.message || "Failed to get location");
    } finally {
      setLoading(false);
      localStorage.removeItem(PROMPT_FLAG);
    }
  }, []);

  // Auto prompt if requested by previous page
  useEffect(() => {
    const should = localStorage.getItem(PROMPT_FLAG) === "1";
    if (should) requestLocation();
  }, [requestLocation]);

  const value = useMemo<LocationState>(() => ({ coords, cityLine, loading, error, requestLocation }), [coords, cityLine, loading, error, requestLocation]);

  return <LocationCtx.Provider value={value}>{children}</LocationCtx.Provider>;
}

export function useLocationState() {
  const ctx = useContext(LocationCtx);
  if (!ctx) throw new Error("useLocationState must be used within LocationProvider");
  return ctx;
}

export const locationStorage = {
  promptNext() { localStorage.setItem(PROMPT_FLAG, "1"); },
};
