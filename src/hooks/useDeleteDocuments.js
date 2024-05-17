import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
//Metodos!
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETE_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  // Limpeza de Memoria
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };
  //Função de Deletar o Documento
  const deleteDocument = async (id) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    // Tentativa de deletar o documento
    // Referencias do banco de dado o DB
    // Referencias do documento que é o docColletion
    // Referenias do dadosque é o id
    try { 
        const deleteDocument = await deleteDoc(doc(db, docCollection, id))

      checkCancelBeforeDispatch({
        type: "DELETE_DOC",
        payload: deleteDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
    }
  };

  //Segunda Limpeza de Memoria.
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { deleteDocument, response };
};
