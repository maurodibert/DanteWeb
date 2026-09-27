import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite abrir el servidor de desarrollo desde el celular en la misma red Wi-Fi
  // (http://<IP de la Mac>:3000). Solo afecta a `next dev`.
  allowedDevOrigins: ["192.168.0.179"],
};

export default nextConfig;
