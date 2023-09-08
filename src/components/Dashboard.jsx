import Layout from "./Layout"
import PageTitle from "./PageTitle"

export default function Dashboard() {
  return (
        <Layout>
            <PageTitle 
                title={'Dashboard'}
                subTitle={'Create new tasks and assigned to your team. We are promote colabrating.'}
            />
            <section className="mt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-6 gap-3">
                <div className="shadow border rounded-md p-3 bg-green-100">
                    <h1 className="text-2xl font-semibold">Total Tasks</h1>
                    <h2 className="text-xl font-medium py-3">3088</h2>
                </div>

                <div className="shadow border rounded-md p-3 bg-gray-100">
                    <h1 className="text-2xl font-semibold">Total Tasks</h1>
                    <h2 className="text-xl font-medium py-3">3088</h2>
                </div>

                <div className="shadow border rounded-md p-3 bg-indigo-100">
                    <h1 className="text-2xl font-semibold">Total Tasks</h1>
                    <h2 className="text-xl font-medium py-3">3088</h2>
                </div>

                <div className="shadow border rounded-md p-3 bg-orange-100">
                    <h1 className="text-2xl font-semibold">Total Tasks</h1>
                    <h2 className="text-xl font-medium py-3">3088</h2>
                </div>
            </section>
        </Layout>
    )
}
