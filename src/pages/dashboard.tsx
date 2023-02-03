import { useContext, useEffect } from 'react'
import { AuthContext, signOut } from '@/contexts/AuthContext'
import { api } from '@/services/apiClient'
import { withSSRAuth } from '@/utils/withSSRAuth'
import { setupAPIClient } from '@/services/api'
import { useCan } from '@/hooks/useCan'
import Can from '@/components/Can'
import MetricsList from '@/components/MetricsList'

const Dashboard = () => {
  const { user } = useContext(AuthContext)

  const userCanSeeMetrics = useCan({
    permissions: ['users.create'],
    roles: [],
  })

  useEffect(() => {
    api
      .get('/me')
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className="h-screen w-full bg-zinc-800 flex flex-col items-center py-10 px-10">
      <h1 className="text-yellow-500 text-3xl">Dashboard Page</h1>

      <div className="flex items-center gap-4 mt-8 mb-5">
        <p className="text-zinc-200 ">Olá {user?.email}</p>
        <button
          onClick={() => signOut()}
          className="flex items-center, justify-center py-2 px-6 bg-zinc-700 text-yellow-500 rounded-lg"
        >
          Sair
        </button>
      </div>

      {userCanSeeMetrics && (
        <h2 className="text-yellow-500 text-xl mb-5">Usuários</h2>
      )}

      <Can permissions={['users.create']}>
        <MetricsList />
      </Can>
    </div>
  )
}

export default Dashboard

export const getServerSideProps = withSSRAuth(async (ctx: any) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/me')
  console.log(response.data)

  return {
    props: {},
  }
})
