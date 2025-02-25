import gql from 'graphql-tag'

export const POSTS_BY_CATEGORY = gql`
  query ($category: String!) {
    postsByCategory(category: $category) {
      title
      slug
      content
      isPublished
      isFeatured
      createdAt
    }
  }
`

export const ALL_CATEGORIES = gql`
  query {
    allCategories {
      name
      slug
    }
  }
`

export const ALL_TAGS = gql`
  query {
    allTags {
      name
      slug
    }
  }
`

export const ALL_POSTS = gql`
  query {
    allPosts {
      title
      slug
      content
      isPublished
      isFeatured
      createdAt
      category {
        name
        slug
      }
    }
  }
`

export const POST_BY_SLUG = gql`
  query ($slug: String!) {
    postBySlug(slug: $slug) {
      id
      title
      content
      featuredImage
      createdAt
      category {
        name
        slug
      }
      tag {
        name
        slug
      }
      user {
        id
        username
        firstName
        lastName
      }
      numberOfLikes
      likes {
        id
      }
      commentSet {
        id
        content
        createdAt
        isApproved
        user {
          username
          avatar
        }
        numberOfLikes
        likes {
          id
        }
      }
    }
  }
`

export const POSTS_BY_TAG = gql`
  query ($tag: String!) {
    postsByTag(tag: $tag) {
      title
      slug
      content
      isPublished
      isFeatured
      createdAt
      category {
        name
        slug
      }
    }
  }
`

// need to work in near future
export const CURRENT_USER = gql`
  query ($userId: Int!) {
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
      activeJwt
      # commentSet {
      #   id
      #   content
      #   post {
      #     id
      #     title
      #     slug
      #   }
      #   isApproved
      # }
    }
  }
`
export const GET_USER_TOKEN = gql`
  query($userName : String!){
    getUserToken(username: $username){
      id,
      token
    }
  }
`

export const SITE_INFO = gql`
  query {
    site {
      name
    }
  }
`

export const BILL_IMAGE_INFO = gql`
  query{
    allBillImageInfo {
      name,
      description
    }
  }
`
