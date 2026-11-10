"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import type { SedeAfiliacion } from "@/data/sedes-afiliacion";

interface DepartmentMapProps {
  sedes: SedeAfiliacion[];
  selectedSede: SedeAfiliacion | null;
  onSelectSede: (sede: SedeAfiliacion) => void;
}

export default function DepartmentMap({
  sedes,
  selectedSede,
  onSelectSede,
}: DepartmentMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [15.05, -90.45],
      zoom: 7,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · Dignidad Guatemala #28',
      maxZoom: 18,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    sedes.forEach((sede) => {
      const isSelected = selectedSede?.id === sede.id;

      const customIcon = L.divIcon({
        className: "dignidad-editorial-pin",
        html: `
          <div style="
            display:flex;
            align-items:center;
            justify-content:center;
            width:${isSelected ? "42px" : "34px"};
            height:${isSelected ? "42px" : "34px"};
            border-radius:0px;
            background:${isSelected ? "#F5B800" : "#C83226"};
            color:${isSelected ? "#141413" : "#ffffff"};
            border:2px solid #141413;
            box-shadow:0 6px 14px rgba(20,20,19,0.35);
            font-family:monospace;
            font-weight:800;
            font-size:11px;
            transition:all 0.2s ease;
          ">#28</div>
        `,
        iconSize: isSelected ? [42, 42] : [34, 34],
        iconAnchor: isSelected ? [21, 21] : [17, 17],
      });

      const marker = L.marker([sede.coordenadas.lat, sede.coordenadas.lng], {
        icon: customIcon,
        title: `${sede.departamento} — ${sede.nombre}`,
      }).addTo(map);

      marker.bindPopup(`
        <div style="min-width:220px;font-family:system-ui,sans-serif;">
          <div style="font-size:10px;font-family:monospace;font-weight:700;color:#C83226;text-transform:uppercase;">
            [${sede.departamento} · ${sede.municipio}]
          </div>
          <div style="font-size:14px;font-weight:800;color:#141413;margin:4px 0;">
            ${sede.nombre}
          </div>
          <div style="font-size:12px;color:#57534E;margin-bottom:6px;">
            ${sede.direccion}
          </div>
          <div style="font-size:11px;font-weight:600;color:#141413;margin-bottom:8px;">
            Coordina: ${sede.coordinador}
          </div>
          <div style="display:flex;gap:6px;">
            <a href="${sede.googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="background:#141413;color:#FAF8F5;padding:6px 10px;border-radius:0px;font-size:11px;font-weight:700;text-decoration:none;font-family:monospace;text-transform:uppercase;">Google Maps</a>
            <a href="${sede.whatsapp}" target="_blank" rel="noopener noreferrer" style="background:#C83226;color:#ffffff;padding:6px 10px;border-radius:0px;font-size:11px;font-weight:700;text-decoration:none;font-family:monospace;text-transform:uppercase;">WhatsApp</a>
          </div>
        </div>
      `);

      marker.on("click", () => {
        onSelectSede(sede);
      });

      markersRef.current.set(sede.id, marker);
    });
  }, [sedes, selectedSede, onSelectSede]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (selectedSede) {
      map.flyTo([selectedSede.coordenadas.lat, selectedSede.coordenadas.lng], 12, {
        duration: 0.85,
      });
      const marker = markersRef.current.get(selectedSede.id);
      if (marker) {
        marker.openPopup();
      }
    } else if (sedes.length > 0) {
      const bounds = L.latLngBounds(
        sedes.map((s) => [s.coordenadas.lat, s.coordenadas.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [36, 36], maxZoom: 11 });
    }
  }, [selectedSede, sedes]);

  return (
    <div
      ref={containerRef}
      aria-label="Mapa territorial de sedes departamentales de Dignidad Guatemala"
      className="w-full h-[420px] sm:h-[520px] rounded-none overflow-hidden border border-[#141413] bg-[#FAF8F5]"
    />
  );
}

