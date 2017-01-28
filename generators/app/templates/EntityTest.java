<%
var entityIdGenerator = utils.entityIdGeneratorOf(e);
var entityIdType = utils.javaTypeOfId(e);
var entityName = utils.entityNameOf(e);
%>package <%= utils.fullDomainPackageOf(e) %>;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
<% if (entityIdGenerator != null) { %>
import org.hibernate.annotations.GenericGenerator;<% } %>
import org.junit.Before;
import org.junit.Test;

public class <%= entityName %>Test {

    private Class<?> entityClass;
    private <%= entityName %> entity;

    @Before
    public void setup() {
        entityClass = <%= entityName %>.class;
        entity = new <%= entityName %>();
    }

    @Test
    public void entity() throws Exception {
        assertTrue(entityClass.isAnnotationPresent(Entity.class));
        assertTrue(entityClass.isAnnotationPresent(Table.class));
    }

    @Test
    public void id() throws Exception {
        assertTrue(entityClass.getField("id").isAnnotationPresent(Id.class));
        assertTrue(entityClass.getField("id").isAnnotationPresent(GeneratedValue.class));<% if (entityIdGenerator != null) { %>
        assertTrue(entityClass.getField("id").isAnnotationPresent(GenericGenerator.class));<% } %>
        assertTrue(entityClass.getField("id").isAnnotationPresent(Column.class));

        assertNull(entity.getId());
        final <%= entityIdType %> expected = "any-data";
        entity.setId(expected);
        assertEquals(expected, entity.getId());
    }
}
