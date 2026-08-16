import { getSinglePage } from "@lib/contentParser";
import { slugify } from "@lib/utils/textConverter";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

// get all taxonomies from frontmatter
export const getTaxonomy = (folder, name) => {
  const singlePages = getSinglePage(folder);
  const taxonomyPages = singlePages.map((page) => page.frontmatter[name]);
  let taxonomies = [];
  for (let i = 0; i < taxonomyPages.length; i++) {
    if (taxonomyPages[i] === undefined) {
        continue;
    }
    const isArray = Array.isArray(taxonomyPages[i]);
    const categoryArray = isArray ? taxonomyPages[i] : [ taxonomyPages[i] ];
    for (let j = 0; j < categoryArray.length; j++) {
      taxonomies.push(slugify(categoryArray[j]));
    }
  }
  const taxonomy = [...new Set(taxonomies)];
  return taxonomy;
};

// get category metadata from frontmatter files in src/content/categories
export const getCategoryMeta = (folder = "src/content/categories") => {
  const filesPath = fs.readdirSync(folder).filter((file) => file.endsWith(".md"));
  return filesPath.map((filename) => {
    const slug = filename.replace(".md", "");
    const pageData = fs.readFileSync(path.join(folder, filename), "utf-8");
    const { data: frontmatter } = matter(pageData);
    return { slug, ...frontmatter };
  });
};
