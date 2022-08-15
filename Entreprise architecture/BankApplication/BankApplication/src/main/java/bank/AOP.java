package bank;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.context.annotation.Configuration;


@Aspect
@Configuration
public class AOP {
    @Before("execution (public * *.*.*(..))")
    public void log(JoinPoint joinPoint) {
     String logstring = joinPoint.getSignature().getName();
     java.util.logging.Logger.getLogger("BankLogger").info(logstring + " hello world");
    }
}