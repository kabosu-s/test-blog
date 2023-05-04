export default function handler(req, res) {
  const posts = [
    { slug: 'first-post', title: 'My First Post' },
    { slug: 'second-post', title: 'My Second Post' },
    { slug: 'third-post', title: 'My Third Post' },
  ]

  res.status(200).json(posts)
}
