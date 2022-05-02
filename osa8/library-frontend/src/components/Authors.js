import SetBirthYearForm from "./SetBitrthYearForm"

const Authors = (props) => {

  if (!props.show) {
    return null
  }

  const authors = props.authors

  const isAuthorized = () => {
    if (props.authorized) {
    return( <SetBirthYearForm authors = {authors}/> )
    }
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAuthorized()}
    </div>
    
  )
}

export default Authors
