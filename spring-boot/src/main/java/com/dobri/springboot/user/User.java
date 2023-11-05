package com.dobri.springboot.user;

import com.dobri.springboot.address.Address;
import com.dobri.springboot.shoppingCart.ShoppingCart;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;
    private String firstName;
    private String lastName;
    @NaturalId(mutable = true)
    private String email;
    private String password;
    private String userRole;
    private Boolean isEnabled = false;

    public User(Long customerId) {
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore  // This annotation prevents the circular reference
    private List<Address> addresses;

//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
//    private ShoppingCart shoppingCart;

}
