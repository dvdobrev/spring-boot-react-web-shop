package com.dobri.springboot.invoice;

import com.dobri.springboot.address.Address;
import com.dobri.springboot.address.AddressService;
import com.dobri.springboot.invoice.InvoiceItem;
import com.dobri.springboot.invoice.PdfInvoiceService;
import com.dobri.springboot.shoppingCart.ShoppingCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class InvoiceController {

    @Autowired
    private PdfInvoiceService pdfInvoiceService;

    @Autowired
    AddressService addressService;

    @PostMapping("/invoice")
    public void generateInvoiceAndSaveToDatabase(@RequestBody List <ShoppingCart> shoppingCart) throws MalformedURLException, SQLException, FileNotFoundException {
        System.out.println("++++++++++++++++++++++++++++++Invoice");
        
        System.out.println("SHoppingCart: " + shoppingCart);

        Long customerId = shoppingCart.get(0).getUser().getCustomerId();

        Address address = addressService.findAddressesByCustomerId(customerId).get(0);

        CreateInvoice createInvoice = new CreateInvoice();
        createInvoice.createInvoice(shoppingCart, address);

        for (ShoppingCart cart : shoppingCart) {
            System.out.println(cart.getShoppingCartId());
            System.out.println(cart.getItem().getPrice());
        }
        
//        List<InvoiceItem> items = new ArrayList<>();
//        items.add(new InvoiceItem("Item 1", 10.0));
//        items.add(new InvoiceItem("Item 2", 15.0));
//
//        String buyerName = "John Doe";
//        String buyerAddress = "123 Main St, City, Country";
//        double totalPrice = items.stream().mapToDouble(InvoiceItem::getPrice).sum();

//        pdfInvoiceService.generateInvoiceAndSaveToDatabase(buyerName, buyerAddress, items, totalPrice);
    }
}
