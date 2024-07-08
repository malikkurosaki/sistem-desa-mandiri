'use client'

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals({ searchParams }: { searchParams: any }) {
    const log = searchParams.log;
    useReportWebVitals((metric) => {
        log && console.log(JSON.stringify(metric, null, 4));
    });

    return null;
}
