import { useEffect, useState } from "react";

type GalleryItem = {
  image: string;
  description: string;
  category?: string;
};

type GalleryContent = {
  background: string;
  header: string;
  description: string;
  gallery: GalleryItem[];
};

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json();
}

export default function Gallery() {
  const [content, setContent] = useState<GalleryContent | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Activities");

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchJSON<GalleryContent>(
          `${import.meta.env.BASE_URL}content/gallery.json`
        );
        setContent(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  if (!content) return null;

const categories: string[] = Array.from(
  new Set(
    content.gallery
      .map((item) => item.category)
      .filter((c): c is string => Boolean(c))
  )
).sort();
  // filter logic
  const filteredGallery =
    selectedCategory === "All Activities"
      ? content.gallery
      : content.gallery.filter((item) => item.category === selectedCategory);

  return (
    <>
      <section
        className="py-20 relative w-full md:min-h-[520px] flex flex-col items-center justify-center gap-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${
            import.meta.env.BASE_URL
          }${content.background.replace(/^\//, "")})`,
        }}
      >
        <div className="absolute inset-0 bg-white/70"></div>
        <div className="relative z-10 flex flex-col items-center gap-6 px-6">
          <h1 className="md:text-5xl text-3xl font-semibold font-merriweather max-w-3xl text-center text-gray-900">
            {content.header}
          </h1>
          <p className="text-md font-open-sans max-w-4xl text-center text-gray-700">
            {content.description}
          </p>
        </div>
      </section>

      {/* Categories */}
      <div className="w-full flex flex-row items-center justify-center">
        <h1 className="md:text-5xl text-3xl font-merriweather text-justify mt-20">
          Our Activities and Events
        </h1>
      </div>
      <div className="flex flex-wrap gap-3 justify-center my-10">
        <button
          onClick={() => setSelectedCategory("All Activities")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedCategory === "All Activities"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          All Activities
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Gallery Grid */}
      <div className="w-full flex justify-center md:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 w-full">
          {filteredGallery.map((item, i) => (
            <div
              key={i}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={`${import.meta.env.BASE_URL}${item.image.replace(
                  /^\//,
                  ""
                )}`}
                alt={item.description || "Gallery image"}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              {item.description && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-center px-4 text-sm md:text-base font-open-sans">
                    {item.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
