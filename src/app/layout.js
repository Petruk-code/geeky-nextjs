import Providers from "@/context/Providers";
import "@/styles/style.css";
import config from "@config/config.json";
import theme from "@config/theme.json";
import TwSizeIndicator from "@layouts/components/TwSizeIndicator";
import Footer from "@layouts/partials/Footer";
import Header from "@layouts/partials/Header";
import { getTaxonomy, getCategoryMeta } from "@lib/taxonomyParser";
import { humanize } from "@lib/utils/textConverter";

const { site } = config;
const { font_family } = theme.fonts;
const { favicon } = config.site;
const { blog_folder } = config.settings;

export const metadata = {
  title: site.title,
};

export default function RootLayout({ children }) {
  const categories = getTaxonomy(`src/content/${blog_folder}`, "categories");
  const categoryMeta = getCategoryMeta();
  const categoriesWithTitles = categories.map((category) => {
    const metaItem = categoryMeta.find((item) => item.slug === category);
    return { slug: category, title: metaItem?.title || humanize(category) };
  });

  return (
    <html lang="id" className="antialiased" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href={favicon} />
        <meta name="theme-name" content="geeky-nextjs" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${font_family.secondary}&family=${font_family.primary}&display=swap`}
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <Header categories={categories} />
          <main>{children}</main>
          <Footer />
        </Providers>
        <TwSizeIndicator />
      </body>
    </html>
  );
}
