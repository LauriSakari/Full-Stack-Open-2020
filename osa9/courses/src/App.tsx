
import { CoursePart } from "./types"

const Header = ({courseName}: { courseName:string }) => {
  return <h1>{courseName}</h1>
}

interface PartProps {
  part: CoursePart
}

const Part = ({ part }: PartProps ) => { 


  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  let returnValue
  
    switch (part.type) {
      case "normal": 
        returnValue = <p>
        <span className="bold">{part.name} {part.exerciseCount}</span><br></br>
        <span className="italic"> {part.description} </span>
        </p>
        break;
      case "groupProject": 
        returnValue = <p>
          <span className="bold">{part.name} {part.exerciseCount}</span><br></br>
          <span className="italic"> Project exercises {part.groupProjectCount}</span>
          </p>
       break;
      case "submission": 
        returnValue = <p>
          <span className="bold">{part.name} {part.exerciseCount}</span> <br></br>
          <span className="italic"> {part.description}</span> <br></br>
          <span>Submit to {part.exerciseSubmissionLink} </span>
          </p>
        break;
      case "special":
        returnValue = <p>
          <span className="bold">{part.name}  {part.exerciseCount}</span><br></br>
          <span className="italic">{part.description}</span><br></br>
          <span>Required skills {part.requirements}</span>
          </p>
        break;
      default:
        return assertNever(part);
    }
  return (
  <>
    { returnValue }
  </>
  )
}


const Content = ({courseParts}: {courseParts:CoursePart[]}) => {

  const coursesRender = courseParts.map(part => 
    <Part key={part.name} part={ part }/>
  )

  return (
  <>
   {coursesRender}
  </>
  )
 }

const Total = ({courseParts}: {courseParts:Array<CoursePart>}) => {
  return (
    <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header courseName ={courseName}/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};

export default App;