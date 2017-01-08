package <%= s.metadata.base_package %>;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.lang.reflect.Method;

import org.junit.Before;
import org.junit.Test;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import boxfish.commons.web.format.json.EnableBoxfishJsonFormat;
import boxfish.commons.web.identity.tomcat.EnableBoxfishIdentityForTomcat;

public class AppEntryTest {

    private AppEntry app;
    private Class<?> appClass;

    @Before
    public void setup() {
        appClass = AppEntry.class;
    }

    @Test
    public void classAnnotations() {
        assertTrue(appClass.isAnnotationPresent(SpringBootApplication.class));
        assertTrue(appClass.isAnnotationPresent(EnableEurekaClient.class));
        assertTrue(appClass.isAnnotationPresent(EnableBoxfishIdentityForTomcat.class));
        assertTrue(appClass.isAnnotationPresent(EnableBoxfishJsonFormat.class));
    }
}
