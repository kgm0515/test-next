/*
 * @Description:
 * @Version: 2.0
 * @Autor: 匡光淼
 * @Date: 2022-07-19 08:06:23
 * @LastEditors: 匡光淼
 * @LastEditTime: 2022-07-28 20:57:45
 */
/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants')

module.exports = (phase) => {
  /**
   npm run dev: phase-development-server
   npm run build: phase-production-build
   npm run start: phase-production-server
  */
  console.log(phase, '----', PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER, PHASE_PRODUCTION_BUILD)
  let config = {
    reactStrictMode: true,
    swcMinify: true // 不适用swc打包()
  }
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    // 开发环境
    Object.assign(config, {
      env: {
        mongodb_username: 'test_next',
        mongodb_password: 'kgm0515',
        mongodb_ip: '120.76.74.224',
        mongodb_port: '27017',
        mongodb_database: 'test_next'
      }
    })
  } else {
    Object.assign(config, {
      env: {
        mongodb_username: 'test_next',
        mongodb_password: 'kgm0515',
        mongodb_ip: '120.76.74.224',
        mongodb_port: '27017',
        mongodb_database: 'test_next'
      }
    })
  }
  return config
}
