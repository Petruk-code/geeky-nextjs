"use client";

import SeoMeta from "@layouts/partials/SeoMeta";
import { slugify } from "@lib/utils/textConverter";
import Post from "@partials/Post";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useSearchContext } from "src/context/state";

const SearchContent = () => {
  const searchParams = useSearchParams();
  const keyword = slugify(searchParams.get("key") || "");
  const { posts } = useSearchContext();

  const searchResults = posts.filter((product) => {
    if (product.frontmatter.draft) {
      return !product.frontmatter.draft;
    }
    if (slugify(product.frontmatter.title).includes(keyword)) {
      return product;
    } else if (
      product.frontmatter.categories.find((category) =>
        slugify(category).includes(keyword)
      )
    ) {
      return product;
    } else if (slugify(product.content).includes(keyword)) {
      return product;
    }
  });

  return (
    <>
      <SeoMeta
        pathname="/search"
        title={`Hasil pencarian untuk ${searchParams.get("key")}`}
      />
      <div className="section">
        <div className="container">
          <h1 className="h2 mb-6 text-center">
            Hasil pencarian untuk{" "}
            <span className="text-primary">{searchParams.get("key")}</span>
          </h1>
          {searchResults.length > 0 ? (
            <div className="row">
              {searchResults.map((post, i) => (
                <div key={`key-${i}`} className="col-12 mb-6 sm:col-6">
                  <Post post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-h3 shadow">
              Hasil Pencarian Tidak Ditemukan
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={<div>Memuat...</div>}>
      <SearchContent />
    </Suspense>
  );
};

export default SearchPage;
