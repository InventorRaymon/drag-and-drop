import React from 'react'
import ReactDOM from 'react-dom/client'
import PDFContainer from './components/PDFContainer.jsx'
import './index.css'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';
import { Example } from './components/Example.jsx';
import generatePDF, { Resolution } from 'react-to-pdf';
import { Button, Box } from '@chakra-ui/react';
import { ChakraProvider } from "@chakra-ui/react";


const dateToday = new Date();
let timeToday = dateToday.getTime();

const options = {
  filename: `downloaded-pdf-${timeToday}.pdf`,
  page: {
    DetailedMargin: top,
    format: 'letter',
    orientation: 'portrait',
  },
  // method: 'open',
  resolution: Resolution.HIGH
}

const getTargetElement = () => document.getElementById("print-area");

const downloadPdf = () => generatePDF(getTargetElement, options);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      {/* <DndProvider backend={HTML5Backend}> */}
        {/* <div id='print-area'> */}
          {/* <Example /> */}
          <PDFContainer />
        {/* </div> */}
        <Box display="flex" justifyContent="center">
          <Button onClick={downloadPdf} zIndex={2} colorScheme='teal'>Download PDF</Button>
        </Box>
      {/* </DndProvider> */}
    </ChakraProvider>
  </React.StrictMode>,
)
