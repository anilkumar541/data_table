import { useEffect, useState } from "react"


const DataTable = () => {
  const [formData, setFormData]= useState({name: "", gender: "", age: ""})
  const [data, setData]= useState([])
  const [editId, setEditId] = useState(null);
  const [editData, setEditData]= useState({name: "", gender: "", age: ""})
  const [searchTerm, setSearchTerm]= useState("")
  const [currentPage, setCurrentPage]= useState(1);

  const itemsPerPage= 5;
  const lastItem= currentPage * itemsPerPage;
  const indexOfFirstItem= lastItem -itemsPerPage;
  let filteredItems= data.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredData= filteredItems.slice(indexOfFirstItem, lastItem);


  useEffect(()=> {
    setCurrentPage(1);
  }, [searchTerm])

  useEffect(() => {
    if(!editId) return;
    let selectItem= document.querySelectorAll(`[id= '${editId}']`)
    if(selectItem[0]) selectItem[0].focus();

  }, [editId])


  const handleInputChange= (event)=>{
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  const handleAddClick= (event)=>{
    if(formData.name && formData.gender && formData.age){
      const newItem= {
        id: crypto.randomUUID(),
        name: formData.name,
        gender: formData.gender,
        age: formData.age
      }
      setData([...data, newItem])

      setFormData({name: "", gender: "", age: ""})
    }
  }

  const handleEdit= (id)=> {
    setEditId(id);
    const itemToEdit= data.find((item) => item.id= id)
    setEditData({name: itemToEdit.name, gender: itemToEdit.gender, age: itemToEdit.age})
  }

  const handleSave= (id) =>{
    setData(data.map((item) => (item.id === id ? {...item, ...editData} : item) ))
    setEditId(null)
  }

  
  const handleDelete= (id)=> {
    if(filteredData.length === 1 && currentPage !== 1){
      setCurrentPage((prev) => prev -1);
    }
    setData(data.filter((item) => item.id !== id))
  }
  
  const handleSearch= (event)=> {
    setSearchTerm(event.target.value)
  }

  const paginate= (pageNumber)=> {
    setCurrentPage(pageNumber);
  }

  return (
    <div className="container">
      <div className="add-container">
        <div className="info-container">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
          <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleInputChange} />
          <input type="text" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} />
        </div>

        <button className="add" onClick={handleAddClick}>Add</button>

      </div>

      <div className="search-table-container">
        <input className="search-input" type="text" placeholder="Seach by name" value={searchTerm} onChange={handleSearch} />

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          
        <tbody>
          {filteredData.map((data) => 
            <tr key={data.id}>
            <td id={data.id} contentEditable={editId === data.id}>{data.name}</td>
            <td id={data.id} contentEditable={editId === data.id}>{data.gender}</td>
            <td id={data.id} contentEditable={editId === data.id}>{data.age}</td>
            <td className="actions">
              {editId === data.id ? 
              <button className="edit" onClick={()=> handleSave(data.id)}>Save</button>
              :
              <button className="ecdit" onClick={()=> handleEdit(data.id)}>Edit</button>
              }
              <button className="delete" onClick={()=> handleDelete(data.id)}>Delete</button>
            </td>
          </tr>

          )}
          
        </tbody>

        </table>


        {/* pagination section */}
        <div className="pagination">
        {Array.from({length: Math.ceil(filteredItems.length / itemsPerPage)}, (_, index)=> (
          <button key={index+1} onClick={() => paginate(index + 1)} style={{backgroundColor: currentPage === index + 1 ? "blue": ""}}> {index + 1} </button>
        ))}
        </div>

      </div>

    </div>
  )
}

export default DataTable;