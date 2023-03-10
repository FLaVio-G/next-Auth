import { FormEvent, useContext, useState } from 'react'
import Head from 'next/head'
import { AuthContext } from '@/contexts/AuthContext'
import { withSSRGuest } from '@/utils/withSSRGuest'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const data = {
      email,
      password,
    }
    await signIn(data)
    setEmail('')
    setPassword('')
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-zinc-800 w-full h-[100vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl text-zinc-50 mb-4">Autenticação</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            placeholder="Seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-900 px-4 py-2 rounded-full text-zinc-100"
          />
          <input
            type="text"
            value={password}
            placeholder="Seu password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-900 px-4 py-2 rounded-full text-zinc-100"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-zinc-900 px-4 py-2 rounded-full font-bold hover:bg-yellow-400"
          >
            Entrar
          </button>
        </form>
      </main>
    </>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {},
  }
})
