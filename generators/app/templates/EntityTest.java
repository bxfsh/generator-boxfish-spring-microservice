<%
var entityIdGenerator = utils.entityIdGeneratorOf(e);
var entityIdType = utils.javaTypeOfId(e);
var entityIdRawType = utils.rawTypeOfId(e);
var entityName = utils.entityNameOf(e);
%>package <%= utils.fullDomainPackageOf(e) %>;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
<% if (utils.hasEntityAnyAttributeOfType(e, "BigDecimal")) {%>
import java.math.BigDecimal;<% } %><% if (utils.hasEntityAnyAttributeOfType(e, "Timestamp")) {%>
import java.time.Instant;
<% } %>
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;<% if (utils.hasEntityAnyNotNull(e)) { %>
import javax.validation.constraints.NotNull;<% } %>
<% if (entityIdGenerator != null) { %>
import org.hibernate.annotations.GenericGenerator;<% } %>
import org.junit.Before;
import org.junit.Test;

public class <%= entityName %>Test {

    private Class<?> entityClass;
    private <%= entityName %> entity;

    @Before
    public void setup() {
        entity = new <%= entityName %>();
        entityClass = entity.getClass();
    }

    @Test
    public void classAnnotations() throws Exception {
        assertTrue(entityClass.isAnnotationPresent(Entity.class));
        assertEquals("<%= utils.tableNameOf(e) %>", entityClass.getAnnotation(Entity.class).name());

        assertTrue(entityClass.isAnnotationPresent(Table.class));
        assertEquals("<%= utils.tableNameOf(e) %>", entityClass.getAnnotation(Table.class).name());
    }

    @Test
    public void id() throws Exception {
        assertTrue(entityClass.getDeclaredField("id").isAnnotationPresent(Id.class));
        assertTrue(entityClass.getDeclaredField("id").isAnnotationPresent(GeneratedValue.class));<% if (entityIdGenerator != null) { %>
        assertTrue(entityClass.getDeclaredField("id").isAnnotationPresent(GenericGenerator.class));<% } %>
        assertTrue(entityClass.getDeclaredField("id").isAnnotationPresent(Column.class));
        assertEquals("id", entityClass.getDeclaredField("id").getAnnotation(Column.class).name());

        assertNull(entity.getId());
        final <%= entityIdType %> expected = <%- mocks.wrappedFor(entityIdRawType) %>;
        entity.setId(expected);
        assertEquals(expected, entity.getId());
    }

    <% for (var attributeName in e.attributes) {
        var attribute = e.attributes[attributeName];
    %>
    @Test
    public void <%= utils.entityAttributeNameOf(attribute) %>() throws Exception {
        <% if (utils.isEntityAttributeRequired(attribute)) { %>assertTrue(entityClass.getDeclaredField("<%= utils.entityAttributeNameOf(attribute) %>").isAnnotationPresent(NotNull.class));
        <% } %>assertTrue(entityClass.getDeclaredField("<%= utils.entityAttributeNameOf(attribute) %>").isAnnotationPresent(Column.class));
        assertEquals("<%= utils.entityAttributeColumnOf(attribute) %>", entityClass.getDeclaredField("<%= utils.entityAttributeNameOf(attribute) %>").getAnnotation(Column.class).name());

        assertNull(entity.<%= utils.entityGetterNameOf(attribute) %>());
        final <%= utils.javaTypeOf(attribute.rawType) %> expected = <%- mocks.wrappedFor(attribute.rawType) %>;
        entity.<%= utils.entitySetterNameOf(attribute) %>(expected);
        assertEquals(expected, entity.<%= utils.entityGetterNameOf(attribute) %>());
    }
    <% } %>
}
