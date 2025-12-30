import { motion } from "framer-motion";
import { brand } from "../utils/helpers";
import { CAST_RESOURCES, CAST_LISTS } from "../data/castResources";
import Shell from "../components/Shell";

export default function Cast() {
  const resources = CAST_RESOURCES;
  const castLists = CAST_LISTS;

  const fileKind = (item) => {
    if (item?.fileType) return item.fileType.toLowerCase();
    const url = item?.href || "";
    if (/\.(png|jpe?g|gif|webp|avif)$/i.test(url)) return "image";
    if (/\.pdf($|\?)/i.test(url)) return "pdf";
    return "link";
  };

  return (
    <Shell>
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Cast Hub</h2>
          <p className="max-w-3xl text-neutral-300">
            Share rehearsal resources, announcements, and official cast lists with your actors and families. Update the
            data arrays inside <code>App.jsx</code> so this page always reflects the latest shows.
          </p>
        </section>

        <section>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold">Quick Resources</h3>
              <p className="text-neutral-300">
                Link out to Google Drive folders, rehearsal tracks, calendars, or any shared documents.
              </p>
            </div>
            <span className="text-sm uppercase tracking-wide text-neutral-500">Edit `CAST_RESOURCES`</span>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {resources.length ? (
              resources.map((resource) => (
                <motion.article
                  key={resource.title}
                  whileHover={{ y: -3 }}
                  className="flex h-full flex-col justify-between rounded-2xl border bg-neutral-950/70 p-6"
                  style={{ borderColor: `${brand.purple}33` }}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-lg font-semibold text-neutral-100">{resource.title}</h4>
                        {resource.updated && (
                          <p className="text-sm text-neutral-400">Updated {resource.updated}</p>
                        )}
                      </div>
                      <a
                        href={resource.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-full border border-neutral-700 px-3 py-1 text-sm font-semibold text-neutral-200 hover:border-neutral-500 hover:text-white sm:w-auto"
                      >
                        Open
                      </a>
                    </div>
                    {resource.description && (
                      <p className="text-base leading-relaxed text-neutral-300">{resource.description}</p>
                    )}
                    {Array.isArray(resource.highlights) && resource.highlights.length > 0 && (
                      <ul className="space-y-2 text-sm text-neutral-300">
                        {resource.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: brand.yellow }} />
                            <span className="flex-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-neutral-700/70 bg-neutral-950/60 p-6 text-neutral-300">
                No resources yet. Add entries to `CAST_RESOURCES` with `title`, `href`, and optional `description` fields.
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold">Cast Lists &amp; Announcements</h3>
              <p className="text-neutral-300">
                Drop PDF announcements or link to graphics so everyone can confirm their role assignments right away.
              </p>
            </div>
            <span className="text-sm uppercase tracking-wide text-neutral-500">Edit `CAST_LISTS`</span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {castLists.length ? (
              castLists.map((list) => {
                const kind = fileKind(list);
                const isImage = kind === "image";
                const isPdf = kind === "pdf";
                return (
                  <motion.article
                    key={list.title}
                    whileHover={{ y: -3 }}
                    className="rounded-2xl border bg-neutral-950/70 p-6"
                    style={{ borderColor: `${brand.yellow}33` }}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-lg font-semibold text-neutral-100">{list.title}</h4>
                          {list.updated && <p className="text-sm text-neutral-400">Updated {list.updated}</p>}
                        </div>
                        <a
                          href={list.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-neutral-700 px-3 py-1 text-sm font-semibold text-neutral-200 hover:border-neutral-500 hover:text-white sm:w-auto"
                        >
                          View
                          <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M12.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-8 8a1 1 0 01-.497.263l-5 1a1 1 0 01-1.18-1.18l1-5a1 1 0 01.263-.497l8-8zM5 13l-1 3 3-1 7.293-7.293-2-2L5 13z" />
                          </svg>
                        </a>
                      </div>
                      {list.description && (
                        <p className="text-base leading-relaxed text-neutral-300">{list.description}</p>
                      )}

                      {isImage && (
                        <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/60">
                          <img src={list.href} alt={`${list.title} cast list`} className="w-full object-cover" />
                        </div>
                      )}

                      {isPdf && (
                        <div className="rounded-xl border border-dashed border-neutral-700/60 bg-neutral-900/60 px-4 py-6 text-sm text-neutral-300">
                          PDF preview not shown here. The button above opens the document in a new tab. If you prefer an embed, swap
                          the share link for a Google Drive preview link ending with <code>/preview</code>.
                        </div>
                      )}

                      {!isImage && !isPdf && (
                        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-5 text-sm text-neutral-300">
                          This entry links to an external resource. Families can tap “View” to open it.
                        </div>
                      )}

                      {Array.isArray(list.notes) && list.notes.length > 0 && (
                        <ul className="space-y-2 text-sm text-neutral-300">
                          {list.notes.map((note) => (
                            <li key={note} className="flex items-start gap-2">
                              <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: brand.yellowDark }} />
                              <span className="flex-1">{note}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.article>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-neutral-700/70 bg-neutral-950/60 p-6 text-neutral-300">
                No cast lists yet. Add entries to `CAST_LISTS` with a `href` pointing to a Google Drive PDF, Doc, or image.
              </div>
            )}
          </div>
        </section>
      </div>
    </Shell>
  );
}
