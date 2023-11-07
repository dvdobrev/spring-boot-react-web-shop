package com.dobri.springboot.invoice;

import com.dobri.springboot.address.Address;
import com.dobri.springboot.address.AddressService;
import com.dobri.springboot.items.Items;
import com.dobri.springboot.shoppingCart.ShoppingCart;
import com.dobri.springboot.user.User;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.border.Border;
import com.itextpdf.layout.border.SolidBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.net.MalformedURLException;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class CreateInvoice {

    @Autowired
    AddressService addressService;

    public void createInvoice(List<ShoppingCart> shoppingCart, Address address) throws FileNotFoundException, MalformedURLException, SQLException {
        
        System.out.println("+=+=+==+=+=+=+=+=+=+=+=+ In Printing Invoice");

        User user = shoppingCart.get(0).getUser();
        Long customerId = shoppingCart.get(0).getUser().getCustomerId();

        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDate currentDate = LocalDate.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        String orderDate = currentDateTime.format(formatter);

        String formattedOrderDate = orderDate.replace(":", "_");
        String path = "Web Shop Rechnung von " + formattedOrderDate + ".pdf";

        PdfWriter pdfWriter = new PdfWriter(path);
        PdfDocument pdfDocument = new PdfDocument(pdfWriter);
        pdfDocument.setDefaultPageSize(PageSize.A4);

        Document document = new Document(pdfDocument);

        float threecol = 190f;
        float[] threeColumnWidth = {threecol, threecol, threecol};
        float twocol = 285f;
        float[] twocolumnWidth = {twocol, twocol};
        float[] fullwidth = {threecol * 3};

        Table emptyLine = new Table(fullwidth);
        emptyLine.addCell(new Cell().setHeight(4f).setBorder(Border.NO_BORDER));


//---------Head Tables---------------------------------------------------------

//----------------Create logoImage------------------------------
//        String logoPath = "Images/Logo.png";
//        String logoPath = "Logo.png";
//        ImageData imageData = ImageDataFactory.create(logoPath);
//        Image logoImage = new Image(imageData);

        //Set the position of the logoImage
        float x = pdfDocument.getDefaultPageSize().getWidth();
        float y = pdfDocument.getDefaultPageSize().getHeight();
//        logoImage.setHeight(70f);
//        logoImage.setWidth(80f);
//        logoImage.setFixedPosition(x - 558, y - 106);
//        logoImage.setOpacity(0.1f);

        Table tableHead1 = new Table(twocolumnWidth).setHeight(70f);

//        tableHead1.addCell(new Cell().add(logoImage).setBorder(Border.NO_BORDER));
        tableHead1.addCell(new Cell().add("Rechnung").setBorder(Border.NO_BORDER).setFontSize(30f).setBold()).setTextAlignment(TextAlignment.RIGHT);

        document.add(tableHead1);

//------------Personal and Order Info Table------------------------
        Table tableHead2 = new Table(new float[]{340f, 245f});

        Table tableHead2_2_1 = new Table(new float[]{103f});
        Table tableHead2_2_2 = new Table(new float[]{122f});

        tableHead2_2_1.addCell(new Cell()
                .add(
                    "Bestellung von:" +
                    "\nRechnungsdatum" +
//                    "\nBestell-Nr.:" +
                    "\nKunden-Nr.:"
                    )
                .setBold()
                .setBorder(Border.NO_BORDER)
                .setTextAlignment(TextAlignment.LEFT)
                .setFontSize(10f));
        tableHead2_2_2.addCell(new Cell()
                .add(
                        orderDate +
                    "\n" + orderDate +
//                    "\n" + orderId +
                    "\n" + customerId
                    )
                .setBorder(Border.NO_BORDER)
                .setTextAlignment(TextAlignment.RIGHT)
                .setFontSize(10f));

        Table tableHead2_2 = new Table(new float[]{103f, 122f});

        String firstName = user.getFirstName();
        String lastName = user.getLastName();
//        String salutaiton = "Herr";


        String street = address.getStreet();
        String streetNumber = address.getStreetNumber();
        Integer postCode = address.getPostCode();
        String city = address.getCity();

//        String deliverySalutaiton = "Herr";
        String deliveryFirstname = firstName;
        String deliveryLastname = lastName;

        String deliveryStreet = street;
        String deliveryStreetNumber = streetNumber;

        Integer deliveryPostCode = postCode;
        String deliveryCity = city;
        tableHead2_2.addCell(new Cell().add(tableHead2_2_1).setBorder(Border.NO_BORDER));
        tableHead2_2.addCell(new Cell().add(tableHead2_2_2).setBorder(Border.NO_BORDER));

        tableHead2.addCell(new Cell()
//                        .add(salutaiton)
                        .add(firstName + " " + lastName)
                        .add(street + " " + streetNumber)
                        .add(postCode + ", " + city)
                        .setWidth(twocol / 2)
                        .setMarginTop(10f)
                        .setBorder(Border.NO_BORDER));
        tableHead2.addCell(new Cell().add(tableHead2_2).setBorder(Border.NO_BORDER));

        document.add(tableHead2);

//---------Main Tables----------------------------------------

        String textHeader = "Vielen Dank für Ihre Bestellung!";
        String textBody = "Liebe/r " + lastName + "," +
//                salutaiton + " " + lastName + "," +
                "\n" +
                "\nwir danken Ihnen für Ihr Interesse an unserem Sortiment und wünschnen Ihnen viel Spaß mit Ihrem Einkauf!" +
                "\nEine detaillierte Zusammenfassung Ihrer Rechnung entnehmen Sie bitte der folgenden Übersicht";
        String textFoot = "\nLieferung an:" +
//                "\n" + deliverySalutaiton +
                "\n" + deliveryFirstname + " " + deliveryLastname +
                "\n" + deliveryStreet + " " + deliveryStreetNumber +
                "\n" + deliveryPostCode + ", " + deliveryCity;

//---------------Text tables------------------------------------------
        Table tableMain1 = new Table(fullwidth);
        tableMain1.addCell(new Cell().add(textHeader).setBold().setBorder(Border.NO_BORDER));
        document.add(tableMain1);

        Table tableMain2 = new Table(fullwidth);
        tableMain2.addCell(new Cell().add(textBody).setBorder(Border.NO_BORDER));
        document.add(tableMain2);

        Table tableMain3 = new Table(fullwidth);
        tableMain3.addCell(new Cell()
                .add(textFoot).setBorder(Border.NO_BORDER));
        document.add(tableMain3);

        document.add(emptyLine);
        document.add(emptyLine);

//--------------Scheme table -----------------------------------------------

        Table scheme1 = new Table(new float[]{110, 155, 80, 80, 80, 80}); //--> the size of each cell
        scheme1.addCell(new Cell().add("Artikelnummer").setBold().setBorder(new SolidBorder(1)));
        scheme1.addCell(new Cell().add("Artikelbezeichnung").setBold().setBorder(new SolidBorder(1)));
        scheme1.addCell(new Cell().add("USt%").setBold().setTextAlignment(TextAlignment.RIGHT).setBorder(new SolidBorder(1)));
        scheme1.addCell(new Cell().add("Menge").setBold().setTextAlignment(TextAlignment.CENTER).setBorder(new SolidBorder(1)));
        scheme1.addCell(new Cell().add("Einzelpreis\nEUR").setTextAlignment(TextAlignment.RIGHT).setBold().setBorder(new SolidBorder(1)));
        scheme1.addCell(new Cell().add("Gesamtpreis\nEUR").setTextAlignment(TextAlignment.RIGHT).setBold().setBorder(new SolidBorder(1)));
        document.add(scheme1);

        Table scheme2 = new Table(new float[]{118, 156, 73, 77, 84, 85}); //--> the size of each cell

        double allProductsTotalPrice = 0.0;

        for (ShoppingCart cart : shoppingCart) {

            Items item = cart.getItem();

            String duty = "19";
            String itemId = String.valueOf(item.getItemId());
            String type = item.getType();

            int quantity = cart.getQuantity();
            double price = item.getPrice();
            double itemTotalPrice = quantity * price;
            allProductsTotalPrice += itemTotalPrice;


            scheme2.addCell(new Cell().add(itemId))
                    .setBorder(Border.NO_BORDER)
                    .setBorderLeft(new SolidBorder(1));
            scheme2.addCell(new Cell().add(String.valueOf(type))
                    .setBorder(Border.NO_BORDER));
            scheme2.addCell(new Cell().add(duty + "%")
                    .setBorder(Border.NO_BORDER)
                    .setTextAlignment(TextAlignment.RIGHT));
            scheme2.addCell(new Cell().add(String.valueOf(quantity)))
                    .setBorder(Border.NO_BORDER)
                    .setTextAlignment(TextAlignment.CENTER);
            scheme2.addCell(new Cell().add(String.format("%.2f", price))

                    .setBorder(Border.NO_BORDER)
                    .setTextAlignment(TextAlignment.RIGHT));
            scheme2.addCell(new Cell()
                    .add(String.format("%.2f", itemTotalPrice))
                    .setTextAlignment(TextAlignment.RIGHT)
                    .setBorder(Border.NO_BORDER)
                    .setBorderRight(new SolidBorder(1)));
        }
        document.add(scheme2);

        Table scheme3 = new Table(twocolumnWidth);
        scheme3.addCell(new Cell().add("Summe:").setBold()
                        .setBorder(Border.NO_BORDER)
                        .setBorderBottom(new SolidBorder(1)))
                .setBorderLeft(new SolidBorder(1))
                .setBorderTop(new SolidBorder(1));
        scheme3.addCell(new Cell()
                        .add(String.format("%.2f", allProductsTotalPrice))
                        .setTextAlignment(TextAlignment.RIGHT)
                        .setBorder(Border.NO_BORDER)
                        .setBorderBottom(new SolidBorder(1)))
                .setBorderRight(new SolidBorder(1))
                .setBorderTop(new SolidBorder(1));

        document.add(scheme3);

        Table scheme4 = new Table(new float[]{120, 465});

        Table scheme4Nested1 = new Table(threeColumnWidth);
        String text1Scheme4Nested1 = "Zwischensumme\n(netto) 19%";
        String text2Scheme4Nested1 = "Zuzüglich USt\n19%";
        String text3Scheme4Nested1 = "Gesamtsumme\n(Inkl.USt)";

        scheme4Nested1.addCell(new Cell().add(text1Scheme4Nested1)
                .setBorder(Border.NO_BORDER)
                .setBorderBottom(new SolidBorder(1)));
        scheme4Nested1.addCell(new Cell()
                .add(text2Scheme4Nested1)
                .setBorder(Border.NO_BORDER)
                .setBorderBottom(new SolidBorder(1)));
        scheme4Nested1.addCell(new Cell()
                .add(text3Scheme4Nested1)
                .setBorder(Border.NO_BORDER)
                .setBorderBottom(new SolidBorder(1))
                .setTextAlignment(TextAlignment.RIGHT));

        Table scheme4Nested2 = new Table(threeColumnWidth);
        double priceWithoutDuty = allProductsTotalPrice / 1.19;
        double duty = allProductsTotalPrice - priceWithoutDuty;

        scheme4Nested2.addCell(new Cell().add("EUR" + " " + String.format("%.2f", priceWithoutDuty))
                .setBorder(Border.NO_BORDER)
                .setBorderBottom(new SolidBorder(1)));
        scheme4Nested2.addCell(new Cell().add("EUR" + " " + String.format("%.2f", duty)
                )
                .setBorder(Border.NO_BORDER)
                .setBorderBottom(new SolidBorder(1)));
        scheme4Nested2.addCell(new Cell().add("EUR" + " " + String.format("%.2f", allProductsTotalPrice))
                .setBorder(Border.NO_BORDER)
                .setBorderBottom(new SolidBorder(1))
                .setTextAlignment(TextAlignment.RIGHT));

        Table scheme4Nested3 = new Table(twocolumnWidth);
//        String paymentMethod = GetPaymentMethodById.getPaymentMethodById(order.getPayment_method_id()).getSort();
//        String textScheme4Nested3 = "Bereits bezahlt per " + paymentMethod + ":";
        scheme4Nested3.addCell(new Cell()
//                .add(textScheme4Nested3)
                .setBorder(Border.NO_BORDER));
        scheme4Nested3.addCell(new Cell()
                .add("EUR" + " " + String.format("%.2f", allProductsTotalPrice)
                )
                .setBorder(Border.NO_BORDER)
                .setTextAlignment(TextAlignment.RIGHT));

        scheme4.addCell(new Cell()
                        .setBorder(Border.NO_BORDER))
                .setBorderTop(new SolidBorder(1));

        scheme4.addCell(new Cell()
                .setBorder(Border.NO_BORDER)
                .setBorderRight(new SolidBorder(1))
                .setBorderLeft(new SolidBorder(1))
                .setBorderBottom(new SolidBorder(1))
                .add(scheme4Nested1)
                .add(scheme4Nested2)
                .add(scheme4Nested3));

        document.add(scheme4);

//---------Foot Tables-----------------------------------------

        Table tableFoot1 = new Table(fullwidth);
//        String textFoot11 = "Der Rechnungsbetrag wurde per " + paymentMethod + " beglichen";
        String textFoot12 = "Mit freundlichen Grüßen\nIhr SHOP-Team";
        tableFoot1.addCell(new Cell()
//                        .add(textFoot11)
                        .add(textFoot12)
                        .setBorder(Border.NO_BORDER))
                .setMarginTop(18f);

        document.add(tableFoot1);
        document.add(emptyLine);
        document.add(emptyLine);
        document.add(emptyLine);

        Table tableFoot2 = new Table(fullwidth);
        String textFoot2 = "Kontakt: ";
        String textFoot2Phone = "Telefon: +49 123 456 789 ; ";
        String textFoot2Email = "Email service@shop.de";

        tableFoot2.addCell(new Cell().add(textFoot2 + textFoot2Phone + textFoot2Email).setFontSize(10f).setBorder(Border.NO_BORDER));
        document.add(tableFoot2);

        document.close();

        System.out.println("pdf created");
        System.out.println(path);
    }
}