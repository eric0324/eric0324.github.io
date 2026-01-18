import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ url }) => {
	const page = parseInt(url.searchParams.get('page') || '1');
	const pageSize = 12;

	const allPosts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	const totalPages = Math.ceil(allPosts.length / pageSize);
	const start = (page - 1) * pageSize;
	const end = start + pageSize;
	const posts = allPosts.slice(start, end);

	return new Response(
		JSON.stringify({
			posts: posts.map(post => ({
				id: post.id,
				title: post.data.title,
				description: post.data.description,
				pubDate: post.data.pubDate.toISOString(),
				heroImage: post.data.heroImage,
				category: post.data.category,
				tags: post.data.tags,
			})),
			currentPage: page,
			totalPages: totalPages,
			hasMore: page < totalPages,
		}),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
};
