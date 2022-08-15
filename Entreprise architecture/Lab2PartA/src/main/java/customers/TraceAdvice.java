package customers;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.context.annotation.Configuration;

import java.util.Date;

@Aspect
@Configuration
public class TraceAdvice {
//  a.
//  @After("execution (* customers.EmailSender.sendEmail(..))")
//    public void traceSendMail(JoinPoint joinpoint,String email, String message) {
//      System.out.println(new Date() + " method=" + joinpoint.getSignature().getName());
//  }
//  b.
//  @After("execution (* customers.EmailSender.sendEmail(..)) && args(email,message)")
//  public void traceSendMail(JoinPoint joinpoint,String email, String message) {
//    System.out.println(new Date() + " method=" +
//            joinpoint.getSignature().getName() + " address=" + email + " message= "+message
//    );
//  }
  @After("execution (* customers.EmailSender.sendEmail(..)) && args(email,message)")
  public void traceSendMail(JoinPoint joinpoint,String email, String message) {
    IEmailSender emailSender = (EmailSender) joinpoint.getTarget();
    System.out.println(new Date() + " method=" +
            joinpoint.getSignature().getName() + " address=" + email + " message= "+message
            + " outgoing mail server = " + emailSender.getOutgoingMailServer()
    );
  }
}
