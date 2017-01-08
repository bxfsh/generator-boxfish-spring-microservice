<%
var entityRepository = utils.repositoryNameOf(e);
%>package <%= utils.fullDomainPackageOf(e) %>;

public interface <%= entityRepository %>Custom {

}
