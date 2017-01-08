<%
var entityIdGenerator = utils.entityIdGeneratorOf(e);
var entityIdType = utils.javaTypeOfId(e);
var entityName = utils.entityNameOf(e);
var entityRepository = utils.repositoryNameOf(e);
%>package <%= utils.fullDomainPackageOf(e) %>;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface <%= entityRepository %> extends CrudRepository<<%= entityName %>, <%= entityIdType %>>, <%= entityRepository %>Custom {

}
