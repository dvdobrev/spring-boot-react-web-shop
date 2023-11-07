package com.dobri.springboot.invoice;

/**
 * @author Dobrin Dobrev
 */


import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class PdfInvoiceService {

    public void generateInvoice(
            String buyerName,
            String buyerAddress,
            List<InvoiceItem> items,
            double totalPrice,
            String filePath // New parameter for file path
    ) throws IOException {
        PDDocument document = new PDDocument();
        PDPage page = new PDPage(PDRectangle.A4);
        document.addPage(page);
        try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
            // ... (same as before)

            document.save(filePath); // Save the PDF to the specified file path
            document.close();
        }
    }
}