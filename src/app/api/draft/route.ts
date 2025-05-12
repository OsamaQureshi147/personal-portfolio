import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getClient } from '@/lib/sanity'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  
  // This should be a secure environment variable in production
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }
  
  if (!slug) {
    return new Response('No slug in the request', { status: 401 })
  }
  
  // Check if the post with this slug exists
  const post = await getClient().fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug }
  )
  
  if (!post) {
    return new Response('Invalid slug', { status: 401 })
  }
  
  draftMode().enable()
  redirect(`/blog/${post.slug.current}?preview=true`)
}
