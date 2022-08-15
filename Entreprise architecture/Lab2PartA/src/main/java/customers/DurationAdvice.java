package customers;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StopWatch;

@Aspect
@Configuration
public class DurationAdvice {
    @Around("execution (* customers.CustomerDAO*.*(..))")
    public Object invoke(ProceedingJoinPoint call) throws Throwable {
        StopWatch sw = new StopWatch();
        sw.start(call.getSignature().getName());
        Object retVal = call.proceed();

        sw.stop();
        long totalTime = sw.getLastTaskTimeMillis();
        System.out.println("process execution took "+ totalTime);

        return retVal;
    }
}
