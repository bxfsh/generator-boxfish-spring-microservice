<%
var entityIdGenerator = utils.entityIdGeneratorOf(e);
var entityIdType = utils.javaTypeOfId(e);
var entityName = utils.entityNameOf(e);
%>package <%= utils.fullDomainPackageOf(e) %>;

import java.sql.Timestamp;
import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;<% if (entityIdGenerator == null) { %>
import javax.persistence.GenerationType;<% } %>
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
<% if (entityIdGenerator != null) { %>
import org.hibernate.annotations.GenericGenerator;
<% } %>
@Entity(name = "<%= utils.tableNameOf(e) %>")
@Table(name = "<%= utils.tableNameOf(e) %>")
public class <%= entityName %> {

    @Id<% if (entityIdGenerator != null) { %>
    @GeneratedValue(generator = "<%= entityIdGenerator.name %>")
    @GenericGenerator(name = "<%= entityIdGenerator.name %>", strategy = "<%= entityIdGenerator.strategy %>")<% } else { %>
    @GeneratedValue(strategy = GenerationType.IDENTITY)<% } %>
    @Column(name = "id")
    private <%= entityIdType %> id;

    @NotNull
    @Column(name = "createdAt")
    private Timestamp createdAt;

    public <%= entityIdType %> getId() {
        return id;
    }

    public <%= entityName %> setId(final <%= entityIdType %> id) {
        this.id = id;
        return this;
    }

    public Instant getCreatedAt() {
        return createdAt.toInstant();
    }

    public <%= entityName %> setId(final Instant createdAt) {
        this.createdAt = Timestamp.from(createdAt);
        return this;
    }
    
}
