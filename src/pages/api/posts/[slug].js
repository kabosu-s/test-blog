export default function handler(req, res) {
  const { slug } = req.query
  const post = {
    slug: slug,
    title: `My ${slug} Post`,
    content: `This is my ${slug} post.`
  }

  res.status(200).json(post)
}
