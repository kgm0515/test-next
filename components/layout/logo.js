import { Fragment } from 'react'

export default function Logo() {
  return (
    <Fragment>
      <div className="logo">Max Next Blog</div>
      <style jsx>{`
        .logo {
          text-transform: uppercase;
          font-size: var(--size-5);
          font-weight: bold;
          font-family: 'Oswald', sans-serif;
          color: var(--color-grey-50);
        }
        @media (min-width: 768px) {
          .logo {
            font-size: var(--size-8);
          }
        }
      `}</style>
    </Fragment>
  )
}
