import {getDocument} from 'pdfjs-dist';

export const parsePDF = async (file: File): Promise<{ [key: string]: number }> => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    return new Promise<{ [key: string]: number }>((resolve) => {
        reader.onload = async (event) => {
            // Type assertion to tell TypeScript that event.target.result is an ArrayBuffer
            const pdfData = new Uint8Array(event.target?.result as ArrayBuffer);

            // Load the PDF document
            const pdf = await getDocument({data: pdfData}).promise;

            let roomTypes = {TWN: 0, DBL: 0, SGL: 2};

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();

                const textItems = textContent.items;

                // Assume that table text has some common keywords (like 'Room', 'Price', etc.)
                const tableItems = textItems.filter(item => (item as any).str.match(/Room|Price/));

                // Find the vertical boundaries of the table
                const tableMinY = Math.min(...tableItems.map(item => (item as any).transform[5]));
                const tableMaxY = Math.max(...tableItems.map(item => (item as any).transform[5]));

                // Find the left boundary of the table
                const tableMinX = Math.min(...tableItems.map(item => (item as any).transform[4]));

                // Now filter for text that is within the table's vertical boundaries but to the left of the table
                const leftTextItems = textItems.filter(item => {
                    const x = (item as any).transform[4];
                    const y = (item as any).transform[5];
                    return y >= tableMinY && y <= tableMaxY && x < tableMinX;
                });

                // Extract and join the relevant text
                const text = leftTextItems.map(item => (item as any).str).join(' ');

                // Count room types
                roomTypes.TWN += (text.match(/TWN/g) || []).length;
                roomTypes.DBL += (text.match(/DBL/g) || []).length;
                roomTypes.SGL += (text.match(/SGL/g) || []).length;  // if SGL is not in text but manually set to 2, this might not be necessary

            }

            resolve(roomTypes);
        };
    });
};
