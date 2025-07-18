//addEmployee.jsx
import styles from './addEmployee.module.css'
import { useState } from "react"
import {v4 as uuidv4} from 'uuid'
export default function addEmployee({onSave, onCancel}) {

  const [name, setName] = useState("") //Nome do Funcionário
  const [email, setEmail] = useState("") // Email
  const [phone, setPhone] = useState("") // Telefone
  const [role, setRole] = useState("") // Cargo na empresa

  const formatPhone = (value) => {
    // remove tudo que não é numero
    const cleaned = value.replace(/\D/g, '')

    //aplica a máscara (XX) XXXX-XXXX
    let formatted = ''

    if(cleaned.length > 0) {
      formatted = `(${cleaned.substring(0, 2)})`
    }
    if(cleaned.length > 2){
      formatted += `  ${cleaned.substring(2, 7)}`
    }
    if(cleaned.length > 7){
      formatted += `-${cleaned.substring(7,11)}`
    }
    return formatted
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newEmployee = {
      id: uuidv4(),
      name,
      email,
      phone,
      role
    }
    onSave(newEmployee)
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalAddEmployee}>
        <h2>Adicionar Novo Funcionário</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label>Nome:</label>
            <input type="text" value={name} onChange={(e)=> setName(e.target.value)}/>
          </div>
          <div>
            <label>Email:</label>
            <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>
          </div>
          <div>
            <label>Telefone:</label>
            <input type="text"  value={phone} onChange={(e)=> setPhone(e.target.value)}/></div>
          <div>
            <label>Função/Cargo:</label>
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)}/>
          </div>
          <div className={styles.buttonsWrapper}>
            <button type='submit' className={styles.saveButton}> Salvar </button>
            <button type='button' onClick={onCancel} className={styles.cancelButton}> Cancelar</button>
          </div>
        </form>
      </div>
    </div>
    
  )
}
