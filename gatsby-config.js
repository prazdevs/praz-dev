module.exports = {
  siteMetadata: {
    title: `PraZ.dev`,
    description: `Pragmatic developer, React nerd and a11y advocate.`,
    author: `Sacha 'PraZ' Bouillez`,
    siteUrl: `https://praz.dev`,
    image: `https://praz.dev/images/icon.png`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`
      }
    },
    `gatsby-plugin-sitemap`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-remark-images`,
      options: {
        // maxWidth: 800,
        backgroundColor: `transparent`,
        linkImagesToOriginal: false,
        wrapperStyle: `margin-top: 0.75rem; margin-bottom: 0.75rem;`
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // maxWidth: 800,
              backgroundColor: `transparent`,
              linkImagesToOriginal: false,
              wrapperStyle: `margin-top: 0.75rem; margin-bottom: 0.75rem;`
            }
          },
          `gatsby-remark-smartypants`
        ]
      }
    },
    `gatsby-plugin-chakra-ui`,
    `gatsby-remark-reading-time`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#303030`,
        theme_color: `#ff8787`,
        display: `minimal-ui`,
        icon: `static/images/icon.png`
      }
    }
  ]
}
