
function SuccessCard({url,title,count}:any) {
  return (
    <div className="mx-2 text-[#dfff2d] text-center hover:scale-[1.02] hover:duration-200">
      <h1 className='success-card-image'>{url}</h1> 
      <h1 className='mt-8 mb-3 text-xl text-[#949494]'>{title}</h1>      
      <h1 className='text-[#ffc277] mb-8 text-3xl'>{count}</h1>      
    </div>
  )
}

export default SuccessCard