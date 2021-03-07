import React from 'react'

const Header = (props) => {
    console.log("Headerin propsit", props)
    return (
      <>
        <h2>{props.name}</h2>
      </>
    )
  }

  const Content = (props) => {
      console.log("Content propsit ", props)
    return (
      <div>
        {props.part.map(part => 
        <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
      </div>
    )
  }  

  const Part = (props)  => {
      console.log("Part prosit ", props)
    return (
        
      <p>{props.part} {props.exercises}</p>
    )
  }

  const Total = (props) => {
    const sum = props.parts.reduce( (accumulator, currentValue) => {
        console.log('what is happening', accumulator, currentValue)
        return accumulator + currentValue.exercises
        }, 0)

        return (
            <div>
                <h4>Total of {sum} exercises </h4>
            </div>
        )
  } 

const Courses = (props) => {
    console.log("Course propsit ", props)
    console.log("Nimi ", props.courses[1].name)
    
    return (
    <div>
      <h1>Web development curriculum</h1>
      {props.courses.map(course => 
      <div key={course.id}>
        <Header name={course.name} />
        <Content part={course.parts} />
        <Total parts={course.parts} />
      </div>)}
    </div>    
    )
}

export default Courses 