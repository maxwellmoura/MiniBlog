import styles from './Post.module.css'

//Hooks!
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Post = () => {
  //consumo do hook
  const { id } = useParams()
  //consumo do hook, com as colletion Posts e o Id que veio url
  const { document: post } = useFetchDocument("posts", id)
  return (
    <div className={styles.post}>
      {/* Condicional do Post */}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Esse post se trata sobre:</h3>
          <div className={styles.tags}>
            {post.tags.map((tag) =>
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            )}
          </div>
        </>

      )}
    </div>
  )
}

export default Post
