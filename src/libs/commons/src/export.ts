export namespace Ex {
  export enum ExportFormat {
    JSON = 'json',
    CSV = 'csv',
    PLAIN = 'plain',
  }

  interface FormatInfo {
    mimeType: string;
    extension: string;
    uti: string;
  }

  export const formatInfo: Record<ExportFormat, FormatInfo> = {
    csv: { mimeType: 'text/csv', extension: 'csv', uti: 'public.comma-separated-values-text' },
    plain: { mimeType: 'text/plain', extension: 'txt', uti: 'public.plain-text' },
    json: { mimeType: 'application/json', extension: 'json', uti: 'public.json' },
  };
}
