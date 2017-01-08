package <%= s.metadata.base_package %>;

import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

import boxfish.commons.web.format.json.EnableBoxfishJsonFormat;
import boxfish.commons.web.identity.tomcat.EnableBoxfishIdentityForTomcat;

public class AppEntryTest {

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
