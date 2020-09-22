import {
  graphql,
  commitMutation,
} from 'react-relay'
import environment from '../relay-env'

const mutation = graphql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      user {
        id
        firstName
        lastName
        email
        exams {
          edges {
            node {
              id
              name
              published
              paid
            }
          }
        }
        randomUnanswered {
          uuid
          source
          text
          image
        }
      }
    }
  }
`

export default (email: string, password: string, callback: (data: object) => any) => {
  const variables = {
    email,
    password,
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response) => {
        callback(response)
      },
      onError: err => console.error(err),
    },
  )
}