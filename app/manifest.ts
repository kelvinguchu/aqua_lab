import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aquatreat Lab",
    short_name: "Aquatreat Lab",
    description: "Water & Effluent Treatment Specialists",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0086CB",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
