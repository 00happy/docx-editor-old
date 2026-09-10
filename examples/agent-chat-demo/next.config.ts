import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@ucontract/docx-editor-react', '@ucontract/docx-editor-core'],
};

export default nextConfig;
