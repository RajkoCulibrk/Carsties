/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        logging:{
            level: 'verbose',
        },
        serverActions: true
    },
    images:{
        domains:[
            "cdn.pixabay.com",
            "media.autoexpress.co.uk",
            "imgd-ct.aeplcdn.com",
        ]
    }
}

module.exports = nextConfig
