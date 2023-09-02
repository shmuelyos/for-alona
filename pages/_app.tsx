// pages/_app.tsx
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { GlobalWorkerOptions } from 'pdfjs-dist';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        GlobalWorkerOptions.workerSrc = '/pdf.worker.js';
    }, []);

    return <Component {...pageProps} />;
}

export default MyApp;
