package com.dobri.springboot.invoice;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author Dobrin Dobrev
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table( name = "invoice")
public class InvoiceItem {
    private String name;
    private double price;

}