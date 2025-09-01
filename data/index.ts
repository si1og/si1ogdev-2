export const navbarData = {
	gallery: {
    text: 'Gallery',
    rote: 'gallery',
  },
  projects: {
    text: 'About',
    rote: 'about',
  }
}

export const socialLinks = [
  {
    name: 'Github',
    icon: 'github-icon',
    link: 'https://github.com/si1og',
    tooltip: 'si1og',
    sizes: [20,20]
  },
  {
    name: 'Telegram',
    icon: 'telegram',
    link: 'https://t.me/si1og',
    tooltip: 'si1og',
    sizes: [20,20]
  },
  // {
  //   name: 'Instagram',
  //   icon: 'instagram-icon',
  //   link: 'https://instagram.com/ia.semenov',
  //   tooltip: 'ia.semenov',
  //   sizes: [18,18]
  // },
  {
    name: 'Unsplash',
    icon: 'unsplash-icon',
    link: 'https://unsplash.com/@si1og',
    tooltip: '@si1og',
    sizes: [15,15]
  },
  {
    name: 'Mastodon',
    icon: 'mastodon-icon',
    link: 'https://mastodon.social/@si1og',
    tooltip: '@si1og (mastodon.social)',
    sizes: [21,21]
  },
  {
    name: 'Bluesky',
    icon: 'bluesky-icon',
    link: 'https://bsky.app/profile/si1og.bsky.social',
    tooltip: 'si1og.bsky.social',
    sizes: [20,20]
  },
]

export const licensing = [
  {
    name: 'Terms of Use',
    link: 'terms-of-use',
  }
]

export const findMyPhotosIn = [
  {
    name: 'Telegram',
    icon: 'telegram',
    link: 'https://t.me/si1og_phograhpy',
    sizes: [25,25]
  },
  {
    name: 'Unsplash',
    icon: 'unsplash-icon',
    link: 'https://unsplash.com/@si1og',
    sizes: [16,16]
  }
]

export const footerData = {
  author: 'Al Asad Nur Riyad',
  aboutAuthor:
    'Hi! I am Riyad, a Tech enthusiast, problem solver and software engineer. Currently working at Appscode Inc.',
  authorInterest:
    "I have a fair amount of knowledge of Javascript, Typescript, VueJs, and Nuxt. If you have an interesting idea, either open source or paid let's connect.",
  aboutTheSite:
    "This is a personal blog site built with Nuxt3, TailwindCSS, NuxtContent, Nuxt Icon. Currently it's deployed in Vercel.",
}

export const homePage = {
  name: 'Ilya Semenov',
  nameSubtitle: 'Computer programmer and photo enthusiast',
  title: 'Hi there!',
  description:
    'I\'m Ilya Semenov, an computer scince student and photo enthusiast at SPbPU. You can see some of my past works over here. Feel free to check them out. ',
}

export const homePageSocial = [
  {
    name: 'Github',
    icon: 'github-icon',
    link: '#',
    tooltip: 'si1og',
    sizes: [20,20]
  },
  {
    name: 'Discord',
    icon: 'discord-icon',
    link: 'copy-type',
    tooltip: '@si1og',
    sizes: [20,20]
  },
  {
    name: 'Mail',
    icon: 'mail',
    link: 'copy-type',
    tooltip: 'hi@si1og.ru',
    sizes: [20,20]
  }
]

export const seoData = {
  title: `Ilya Semenov`,
  ogTitle: `Ilya Semenov`,
  description: `Blog Nuxt.js app`,
  twitterDescription: ``,
  image:
    'https://res.cloudinary.com/dmecmyphj/image/upload/v1673548905/nuxt-blog/cover_ntgs6u.webp',
  mySite: 'https://si1ogdev.ru',
  twitterHandle: '@silog_',
  mailAddress: 'hi@s1og.ru',
}

export const siteMetaData = [
  {
    name: 'description',
    content: seoData.description,
  },
  // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
  { property: 'og:site_name', content: seoData.mySite },
  { property: 'og:type', content: 'website' },
  {
    property: 'og:url',
    content: seoData.mySite,
  },
  {
    property: 'og:title',
    content: seoData.ogTitle,
  },
  {
    property: 'og:description',
    content: seoData.description,
  },
  {
    property: 'og:image',
    content: seoData.image,
  },
  // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
  { name: 'twitter:site', content: seoData.twitterHandle },
  { name: 'twitter:card', content: 'summary_large_image' },
  {
    name: 'twitter:url',
    content: seoData.mySite,
  },
  {
    name: 'twitter:title',
    content: seoData.ogTitle,
  },
  {
    name: 'twitter:description',
    content: seoData.twitterDescription,
  },
  {
    name: 'twitter:image',
    content: seoData.image,
  },
]
