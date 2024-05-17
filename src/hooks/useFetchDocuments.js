import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection, // Serve pra pegar a coleção
  query,      // Serve para pegar os dados
  orderBy,    // Serve pra ordenação
  onSnapshot, // Serve pra Atualizar tudo em tempo real
  where,      // Serve pra filtrar
} from "firebase/firestore";
  //exportação da função principal
export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Limpeza no vazamento de memoria
  const [cancelled, setCancelled] = useState(false);
  //função de mapeamento o array dependencia
  useEffect(() => {
    //Cencelamento se o hook nao estiver fazendo mais efeito
    async function loadData() {
      if (cancelled) {
        return;
      }
      //Carregar os dados
      setLoading(true);
      //Referencia da Colletion
      const collectionRef = await collection(db, docCollection);
      //Tratamento dos erros da Busca
      //Resgate da Busca
      try {
        let q;
        // aqui a gente tem 3 posibilidades a busca o drashbord ou nada
        if (search) {
          q = await query(
            collectionRef,
            where("tags", "array-contains", search),
            orderBy("createdAt", "desc")
          );
          //Etapa de pegar vários documentos
        } else if (uid) { // Lembrar que esse UID e o id do usuario pois o id do post e difente no banco de dados
          q = await query(
            collectionRef,
            where("uid", "==", uid), // Aqui pegando o ID por usuário
            orderBy("createdAt", "desc")
          );
        } else {
          q = await query(collectionRef, orderBy("createdAt", "desc"));
        }
        //Mapear dos dados
        await onSnapshot(q, (querySnapshot) => {
          //map dos dados individuais, (com o uso do state em um array dependencia podemos ter um loop infinito)
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id, //regras do firebase\ criando id e a chave doc.id
              ...doc.data(), //impressão dos documentos, separado dos dados, as outras chaves titulos, imagem, body vem baseado aqui nese objeto exped operation
            }))
          );
        });
      } catch (error) {
        //se cair do catch nao sai desse try acima
        //mostrando algum eventual erro
        console.log(error);
        setError(error.message);
      }

      setLoading(false);
    }
    //cada vez que mudar o estado ele vai chamar o useEffect
    loadData();
  }, [docCollection, search, uid, cancelled]);


  //outra limpeza de memoria com useEffect, pois assim nao precisa carregar os componentes quando eles desmontarem
  useEffect(() => {
    return () => setCancelled(true);
  }, []);
  //Retornamos
  return { documents, loading, error };
};
