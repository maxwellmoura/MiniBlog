import { useState, useEffect } from "react";
import { db } from "../firebase/config";
// Aqui a mudança do FetchDocuments pro FetchDocument esta aqui no import do firestore
import {
 doc, //metodos do documentos
 getDoc // metodos de pegar os documentos do banco
} from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);


  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);

      try {
        // referencia do documento do banco do doc collection e o id
        const docRef = await doc(db, docCollection, id);
        // Puxa o snap apenas de um documento.
        const docSnap = await getDoc(docRef);
        //Oter os dados do getDoc
        setDocument(docSnap.data());
      } catch (error) {
        console.log(error);
        setError(error.message);
      }

      setLoading(false);
    };
    loadDocument();
    //monitoramento do useEffect apenas a docColletion e o id
  }, [docCollection, id]);

  console.log(document);


  return { document, loading, error };
};
