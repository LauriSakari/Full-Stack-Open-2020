import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { FILTER_BY_GENRE } from '../queries'

const BooksByGenre = ({ genre, filteredBooks, uniqueGenres, setGenre }) => {

  const boldStyle = {
    fontWeight: 'bold'
  }

  return(
    <div>
      <h2>books</h2>
      <p>in genre <span style={boldStyle}>{genre}</span></p>
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
      {uniqueGenres.map((genre) => <button key={genre}
        onClick={() => setGenre(genre)}>{genre}</button>)}
      <button onClick={() => setGenre('')}>all genres</button>

    </div>
  )
}

const Books = ({ show, books }) => {

  const [genre, setGenre] = useState(null)

  const genreResult = useQuery(FILTER_BY_GENRE, {
    variables: { genre },
    skip: !genre
  })

  if (genreResult.loading) {
    return <div>loading...</div>
  }

  if (!show) {
    return null
  }

  const genres = books.flatMap((book) => book.genres)

  const uniqueGenres = [...new Set(genres)]

  if (genre && genreResult.data) {
    return (
      <BooksByGenre genre={genre} filteredBooks={genreResult.data.allBooks}
        uniqueGenres={uniqueGenres} setGenre={setGenre}/>)
  }


  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {uniqueGenres.map((genre) => <button key={genre}
        onClick={() => setGenre(genre)}>{genre}</button>)}
      <button onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books
