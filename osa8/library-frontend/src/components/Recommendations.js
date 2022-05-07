
import { useQuery } from '@apollo/client'
import { FILTER_BY_GENRE } from '../queries'

const Recommendations = ({ show, favoriteGenre }) => {

  const result = useQuery(FILTER_BY_GENRE, {
    variables:  { genre: favoriteGenre },
    skip: !show
  })

  const boldStyle = {
    fontWeight: 'bold'
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }

  const filteredBooks = result.data.allBooks

  return (
    <div>
      <h1>Recommendations</h1>
      <p>Books in your favorite genre <span style={boldStyle}> {favoriteGenre}</span></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations