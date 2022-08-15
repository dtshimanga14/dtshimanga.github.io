package config;

import customers.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    public CustomerService customerService() {
        CustomerService customerService = new CustomerService();
        customerService.setCustomerDAO(customerDAO());
        customerService.setEmailSender(emailSender());
        return customerService;
    }
    @Bean
    public IEmailSender emailSender() {
        IEmailSender emailSender = new EmailSender();
        return emailSender;
    }
    @Bean
    public ICustomerDAO customerDAO() {
        ICustomerDAO customerDAO = new CustomerDAO();
        return customerDAO;
    }
}