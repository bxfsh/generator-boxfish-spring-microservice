package <%= utils.fullDomainPackageOf(e) %>;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.GenericGenerator;

@Entity(name = "<%= utils.tableNameOf(e) %>")
@Table(name = "<%= utils.tableNameOf(e) %>")
<% var entityName = utils.entityNameOf(e) %>public class <%= entityName %> {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "id")
    private String id;

    public String getId() {
        return id;
    }

    public <%= entityName %> setId(String id) {
        this.id = id;
        return this;
    }
}
