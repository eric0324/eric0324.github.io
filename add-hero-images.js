import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogDir = path.join(__dirname, 'src/content/blog');
const defaultHeroImage = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop'; // 預設圖片

// 讀取所有 markdown 文件
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

console.log(`Found ${files.length} blog posts`);

let updatedCount = 0;
let withImageCount = 0;
let withDefaultCount = 0;

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // 分離 frontmatter 和內容
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!frontmatterMatch) {
    console.log(`⚠️  Skipping ${file} - no frontmatter found`);
    return;
  }

  let [, frontmatter, body] = frontmatterMatch;

  // 檢查是否已經有 heroImage
  if (frontmatter.includes('heroImage:')) {
    console.log(`⏭️  Skipping ${file} - already has heroImage`);
    return;
  }

  // 在內容中找第一張圖片
  let heroImage = null;

  // 匹配各種圖片格式
  const imagePatterns = [
    // Markdown 圖片: ![alt](url)
    /!\[.*?\]\((https?:\/\/[^\)]+)\)/,
    // HTML img 標籤: <img src="url"
    /<img[^>]+src=["']([^"']+)["']/,
    // Cloudinary/Imgur CDN 圖片
    /https?:\/\/(?:res\.cloudinary\.com|i\.imgur\.com)[^\s\)]+/
  ];

  for (const pattern of imagePatterns) {
    const match = body.match(pattern);
    if (match) {
      heroImage = match[1] || match[0];
      // 清理可能的尾隨字符
      heroImage = heroImage.split(/[\s\)]/)[0];
      break;
    }
  }

  // 如果找到圖片，使用它；否則使用預設圖片
  const imageToUse = heroImage || defaultHeroImage;

  // 在 frontmatter 中添加 heroImage
  const newFrontmatter = frontmatter + `\nheroImage: "${imageToUse}"`;
  const newContent = `---\n${newFrontmatter}\n---\n${body}`;

  // 寫回文件
  fs.writeFileSync(filePath, newContent, 'utf-8');

  updatedCount++;
  if (heroImage) {
    withImageCount++;
    console.log(`✅ ${file} - Added heroImage from content`);
  } else {
    withDefaultCount++;
    console.log(`📷 ${file} - Added default heroImage`);
  }
});

console.log('\n=== Summary ===');
console.log(`Total files processed: ${updatedCount}`);
console.log(`With content image: ${withImageCount}`);
console.log(`With default image: ${withDefaultCount}`);
