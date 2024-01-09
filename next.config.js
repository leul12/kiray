/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        appDir:'experimental'
    },
    images:{
        domains:[
            "lh3.googleusercontent.com",
            "res.cloudinary.com",
            
        ]
    }
}

module.exports = nextConfig
