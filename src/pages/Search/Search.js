import styles from './Search.module.css'

import React from 'react'
//Hooks!
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

//Componentes!
import PostDetail from '../../components/PostDetail'
import { Link } from 'react-router-dom'

const Search = () => {
    //Pegando os parametros
    const query = useQuery()
    //Metodo Get vem URLSearchParams pelo atributo "q"
    const search = query.get("q")

    //carregamento dos documentos baseado nas buscas
    const {documents: posts} = useFetchDocuments("posts", search)
  return (
    <div className={styles.search}>
      <h2>Search</h2>
      <div>
        {/* Caso nao for encontrado */}
        {posts && posts.length === 0 &&(
            <div className={styles.noposts}>
                <p>Busca de Posts não encontrados</p>
                {/* link para volta a pagina HOME */}
                <Link to="/" className="btn btn-dark">
                    Voltar
                </Link>
            </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  )
}

export default Search
