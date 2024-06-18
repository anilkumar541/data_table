import { useState } from 'react'
import './App.css'
import DataTable from './data_table/DataTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <DataTable />
      </div>
    </>
  )
}

export default App
