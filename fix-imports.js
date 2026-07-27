const fs = require('fs');
const path = require('path');

const replacements = {
  '@/components/about-nav': '@/components/about/about-nav',
  '@/components/experience-timeline': '@/components/about/experience-timeline',
  '@/components/article-grid': '@/components/articles/article-grid',
  '@/components/articles-browser': '@/components/articles/articles-browser',
  '@/components/featured-post': '@/components/articles/featured-post',
  '@/components/latest-articles': '@/components/articles/latest-articles',
  '@/components/mdx-components': '@/components/articles/mdx-components',
  '@/components/reading-progress': '@/components/articles/reading-progress',
  '@/components/table-of-contents': '@/components/articles/table-of-contents',
  '@/components/blog-header': '@/components/layout/blog-header',
  '@/components/blog-footer': '@/components/layout/blog-footer',
  '@/components/featured-projects': '@/components/projects/featured-projects',
  '@/components/project-card': '@/components/projects/project-card',
  '@/components/code-block': '@/components/shared/code-block',
  '@/components/command-menu': '@/components/shared/command-menu',
  '@/components/contact-form': '@/components/shared/contact-form',
  '@/components/motion': '@/components/shared/motion',
  '@/components/newsletter-cta': '@/components/shared/newsletter-cta',
  '@/components/scroll-to-top': '@/components/shared/scroll-to-top',
  '@/components/share-button': '@/components/shared/share-button',
  '@/components/tech-icon': '@/components/shared/tech-icon',
  '@/components/theme-provider': '@/components/theme/theme-provider',
  '@/components/theme-toggle': '@/components/theme/theme-toggle',
  // Specific relative imports that broke due to move
  './motion': '@/components/shared/motion',
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = [...walk('app'), ...walk('components'), ...walk('lib')];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  for (const [oldPath, newPath] of Object.entries(replacements)) {
    // Regex to match imports exactly, accounting for quotes
    const regex1 = new RegExp(`from "${oldPath}"`, 'g');
    const regex2 = new RegExp(`from '${oldPath}'`, 'g');
    
    if (regex1.test(content) || regex2.test(content)) {
      content = content.replace(regex1, `from "${newPath}"`);
      content = content.replace(regex2, `from '${newPath}'`);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
