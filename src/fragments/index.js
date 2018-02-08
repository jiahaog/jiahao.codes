export const siteFragment = graphql`
  fragment SiteFragment on RootQueryType {
    site {
      siteMetadata {
        siteUrl
        title
        author
        description
        facebookAppId
        twitterUser
        social {
          githubUrl
          keybaseUrl
          linkedInUrl
          twitterUrl
        }
      }
    }
  }
`;

export const markdownFrontmatterFragment = graphql`
  fragment MarkdownFrontmatterFragment on MarkdownRemark {
    frontmatter {
      path
      title
      excerpt
      date(formatString: "MMMM DD, YYYY")
    }
  }
`;

export const markdownFrontmatterWithCoverFragment = graphql`
  fragment MarkdownFrontmatterWithCoverFragment on MarkdownRemark {
    frontmatter {
      path
      title
      excerpt
      date(formatString: "MMMM DD, YYYY")
      cover {
        childImageSharp {
          sizes(maxWidth: 2560) {
            ...GatsbyImageSharpSizes
          }
        }
      }
    }
  }
`;

export const markdownMetadataFragment = graphql`
  fragment MarkdownMetadataFragment on MarkdownRemark {
    html
    excerpt
    timeToRead
  }
`;
