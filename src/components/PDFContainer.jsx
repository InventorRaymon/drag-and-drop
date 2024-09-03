import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Box, Button, Card, CardBody } from '@chakra-ui/react';
import generatePDF from 'react-to-pdf';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { UploadOutlined } from '@ant-design/icons';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Example } from './Example';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export default function PDFContainer() {
    const [scale, setScale] = useState(1.0);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [pdfFile, setPdfFile] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setIsLoading(false);
    }

    const handleFileInput = (event) => {
        const file = event.target.files[0];
        setPdfFile(file);
    };


    return (
        <>
            <Box textAlign={'center'} margin={20}>
                <input type="file" onChange={(e) => handleFileInput(e)} style={{ position: 'relative', zIndex: '3', marginBottom: '20px' }} />
                <DndProvider backend={HTML5Backend}>
                    <div id='print-area' style={{textAlign: 'center'}}>
                        <Example />
                        <Card>
                            <CardBody>
                                <Document
                                    file={pdfFile}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    id='document'
                                >
                                    <Page pageNumber={pageNumber} scale={scale} renderTextLayer={false} />
                                </Document>
                            </CardBody>
                        </Card>
                    </div>
                </DndProvider>
            </Box>
        </>
    )
}