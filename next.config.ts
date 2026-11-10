import os from "os";
import type { NextConfig } from "next";

const localIPs = Object.values(os.networkInterfaces())
  .flat()
  .filter((iface): iface is os.NetworkInterfaceInfo =>
    Boolean(iface && iface.family === "IPv4" && !iface.internal)
  )
  .map((iface) => iface.address);

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: [
    "10.255.252.92",
    "10.255.252.135",
    "10.255.252.85",
    "10.255.252.91",
    ...localIPs,
  ],
  images: {
    unoptimized: true,
    qualities: [75, 95],
  },
};

export default nextConfig;
