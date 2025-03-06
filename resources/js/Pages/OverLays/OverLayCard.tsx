
export default function OverLayCard({overlay, setModalOpen}: 
  {
  overlay: any,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  
  return (
    // on hover zoom in
    <div className="col hover:scale-105 transition duration-300">
            <div className="box">
              <img 
                // onClick={() => setModalOpen(true)} 
                src={overlay?.path} className="object-fill h-80 card-img-top cursor-pointer" alt={overlay?.name}/>
              <div className="box-body">
                <h6 className="font-medium mb-3 text-center">{overlay?.name}</h6>
                <div className='text-center'>
                  
                <button className="ti-btn ti-btn-outline-danger ti-btn-wave w-full btn-wave font-medium waves-effect waves-light table-icon">
                  Delete
                  </button>
                </div>
               
              </div>
            </div>
          </div>
  )
}
