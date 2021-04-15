
import React, { useState, useEffect } from 'react'

import personService from './services/persons'

import './index.css'

const Filter = (props) => {
  return (
    <div>
    filter: <input value={props.value}
    onChange ={props.onChange} />
  </div>
  )
}

const PersonForm = (props) => {
  return (
  <form onSubmit={props.onSubmit}>
  <div>
    name: <input value={props.nameInputValue} 
    onChange={props.nameOnChange}/>
  </div>
  <div>
    number: <input value={props.numberInputValue}
    onChange={props.numberOnChange}/>
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
  )}

  const Persons = (props) => {
    return (
    <div>
      <p key={props.id} >{props.name} {props.number} 
      <button onClick={props.onClick}> delete </button></p>
    </div>
    )
  }

  const Notification = ({message}) => {
    console.log(message)
    if (message === null) {
      return null
    }
  
    return (
      <div className="notification">
        {message}
      </div>
    )

  }

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState([])
  const [ filterValue, setFilterValue ] = useState('')
  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  let tulostettava = []

  const addNewName = (event) => {
    event.preventDefault()

    const alreadyAdded = (element) => element.name === newName
      
    if (persons.some(alreadyAdded) === true) {
      if (window.confirm(`${newName} has already been added to phonebook, replace old number with new one`))  {
        const oldNameObject = persons.find(n => n.name === newName)
        
        const changedNameObject = {...oldNameObject, number: newNumber }
        personService
        .changeNumber(changedNameObject) 
         .then( 
          response => {
            tulostettava = persons.map(nameObject => nameObject.id !== changedNameObject.id ? nameObject : response)
            setPersons(tulostettava)}
          )
          
          setNotification(`${newName} has been given a new number`)
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        }
      }
     
      else  {
        const nameObject = {
          name: newName, number: newNumber
        }
        personService
        .addNew(nameObject)
        .then(response => {
        setPersons(persons.concat(response))
        setNewFilter(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setNotification(`Added ${nameObject.name} to phonebook`)
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      })
    }
    setNewName('');
    setNewNumber('')
  }

  const handleDeleteOf = (id, name) => {
    if (window.confirm(`Delete ${name}`))    {
    
    personService
    .removeName(id)
    .then( () => {
      setPersons(persons.filter(person => person.id !== id))
      setNewFilter('')
    })
    setNotification(`Removed ${name} from phonebook`)
        setTimeout(() => {
          setNotification(null)
        }, 2000)
    }
  }

  const handleNameChange = (event) =>  {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    let value = event.target.value.toUpperCase();
    setNewFilter(persons.filter(person => person.name.toUpperCase().includes(value)))
    setFilterValue(event.target.value)
  }


  if (newFilter.length === 0 && filterValue.length === 0) {
    tulostettava = persons
  } else if (newFilter.length === 0 && filterValue.length > 0) {
    tulostettava = []
  } else {
    tulostettava = newFilter
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={notification}/>
        <Filter value={filterValue} onChange ={handleFilterChange}/>
      <h2>Add new</h2>
        <PersonForm onSubmit = {addNewName} nameInputValue ={newName}
          nameOnChange = {handleNameChange} numberInputValue ={newNumber}
          numberOnChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <div>
      {
      tulostettava.map(person => 
        <Persons key = {person.id} name = {person.name} number = {person.number} 
          onClick = {() => handleDeleteOf(person.id, person.name)} />)
      } 
        
      </div>  
    </div>
  )

}

export default App
