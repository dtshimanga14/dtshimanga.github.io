package customers;


import org.springframework.stereotype.Service;

@Service("customerService")
public interface ICustomerService {
	void addCustomer(String name, String email, String street,String city, String zip);
}
