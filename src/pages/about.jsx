import Layout from '../components/Layout'
import SEO from '../components/Seo'
import { graphql } from 'gatsby'
import useColors from '../hooks/useColors'

const AboutPage = ({ data }) => {
  const { primary } = useColors()
  console.log(data)
  return (
    <Layout>
      <SEO title='About' />
      <div></div>
    </Layout>
  )
}

export const query = graphql`
  query {
    articles: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/content/articles/" } }
      limit: 5
    ) {
      nodes {
        fields {
          slug
          readingTime {
            text
          }
        }
        frontmatter {
          date(locale: "en-gb", formatString: "ll")
          title
        }
      }
    }
    projects: allMdx(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
      sort: { fields: [frontmatter___maintained], order: DESC }
    ) {
      nodes {
        frontmatter {
          title
          link
          description
          maintained
          thumbnail {
            childImageSharp {
              fixed(width: 48, height: 48) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
      }
    }
    page: mdx(fileAbsolutePath: { regex: "/content/pages/home/" }) {
      frontmatter {
        header
        subheader
        photo {
          childImageSharp {
            fixed(width: 112, height: 112) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    }
  }
`

export default AboutPage
