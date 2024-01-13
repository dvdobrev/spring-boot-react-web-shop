package com.dobri.springboot.invoice;

import com.dobri.springboot.address.Address;
import com.dobri.springboot.address.AddressService;
import com.dobri.springboot.shoppingCart.ShoppingCart;
import com.dobri.springboot.shoppingCart.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;
import java.net.MalformedURLException;
import java.sql.SQLException;
import java.util.List;

@RestController
public class InvoiceController {

    @Autowired
    private PdfInvoiceService pdfInvoiceService;

    @Autowired
    ShoppingCartService shoppingCartService;


    @Autowired
    AddressService addressService;


    @PostMapping("/invoice")
    public ResponseEntity<String> generateInvoiceAndSaveToDatabase(@RequestBody List <ShoppingCart> shoppingCartList) throws MalformedURLException, SQLException, FileNotFoundException {
        System.out.println("++++++++++++++++++++++++++++++Invoice");
        
        System.out.println("shoppingCartList: " + shoppingCartList);

        Long customerId = shoppingCartList.get(0).getUser().getCustomerId();

        Address address = addressService.findAddressesByCustomerId(customerId).get(0);

        CreateInvoice createInvoice = new CreateInvoice();
        createInvoice.createInvoice(shoppingCartList, address);


        try {
            for (ShoppingCart shoppingCart : shoppingCartList) {
                Long shoppingCartId = shoppingCart.getShoppingCartId();
                shoppingCartService.deleteShoppingCartById(shoppingCartId);
            }
            return ResponseEntity.ok("ShoppingCart items deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting ShoppingCart items: " + e.getMessage());
        }


//        for (ShoppingCart cart : shoppingCart) {
//            System.out.println(cart.getShoppingCartId());
//            System.out.println(cart.getItem().getPrice());
//        }
        
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
