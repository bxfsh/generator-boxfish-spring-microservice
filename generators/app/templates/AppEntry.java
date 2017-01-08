package <%= s.metadata.base_package %>;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

import boxfish.commons.web.format.json.EnableBoxfishJsonFormat;
import boxfish.commons.web.identity.tomcat.EnableBoxfishIdentityForTomcat;

@SpringBootApplication
@EnableEurekaClient
@EnableBoxfishIdentityForTomcat
@EnableBoxfishJsonFormat
public class AppEntry {
    public static void main(final String[] args) throws Exception {
        SpringApplication.run(AppEntry.class, args);
    }
}
