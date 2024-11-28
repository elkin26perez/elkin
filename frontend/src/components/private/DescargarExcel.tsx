/* eslint-disable react-refresh/only-export-components */
import { customAxiosAdmin } from "@/interceptor/axios.interceptor";
import xlsx, { IContent, IJsonSheet } from "json-as-xlsx";

export function xls(data: IContent[]) {
  const columns: IJsonSheet[] = [
    {
      sheet: "Solicitudes",
      columns: [
        { label: "Solicitud ID", value: "_id" },
        { label: "Tipo de Trabajo", value: "tipotrabajo" },
        { label: "Duración (Horas)", value: "duraciontrabajo" },
        { label: "Riesgo", value: "riesgotrabajo" },
        { label: "Archivo Adjunto", value: "file" },
        { label: "Urgencia", value: "urgencia" },
        { label: "Estatus", value: "estatus" },
        { label: "Fecha de Creación", value: "fecha_creacion" },
      ],
      content: data,
    },
  ];

  const settings = {
    fileName: "Reporte_Solicitudes",
    extraLength: 3,
    writeOptions: {}, 
  };

  xlsx(columns, settings);
}

const DownloadExcel = () => {
  async function getDataSolicitudes() {
    try {
      const request = await customAxiosAdmin.get("admin/solicitudes", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const solicitudes = request.data.data;

      if (solicitudes.length > 0) {
        xls(solicitudes);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  }

  return (
    <button
      onClick={getDataSolicitudes}
      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
    >
      Descargar Excel
    </button>
  );
};

export default DownloadExcel;
