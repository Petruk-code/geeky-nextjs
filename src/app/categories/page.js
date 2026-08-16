import config from "@config/config.json";
import SeoMeta from "@layouts/partials/SeoMeta";
import ImageFallback from "@layouts/components/ImageFallback";
import { getSinglePage } from "@lib/contentParser";
import { getCategoryMeta, getTaxonomy } from "@lib/taxonomyParser";
import { humanize, markdownify, slugify } from "@lib/utils/textConverter";
import { sortByDate } from "@lib/utils/sortFunctions";
import Link from "next/link";
import { FaFolder } from "react-icons/fa";

const { blog_folder } = config.settings;

const palettes = [
  {
    overlay: "from-teal-600/90 via-teal-600/30 to-transparent",
    bg: "from-teal-600 to-emerald-500",
  },
  {
    overlay: "from-blue-600/90 via-blue-600/30 to-transparent",
    bg: "from-blue-600 to-indigo-500",
  },
  {
    overlay: "from-purple-600/90 via-purple-600/30 to-transparent",
    bg: "from-purple-600 to-fuchsia-500",
  },
  {
    overlay: "from-orange-500/90 via-orange-500/30 to-transparent",
    bg: "from-orange-500 to-amber-500",
  },
  {
    overlay: "from-rose-500/90 via-rose-500/30 to-transparent",
    bg: "from-rose-500 to-red-500",
  },
  {
    overlay: "from-cyan-600/90 via-cyan-600/30 to-transparent",
    bg: "from-cyan-600 to-sky-500",
  },
  {
    overlay: "from-emerald-600/90 via-emerald-600/30 to-transparent",
    bg: "from-emerald-600 to-green-500",
  },
  {
    overlay: "from-pink-600/90 via-pink-600/30 to-transparent",
    bg: "from-pink-600 to-rose-500",
  },
];

const paletteIndex = (name) =>
  name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) %
  palettes.length;

const Categories = async () => {
  const posts = getSinglePage(`src/content/${blog_folder}`);
  const categories = getTaxonomy(`src/content/${blog_folder}`, "categories");
  const meta = getCategoryMeta();

  const categoriesWithPostsCount = categories
    .map((category) => {
      const filteredPosts = posts.filter((post) =>
        post.frontmatter.categories.map((e) => slugify(e)).includes(category)
      );
      const metaItem = meta.find((item) => item.slug === category);
      return {
        name: category,
        title: metaItem?.title || humanize(category),
        posts: filteredPosts.length,
        cover:
          metaItem?.image || sortByDate(filteredPosts)[0]?.frontmatter.image,
        description: metaItem?.description,
      };
    })
    .sort((a, b) => b.posts - a.posts);

  return (
    <>
      <SeoMeta pathname="/categories" title="Kategori" />
      <section className="section">
        <div className="container">
          <div className="mb-6 text-center">
            {markdownify("Kategori", "h1", "h2")}
            <p className="mt-1 text-text-light dark:text-darkmode-text">
              Jelajahi artikel berdasarkan topik
            </p>
          </div>
          <div className="row">
            {categoriesWithPostsCount.map((category, i) => {
              const palette = palettes[paletteIndex(category.name)];
              return (
                <div
                  key={`category-${i}`}
                  className="mt-4 block md:col-6 lg:col-4 xl:col-3"
                >
                  <Link
                    href={`/categories/${category.name}`}
                    className="group relative block h-full overflow-hidden rounded-xl shadow-sm transition-shadow hover:shadow-lg"
                  >
                    {category.cover ? (
                      <ImageFallback
                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={category.cover}
                        alt={category.title}
                        width={400}
                        height={280}
                      />
                    ) : (
                      <div
                        className={`flex h-48 w-full items-center justify-center bg-gradient-to-t ${palette.bg} text-h4 text-white`}
                      >
                        <FaFolder />
                      </div>
                    )}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${palette.overlay} transition-colors`}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3.5">
                      <div className="flex items-end justify-between gap-2">
                        <h3 className="text-lg text-white [text-shadow:0_1px_3px_rgba(0,0,0,.6)]">
                          {category.title}
                        </h3>
                        <span className="shrink-0 rounded-full bg-white/25 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur">
                          {category.posts} artikel
                        </span>
                      </div>
                      {category.description && (
                        <p className="mt-1 line-clamp-2 text-xs leading-snug text-white/85 [text-shadow:0_1px_2px_rgba(0,0,0,.6)]">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
