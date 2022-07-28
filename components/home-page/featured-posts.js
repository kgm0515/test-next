/*
 * @Description:
 * @Version: 2.0
 * @Autor: 匡光淼
 * @Date: 2022-07-26 07:33:14
 * @LastEditors: 匡光淼
 * @LastEditTime: 2022-07-26 08:23:54
 */
import { Fragment } from 'react'
import PostGrid from '../posts/post-grid'

export default function FeaturedPosts(props) {
  return (
    <Fragment>
      <section className="posts-latest">
        <h2>Featured Posts</h2>
        <PostGrid posts={props.posts} />
      </section>
      <style jsx>{`
        .posts-latest {
          width: 90%;
          max-width: 80rem;
          margin: var(--size-8) auto;
        }

        .posts-latest h2 {
          font-size: var(--size-8);
          color: var(--color-grey-800);
          text-align: center;
        }

        @media (min-width: 768px) {
          .posts-latest h2 {
            font-size: var(--size-16);
          }
        }
      `}</style>
    </Fragment>
  )
}
