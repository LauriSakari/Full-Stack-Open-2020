import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    author {
      name
      born
    }
    genres
    id
    published
    title
  }
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const FILTER_BY_GENRE = gql`
query allBooks($genre: String!) {
  allBooks(genre: $genre) {
    title
    author {
      name
    }
    published
  }
}
`
export const ME = gql`
query {
  me {
    username
    favoriteGenre
    id
  }
}`


export const NEW_BOOK = gql`
  mutation newBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const SET_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
        name: $name,
        setBornTo: $setBornTo
        ) {
        name
        born
        bookCount
        id
        }
    }
  `

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username, 
      password: $password
    ) {
        value
      }
  }
  `

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
${BOOK_DETAILS}
`