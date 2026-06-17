// Base URL for stored penguin images.
// Project is archived: images live in a public GitHub repo, served by jsDelivr.
// Override via NEXT_PUBLIC_IMAGE_CDN_BASE if the repo/tag/host ever changes.
export const IMAGE_CDN_BASE =
  process.env.NEXT_PUBLIC_IMAGE_CDN_BASE ??
  "https://cdn.jsdelivr.net/gh/kirilinsky/penguin-archive@v1";
