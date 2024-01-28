

const Infobar = ({firstName}) => {
  return (
    <section className='text-lg md:text-xl lg:text-2xl '>
        <h1 className=" ml-32 md:ml-20">*Your messages {firstName}</h1>
    </section>
  )
}

export default Infobar