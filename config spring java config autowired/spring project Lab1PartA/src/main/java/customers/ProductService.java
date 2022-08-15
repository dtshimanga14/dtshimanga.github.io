package customers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductService implements IProductService{
    @Autowired
    IProductDAO productDAO;
    @Autowired
    IEmailSender emailSender;
    public void addProduct(String name) {
        Product product = new Product(name);
        productDAO.save(product);
        emailSender.sendEmail(null, "Save " + name + " as a new product");
    }
}
