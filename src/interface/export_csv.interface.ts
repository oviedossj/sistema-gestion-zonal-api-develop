export interface IExportar_Csv<T> {
  create_CSV_Report(data:T[]): Promise<string>;
  }

  // Define la interfaz para los datos del reporte
export interface ICaseReport {
  caseNumber: string;               // Número de caso
  entryDate: string;                // Fecha de ingreso
  reporterName: string;             // Nombre del reportante
  dni: string;                      // DNI
  area: string;                     // Área
  type: string;                     // Tipo
  status: string;                   // Estado del caso
  urgencyLevel: string;             // Nivel de urgencia
  entryChannel: string;             // Canal de ingreso
  geoZone: string;                  // Zona geográfica
  street: string;                   // Ubicación del reporte: Calle
  streetNumber: string;             // Ubicación del reporte: Altura
  locality: string;                 // Ubicación del reporte: Localidad
  neighborhood: string;             // Ubicación del reporte: Barrio
  lastModification: string;         // Fecha de última modificación del trámite
  resolutionDeadline: string;       // Plazo de resolución
  operator: string;                 // Operador que realizó la carga
}

    // const data : ICaseReport[] = [
    //   {
    //V     "caseNumber": "12345",
    //V     "entryDate": "2024-06-23",
    //pendiente     "reporterName": "Juan Pérez",
    //pendiente     "dni": "12345678",
    //pendiente     "area": "Soporte Técnico",
    //V     "type": "Consultas",
    //V     "status": "Abierto",   
    //V     "urgencyLevel": "Alta",
    //Proximamente "entryChannel": "Teléfono",
    //v    "geoZone": "Norte",
    //V     "street": "Av. Siempre Viva",
    //V     "streetNumber": "742",
    //V     "locality": "Springfield",
    //V     "neighborhood": "Centro",
    //V     "lastModification": "2024-06-23",
    //Proximamente "resolutionDeadline": "Vigente",
    //pendiente     "operator": "María López"
    //   }
    // ]
    // return await new CSVReportGenerator().create_CSV_Report(data);