import styles from '../Register/Register.module.css'

import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

const Register = () => {
  //States do Formulario
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  //State de error que nao esta junto ao formulario
  const [error, setError] = useState("")
  //Metodo de não envio de formulario
  const { createUser, error: authError, loading } = useAuthentication()
  const handleSubmit = async (e) => {
    e.preventDefault()
    //Erro ao usuario
    setError("")
    const user = {
      displayName,
      email,
      password
    }
    //Validação usando if/else
    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais")
      return
    }
    //resposta do user
    const res = await createUser(user)
    console.log(res)
  }
  //mapeamento de erro
  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.register}>
      <h1>Cadastre-se</h1>
      <p>Crie seu usuario e compartilhe seus momentos</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input type='text'
            name='displayName'
            required
            placeholder='Nome do usuário'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

        </label>
        <label>
          <span>Email:</span>
          <input type='email'
            name='email'
            required
            placeholder='Seu e-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span>Senha:</span>
          <input type='password'
            name='password'
            required
            placeholder='Insira sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          <span>Confirme sua senha:</span>
          <input type='password'
            name='ConfirmPassword'
            required
            placeholder='Repita sua senha'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        {!loading && <button className='btn'>Cadastrar</button>}
        {loading && <button className='btn' disabled>Aguarde...</button>}
        {/*Error Mensagem*/}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Register

