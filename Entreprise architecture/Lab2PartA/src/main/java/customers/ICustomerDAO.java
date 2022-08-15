package customers;


import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

@Repository
@Profile("developpment")
public interface ICustomerDAO {
	void save(Customer customer) ;
}
