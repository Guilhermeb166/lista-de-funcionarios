//app.jsx
import { useEffect, useState } from 'react'
import styles from './App.module.css'
import { MdEdit, MdSave } from 'react-icons/md'
import { FaTrashAlt } from 'react-icons/fa'
import AddEmployee from './Components/addEmployee/AddEmployee'
export default function App() {
  const [employees,setEmployees] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editFormData, setEditFormData] = useState({
    name: '',
    email:'',
    phone:'',
    role:''
  })

  useEffect(() => {
  if (showAddForm) {
    document.body.classList.add('modalOpen')
  } else {
    document.body.classList.remove('modalOpen')
  }
  
  return () => {
    document.body.classList.remove('modalOpen')
  }
}, [showAddForm])

  // Carrega funcionários do localStorage
  useEffect(()=> {
    const savedEmployees = localStorage.getItem('funcionarios')
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees))
    }
  }, [])

  // Atualiza localStorage quando employees muda
  useEffect(()=> {
    localStorage.setItem('funcionarios', JSON.stringify(employees))
  }, [employees])
  
  const handleAddEmployee = (newEmployee) => {
    setEmployees ([...employees, newEmployee])
    setShowAddForm(false)
  }

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '')
    let formatted = ''
    
    if (cleaned.length > 0) {
      formatted = `(${cleaned.substring(0, 2)}`
    }
    if (cleaned.length > 2) {
      formatted += ` ${cleaned.substring(2, 7)}`
    }
    if (cleaned.length > 7) {
      formatted += `-${cleaned.substring(7, 11)}`
    }
    
    return formatted
  }

  const handleEditClick = (employee) => {
    setEditingId(employee.id)
    setEditFormData({
      name:employee.name,
      email:employee.email,
      phone: employee.phone,
      role: employee.role
    })
  }

  const handleEditFormChange = (e) =>{
    const { name, value } = e.target
    setEditFormData({
      ...editFormData,
      [name]: value
    })
  }

  const handleSaveClick = () =>{
    const updateEmployees = employees.map(employee => {
      if (employee.id === editingId) {
        return { ...employee, ...editFormData}
      }
      return employee
    })

    setEmployees(updateEmployees)
    setEditingId(null)
  }

  const handleDeleteClick = (id) => {
    const updateEmployees = employees.filter(employee => employee.id !== id)
    setEmployees(updateEmployees)
  }
  
    return (
    <main className={styles.main} >
      <h1>Lista de Funcionários</h1>
      <button onClick={()=> setShowAddForm(true)} className={styles.addButton}>Adicionar Funcionário</button>
      <table className={styles.employeeTable}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{editingId === employee.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                    className={styles.inputEdit}
                  />
                ) : (
                  employee.name
                )}
              </td>
              <td>{editingId === employee.id ? (
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                    className={styles.inputEdit}
                  />
                ) : (
                  employee.email
                )}
              </td>
              <td>
                {editingId === employee.id ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editFormData.phone}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value)
                      setEditFormData({
                        ...editFormData,
                        phone: formatted
                      })
                    }}
                    className={styles.inputEdit}
                    maxLength={16}
                  />
                ) : (
                  employee.phone
                )}
              </td>
              <td>
                {editingId === employee.id ? (
                  <input
                    type="text"
                    name="role"
                    value={editFormData.role}
                    onChange={handleEditFormChange}
                    className={styles.inputEdit}
                  />
                ) : (
                  employee.role
                )}
              </td>
              <td className={styles.actions}>
                {editingId === employee.id ? (
                  <button 
                    className={styles.saveButton}
                    onClick={handleSaveClick}
                  >
                    <MdSave />
                  </button>
                ) : (
                  <button 
                    className={styles.editButton}
                    onClick={() => handleEditClick(employee)}
                  >
                    <MdEdit />
                  </button>
                )}
                <button 
                  className={styles.deleteButton}
                  onClick={() => handleDeleteClick(employee.id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddForm && (
        <AddEmployee
          onSave={handleAddEmployee}
          onCancel={()=>{setShowAddForm(false)}}
        />
      )}
    </main>
  )
}
