import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};
//Loading dos Post
const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdateDocument = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);

  // Limpeza de Memoria
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updateDocument = async (uid, data) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      //Criado a Referencia do documentos
      const docRef = await doc(db, docCollection, uid);

      // Fazendo o Update do documento referenciado
      const updatedDocument = await updateDoc(docRef, data);

      //Aqui ele dispara o Update
      checkCancelBeforeDispatch({
        type: "UPDATED_DOC",
        payload: updatedDocument,
      });
    } catch (error) {
      console.log(error);
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
    }
  };
  //Segunda limpeza de vazamento de memoria
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { updateDocument, response };
};
