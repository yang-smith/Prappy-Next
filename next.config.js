/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
module.exports = {
    env: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      OPENAI_API_BASE: process.env.OPENAI_API_BASE,
    },
  };
  
