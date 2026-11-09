import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const REGISTROS_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "registros-afiliacion.json"
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nombreCompleto = "",
      dpi = "",
      departamento = "",
      municipio = "",
      telefono = "",
      correo = "",
      modalidad = "Quiero afiliarme",
      comentarios = "",
    } = body;

    const cleanDpi = String(dpi).replace(/\s+/g, "");
    if (String(nombreCompleto).trim().length < 5 || !/^\d{13}$/.test(cleanDpi)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Verifica tu nombre completo y que el DPI contenga exactamente 13 dígitos.",
        },
        { status: 400 }
      );
    }

    const folio = `DIG-28-${Date.now().toString().slice(-6)}`;
    const nuevoRegistro = {
      folio,
      nombreCompleto: String(nombreCompleto).trim(),
      dpi: cleanDpi,
      departamento: String(departamento).trim(),
      municipio: String(municipio).trim(),
      telefono: String(telefono).trim(),
      correo: String(correo).trim(),
      modalidad: String(modalidad).trim(),
      comentarios: String(comentarios).trim(),
      createdAt: new Date().toISOString(),
    };

    let registros: unknown[] = [];
    if (existsSync(REGISTROS_PATH)) {
      try {
        const raw = await fs.readFile(REGISTROS_PATH, "utf8");
        registros = JSON.parse(raw);
      } catch {
        registros = [];
      }
    }

    registros.unshift(nuevoRegistro);
    await fs.writeFile(
      REGISTROS_PATH,
      JSON.stringify(registros, null, 2),
      "utf8"
    );

    return NextResponse.json({
      ok: true,
      folio,
      registro: nuevoRegistro,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Error procesando la solicitud." },
      { status: 500 }
    );
  }
}

