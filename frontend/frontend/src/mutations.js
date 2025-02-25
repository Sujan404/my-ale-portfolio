import gql from 'graphql-tag'

export const SUBMIT_COMMENT = gql`
  mutation ($content: String!, $userID: ID!, $postID: ID!) {
    createComment(content: $content, userId: $userID, postId: $postID) {
      comment {
        content
      }
    }
  }
`

export const UPDATE_COMMENT_LIKE = gql`
  mutation ($commentID: ID!, $userID: ID!) {
    updateCommentLike(commentId: $commentID, userId: $userID) {
      comment {
        id
        likes {
          id
        }
      }
    }
  }
`

export const UPDATE_POST_LIKE = gql`
  mutation ($postID: ID!, $userID: ID!) {
    updatePostLike(postId: $postID, userId: $userID) {
      post {
        id
        title
        likes {
          id
        }
      }
    }
  }
`

export const UPDATE_USER_PROFILE = gql`
  mutation (
    $userID: ID!
    $firstName: String!
    $lastName: String!
    $avatar: Upload
    $bio: String!
    $location: String!
    $website: String!
  ) {
    updateUserProfile(
      userId: $userID
      firstName: $firstName
      lastName: $lastName
      avatar: $avatar
      bio: $bio
      location: $location
      website: $website
    ) {
      user {
        id
        username
        firstName
        lastName
        email
        avatar
        bio
        location
        website
        commentSet {
          id
          content
          post {
            id
            title
            slug
          }
          isApproved
        }
      }
    }
  }
`

export const USER_SIGNUP = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      user {
        email
      }
    }
  }
`

export const USER_SIGNIN = gql`
  mutation ($username: String!, $password: String!, $forceLogout: Boolean) {
    tokenAuth(username: $username, password: $password , forceLogout: $forceLogout) {
      token
      user {
        id
        username
        firstName
        lastName
        email
        avatar
        bio
        location
        website
        activeJwt
      }
    }
  }
`

export const CURRENT_USER = gql`
  mutation ($userId: Int!) {
    user(userId: $userId) {
      id
      username
      firstName
      lastName
      email
      avatar
      bio
      location
      website
    }
  }
`

export const Bill_IMAGE = gql`
  mutation ($userId: ID!, $description: String!, $name: String!, $photo: Upload) {
    createBillImage(userId: $userId, description: $description, name: $name, photo:$photo) {
      bill {
        id
        name
        slug
        description
        photo
      }
    }
  }
`

export const DELETE_ACTIVE_JWT_TOKEN = gql`
  mutation($userId: ID!){
    deleteActiveJwtToken(userId: $userId){
      user{
        id
      }
    }
  }
`

export const SAVE_CUSTOMIZE_PAGE_ATTRIBUTES = gql`
mutation($userId:  ID!, $attributes: String){
  saveCustomizePageAttributes(userId: $userId, attributes: $attributes){
    pageAttribtues{
      attributes
    }
  }
}
`
