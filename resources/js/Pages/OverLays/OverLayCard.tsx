
export default function OverLayCard({overlay, setModalOpen,handleDelete}: 
  {
  overlay: any,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (id: number) => void;
}) {
  
  return (
    // on hover zoom in
    <div className="col hover:scale-105 transition duration-300">
            <div className="box">
              <img 
                // onClick={() => setModalOpen(true)} 
                src={overlay?.path} className="object-fill card-img-top cursor-pointer" alt={overlay?.name}/>
              <div className="box-body">
                <h6 className="font-medium mb-3 text-center">{overlay?.name}({JSON.parse(overlay?.dimensions)?.width} x {JSON.parse(overlay?.dimensions)?.height})</h6>
                <div className='text-center'>
                  
                <button onClick={() => handleDelete(overlay?.id)} className="ti-btn ti-btn-outline-danger ti-btn-wave w-full btn-wave font-medium waves-effect waves-light table-icon">
                  Delete
                  </button>
                </div>
               
              </div>
            </div>
          </div>
  )
}
