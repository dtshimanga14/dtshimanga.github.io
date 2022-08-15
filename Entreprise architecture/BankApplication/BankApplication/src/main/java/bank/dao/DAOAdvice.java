package bank.dao;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StopWatch;

@Aspect
@Configuration
public class DAOAdvice {
    @After("execution ( * bank.dao.AccountDAO.*(..))")
    public void logAccountDAO(JoinPoint joinPoint) {
        String logstring = joinPoint.getSignature().getName();
        java.util.logging.Logger.getLogger("AccountDAO").info(logstring);
    }
    @After("execution ( * bank.jms.JMSSender.*(..))")
    public void logJMSSender(JoinPoint joinPoint) {
        String logstring = joinPoint.getSignature().getName();
        java.util.logging.Logger.getLogger("JMSSender").info(logstring);
    }
    @Around("execution ( * bank.service.*.*(..))")
    public Object invoke(ProceedingJoinPoint call) throws Throwable {
        StopWatch sw = new StopWatch();
        sw.start(call.getSignature().getName());
        Object retVal = call.proceed();

        sw.stop();
        long totalTime = sw.getLastTaskTimeMillis();
        System.out.println(" process execution took "+ totalTime);

        return retVal;
    }
}