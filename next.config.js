/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    token: 'KUpHuq5z-FrNcsymbthiFad9LmMUaAA1Mkk6ycV9laUOutom0akqGL3WIHruq7Ys3N8iwULqyax3k1W9duUCRcACogadhdroEuZl9KtkaELTnypd3-Gkh_Vf6RbsYnYx',
    baseUrl:'http://localhost:3001/'  
  },
  images: {
    minimumCacheTTL: 120,
  },
}

module.exports = nextConfig
