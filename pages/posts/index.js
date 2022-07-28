import Head from 'next/head'
import { Fragment } from 'react'
import { getAllPosts } from '../../lib/posts-util'
import PostAll from '../../components/posts/post-all'

export default function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta name="description" content="A list of all programming-related tutorials and posts" />
      </Head>
      <PostAll posts={props.posts} />
    </Fragment>
  )
}

export async function getStaticProps() {
  const featuredPosts = getAllPosts()
  return {
    props: {
      posts: featuredPosts
    }
  }
}
