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
            border-radius:9999px;
            background:${isSelected ? "#FFD600" : "#C81E1E"};
            color:${isSelected ? "#7F1116" : "#FAF6F0"};
            border:2.5px solid #FAF6F0;
            box-shadow:0 8px 18px rgba(127,17,22,0.45);
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
          <div style="font-size:10px;font-family:monospace;font-weight:700;color:#C81E1E;text-transform:uppercase;">
            [${sede.departamento} · ${sede.municipio}]
          </div>
          <div style="font-size:14px;font-weight:800;color:#7F1116;margin:4px 0;">
            ${sede.nombre}
          </div>
          <div style="font-size:12px;color:#374151;margin-bottom:6px;">
            ${sede.direccion}
          </div>
          <div style="font-size:11px;font-weight:600;color:#7F1116;margin-bottom:8px;">
            Coordina: ${sede.coordinador}
          </div>
          <div style="display:flex;gap:6px;">
            <a href="${sede.googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="background:#7F1116;color:#FAF6F0;padding:5px 9px;border-radius:8px;font-size:11px;font-weight:700;text-decoration:none;">Google Maps</a>
            <a href="${sede.whatsapp}" target="_blank" rel="noopener noreferrer" style="background:#C81E1E;color:#ffffff;padding:5px 9px;border-radius:8px;font-size:11px;font-weight:700;text-decoration:none;">WhatsApp</a>
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
      className="w-full h-[420px] sm:h-[520px] rounded-2xl overflow-hidden border border-[#7F1116]/20 bg-[#F2EAE0]"
    />
  );
}

