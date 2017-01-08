<%
var entityIdGenerator = utils.entityIdGeneratorOf(e);
var entityIdType = utils.javaTypeOfId(e);
var entityName = utils.entityNameOf(e);
%>package <%= utils.fullDomainPackageOf(e) %>;
<% if (utils.hasEntityAnyAttributeOfType(e, "BigDecimal")) {%>
import java.math.BigDecimal;<% } %><% if (utils.hasEntityAnyAttributeOfType(e, "Timestamp")) {%>
import java.sql.Timestamp;
import java.time.Instant;
<% } %>
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;<% if (entityIdGenerator == null) { %>
import javax.persistence.GenerationType;<% } %>
import javax.persistence.Id;
import javax.persistence.Table;<% if (utils.hasEntityAnyNotNull(e)) { %>
import javax.validation.constraints.NotNull;<% } %>
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
    <% for (var attributeName in e.attributes) {
        var attribute = e.attributes[attributeName];
    %>
    @Column(name = "<%= utils.entityAttributeColumnOf(attribute) %>")<% if (utils.isEntityAttributeRequired(attribute)) { %>
    @NotNull<% } %>
    private <%= utils.entityAttributeTypeOf(attribute) %> <%= utils.entityAttributeNameOf(attribute) %>;
    <% } %>
    public <%= entityIdType %> getId() {
        return id;
    }

    public <%= entityName %> setId(final <%= entityIdType %> id) {
        this.id = id;
        return this;
    }

}
