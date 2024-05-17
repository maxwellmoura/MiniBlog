import { useLocation } from "react-router-dom";
// Memo por fazer duas coisa uma e a perfomace da aplicação que o valor fique salvo o retorno dele e nao tenha a reexecução dele
// e o outro consegue referenciar o objeto fezendo a comparação entre chaves unicas se eles foram modificados ou nao.
import { useMemo } from "react";

export function useQuery() {
    // pegando os parametros da pagina(url) quando for recaregada
    const { search } = useLocation()
    //Buscar os parametros de Busca e entregar o valor na pagina
    return useMemo(() => new
        URLSearchParams(search),
        [search])

}