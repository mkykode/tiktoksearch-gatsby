/** @jsx jsx */
import { jsx } from "theme-ui"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { ThemeProvider } from "theme-ui"
import theme from "../theme"
import Videos from "../components/Videos"

const IndexPage = () => (
  <ThemeProvider theme={theme}>
    <Layout>
      <SEO title="Home" />
      <h1>Search for TikTok Videos</h1>
      <Videos />
    </Layout>
  </ThemeProvider>
)

export default IndexPage
