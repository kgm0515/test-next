/*
 * @Description:
 * @Version: 2.0
 * @Autor: 匡光淼
 * @Date: 2022-07-26 07:40:58
 * @LastEditors: 匡光淼
 * @LastEditTime: 2022-07-26 07:56:46
 */
import { Fragment } from 'react'
import PostItem from './post-item'

export default function PostGrid(props) {
  const { posts } = props
  return (
    <Fragment>
      <ul className="post-grid">{Array.isArray(posts) && posts.map((post) => <PostItem key={post.slug} post={post} />)}</ul>
      <style jsx>{`
        .post-grid {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
          gap: 1.5rem;
          align-content: center;
        }
      `}</style>
    </Fragment>
  )
}
