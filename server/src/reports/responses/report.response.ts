interface ReportResponse {
    report_data: unknown[];
    pagination: {
        total: number;
        page: number;
        total_pages: number;
    }
}