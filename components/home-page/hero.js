import { Fragment } from 'react'
import Image from 'next/image'

export default function Hero() {
  return (
    <Fragment>
      <section className="hero-wrap">
        <div className="hero__image">
          <Image src="/images/site/max.png" height={300} width={300} alt="image" objectFit="cover" />
        </div>
        <h1>Hi, I&apos;m Max</h1>
        <p>I blog about web develop - espacially fronted frameworks lick Angular or React</p>
      </section>

      <style jsx>{`
        .hero-wrap {
          text-align: center;
          background-image: linear-gradient(to bottom, var(--color-grey-900), var(--color-grey-800));
          padding: var(--size-8) 0;
        }
        .hero__image {
          width: 300px;
          height: 300px;
          box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
          border-radius: 50%;
          overflow: hidden;
          background-color: var(--color-grey-700);
          margin: auto;
        }
        .hero__image img {
          object-fit: cover;
          object-position: top;
          width: 100%;
          height: 100%;
        }
        .hero-wrap h1 {
          font-size: var(--size-16);
          margin: var(--size-4) 0;
          color: var(--color-grey-300);
        }
        .hero-wrap p {
          font-size: var(--size-6);
          color: var(--color-grey-200);
          width: 90%;
          max-width: 40rem;
          margin: auto;
        }
      `}</style>
    </Fragment>
  )
}
