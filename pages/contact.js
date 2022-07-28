/*
 * @Description:
 * @Version: 2.0
 * @Autor: 匡光淼
 * @Date: 2022-07-26 07:33:15
 * @LastEditors: 匡光淼
 * @LastEditTime: 2022-07-28 08:49:06
 */
import Head from 'next/head'
import { Fragment } from 'react'
import ContactForm from '../components/contact/contact-form'

export default function ContactPage() {
  return (
    <Fragment>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="Send you message" />
      </Head>
      <ContactForm />
    </Fragment>
  )
}
