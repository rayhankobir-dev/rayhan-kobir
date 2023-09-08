// eslint-disable-next-line react/prop-types
export default function PageTitle({ title, subTitle}) {
  return (
    <section className='px-6'>
        <h1 className='text-2xl font-semibold'>{ title }</h1>
        <p className='py-2 text-sm'>{ subTitle }</p>
    </section>
  )
}
