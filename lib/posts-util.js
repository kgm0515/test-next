import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

// 湖区所有帖子的列表
export function getPostsFiles() {
  return fs.readdirSync(postsDirectory)
}

// 读取某一个帖子的内容
export function getPostData(postIdentifier) {
  const slug = postIdentifier.replace(/\.md$/, '')
  const filePath = path.join(postsDirectory, `${slug}.md`)
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  return {
    slug,
    ...data,
    content
  }
}

// 获取所有的帖子
export function getAllPosts() {
  const postFiles = getPostsFiles()
  const allPosts = postFiles.map((fileName) => {
    return getPostData(fileName)
  })
  const sortedPosts = allPosts.sort((a, b) => a.date - b.date)
  return sortedPosts
}

// 获取所有推荐的帖子
export function getFeaturedPosts() {
  const allPosts = getAllPosts()
  const filterPosts = allPosts.filter((post) => {
    return post.isFeatured
  })
  return filterPosts
}
