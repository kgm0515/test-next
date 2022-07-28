import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function PostItem(props) {
  const { title, image, excerpt, date, slug } = props.post

  const formattedDate = new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
  const iamgePath = `/images/posts/${slug}/${image}`
  const linkPath = `/posts/${slug}`

  return (
    <Fragment>
      <li className="post-item">
        <Link href={linkPath}>
          <a>
            <div className="post-item__image">
              <Image src={iamgePath} alt={title} width={300} height={200} layout="responsive" />
            </div>
            <div className="post-item__content">
              <h3>{title}</h3>
              <time>{formattedDate}</time>
              <p>{excerpt}</p>
            </div>
          </a>
        </Link>
      </li>
      <style jsx>{`
        .post-item {
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          background-color: var(--color-grey-800);
          text-align: center;
        }
        .post-item a {
          color: var(--color-grey-100);
        }
        .post-item__image {
          width: 100%;
          max-height: 20rem;
          overflow: hidden;
        }
        .post-item__image img {
          object-fit: cover;
        }
        .post-item__content {
          padding: var(--size-4);
        }
        .post-item__content h3 {
          margin: var(--size-2) 0;
          font-size: var(--size-6);
        }
        .post-item__content time {
          font-style: italic;
          color: var(--color-grey-300);
        }
        .post-item__content p {
          line-height: var(--size-6);
        }
      `}</style>
    </Fragment>
  )
}
