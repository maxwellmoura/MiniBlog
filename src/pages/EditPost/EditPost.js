import styles from "./EditPost.module.css";
//React!
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//Hooks!
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {
  //Parametros da URL
  const { id } = useParams();
  //Pegando o Post
  const { document: post } = useFetchDocument("posts", id);

  

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

 //Preenchimento dos dados do post
  useEffect(() => {
    //Fazendo a verificação se o post chegou
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);
      //Tag nao posso pegar assim por que ela é uma array e vamos modificar assim
      const textTags = post.tags.join(", ");
      //Agora podemos pegar as Tags
      setTags(textTags);
    }
  }, [post]);

  

  const navigate = useNavigate();

  const { updateDocument, response } = useUpdateDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Validando a Image
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    // Criando Tags Array
    const tagsArray = tags.split(",").map((tag) => tag.trim());

 
    //Objeto das variaveis 
    const data = {
      title,
      image,
      body,
      tags: tagsArray,
    };

    updateDocument(id, data);

   // Redirecionamento Para Dashboard
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando post: {post.title}</h2>
          <p>Altere os dados do post como desejar</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input
                type="text"
                name="text"
                required
                placeholder="Pense num bom título..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>URL da imagem:</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Insira uma imagem que representa seu post"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            {/* Preview da imagem */}
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />
            <label>
              <span>Conteúdo:</span>
              <textarea
                name="body"
                required
                placeholder="Insira o conteúdo do post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Insira as tags separadas por vírgula"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde.. .
              </button>
            )}
            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
