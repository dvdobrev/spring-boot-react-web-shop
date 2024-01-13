package com.dobri.springboot.invoice;

/**
 * @author Dobrin Dobrev
 */


import com.dobri.springboot.Constants;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@CrossOrigin(origins = Constants.REACT_URL)
@RestController
public class PdfController {

    @GetMapping("/download/file")
    public String getPdfFileName() {

        String pdfDirectory = "src/main/java/com/dobri/springboot/invoice/pdf/";

        File directory = new File(pdfDirectory);
        File[] files = directory.listFiles();

        if (files != null && files.length > 0) {
            return files[0].getName();
        } else {
            return null;
        }
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<InputStreamResource> downloadPdf(@PathVariable String fileName) throws IOException {
        // Pfade und Dateinamen anpassen
        String pdfDirectory = "src/main/java/com/dobri/springboot/invoice/pdf/";
        String pdfPath = pdfDirectory + fileName;

        InputStream pdfStream = new FileInputStream(pdfPath);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.add("Content-Disposition", "inline; filename=" + fileName);

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(new InputStreamResource(pdfStream));
    }
}