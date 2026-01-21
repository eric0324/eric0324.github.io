import { getCollection } from 'astro:content';

export async function GET() {
	const posts = await getCollection('blog');

	const searchData = posts.map((post) => ({
		slug: post.id,
		title: post.data.title,
		description: post.data.description,
		category: post.data.category || '',
		pubDate: post.data.pubDate.toISOString(),
		tags: post.data.tags || [],
		heroImage: post.data.heroImage || '',
	}));

	return new Response(JSON.stringify(searchData), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
