import { withSSRAuth } from '@/utils/withSSRAuth'

const Metrics = () => {
  return (
    <div className="h-screen w-full bg-zinc-800 flex flex-col items-center py-10 px-10">
      <h1 className="text-yellow-500 text-3xl">Metrics Page</h1>
    </div>
  )
}

export default Metrics

export const getServerSideProps = withSSRAuth(
  async (ctx: any) => {
    return {
      props: {},
    }
  },
  {
    permissions: ['metrics.list'],
    roles: ['administrator'],
  },
)
