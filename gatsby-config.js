require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Hackathon Project`,
    siteUrl: `https://www.hackathon-project.com`,
    author: `Sam Larsen Disney & `,
    description: `Our awesome new hackathon project...`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Hackathon project",
        short_name: "Hack",
        start_url: "/",
        background_color: "#FB923D",
        theme_color: "#FB923D",
        display: "standalone",
        icon: `src/images/icon.png`,
      },
    },
  ],
}
