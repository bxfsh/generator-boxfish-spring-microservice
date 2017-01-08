<%
var entityService = utils.serviceNameOf(e);
%>package <%= utils.fullDomainPackageOf(e) %>;

import org.springframework.stereotype.Service;

@Service
public interface <%= entityService %> {

}
