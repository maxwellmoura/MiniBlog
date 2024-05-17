//Essa Page so seria vista de o usuario estiver logado
import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom'

//Hooks!
import { useAuthValue } from '../../contexts/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocuments'

const Dashboard = () => {
  //Pegar o Usuário
  const { user } = useAuthValue()
  //Pegar o Id do usuario
  const uid = user.uid
  //Variavel de executando a chamada dos posts por documentos, posts"id" e usuários 
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid)
  //Consumindo o Hook deleteDocument
  const {deleteDocument} = useDeleteDocument("posts")
  //função do deleteDocument
  
    if (loading){
      return <p>Carregando...</p>
    }
  
  //posts do usuário
  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <p>Gerencie o seus posts</p>
      {/* Exibição dos posts */}
      {/* Abaixo regra de quando nao encontrar posts */}
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Posts não encontrados...</p>
          <Link to='/posts/create' className='btn'>Criar Post</Link>
        </div>
      ) : (
        <div className={styles.post_header}>
          {/* Cabeçalio do Post */}
          <span>Titulo</span>
          <span>Ações</span>
        </div>
      )}
      {/* Cabeçalio da tabela */}
      {posts && posts.map((post) => 
      <div key={post.id} className={styles.post_row}>
        <p>{post.title}</p>
        <div>
          {/* Minhas ações no Dashboad teremos 3 botoes, Obs: os to é com crases*/}
          <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ver</Link>
          <Link to={`/posts/edit/${post.id}`} className='btn btn-outline'>Editar</Link>
          {/* Botão de delete passando o argumento deleteDocument */}
          <button onClick={() => deleteDocument(post.id)} className='btn btn-outline btn-danger'>Deletar</button>
        </div>
      </div>)}
    </div>
  )
}

export default Dashboard
