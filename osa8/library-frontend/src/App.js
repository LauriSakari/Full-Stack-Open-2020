import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useQuery, useSubscription, useApolloClient} from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ME, BOOK_ADDED} from './queries'

export const updateCache = (cache, query, addedBook) => {
  console.log('updateCache toimii')
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log('usesubscription toimii')
      console.log(subscriptionData)
      alert(`Book titled ${addedBook.title} was added to the library`)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)



  useEffect(() => {
    const loggedUserToken = localStorage.getItem('library-user-token')
      setToken(loggedUserToken)
      
  }, [])

  const userResult = useQuery(ME)

  if (authorsResult.loading || booksResult.loading || userResult.loading)  {
    return <div>loading...</div>
  }

  let user = null
  if (userResult.data.me) {
   user = userResult.data.me
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
  
        <Authors show={page === 'authors'} authors = {authorsResult.data.allAuthors} 
          authorized={token}/>
  
        <Books show={page === 'books'} books={booksResult.data.allBooks}/>
  
        <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
      </div>
    )
  }
  if (user) {
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommend</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Authors show={page === 'authors'} authors={authorsResult.data.allAuthors}
        authorized={token}/>

      <Books show={page === 'books'} books={booksResult.data.allBooks} />

      <NewBook show={page === 'add'} />

      <Recommendations show={page === 'recommendations'} favoriteGenre={user.favoriteGenre}/>

    </div>
  )}
  return (
    <div>loading...</div>
  )
}

export default App
