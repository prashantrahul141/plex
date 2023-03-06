<br>
<a href='#'>
<p align="center">
   <img width="100" src="https://raw.githubusercontent.com/prashantrahul141/plex/main/public/icons/icon-512x512.png" alt="Site Icon">
</p>
</a>

<h1 align='center'>Plex</h1>

<h6 align='center'>Plex is a fully featured social media application for getting together with people.</h6>
<br>

<a href='#'>
<img alt='Tests' src='https://github.com/prashantrahul141/plex/actions/workflows/integrate.yml/badge.svg'/>
</a>

### Table of contents

- [Installation & Setup](#️-installation--set-up)
- [Screenshots](#️-screenshots)
- [Technologies used](#-technologies-used)

### 🛠️ Installation & Set Up

1. Clone the repo

```sh
git clone https://github.com/prashantrahul141/plex.git
```

2. Add env file using these vars:

```sh
# Prisma
DATABASE_URL=mysql db url

# Next Auth
# You can generate the secret via https://generate-secret.vercel.app/32
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Next Auth Discord Provider
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

# Github
G_GITHUB_CLIENT_ID=
G_GITHUB_CLIENT_SECRET=

# Google
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUDNAME=
NEXT_PUBLIC_CLOUDINARY_CLOUDAPIKEY=
NEXT_PUBLIC_CLOUDINARY_ENDPOINT=https://api.cloudinary.com/v1_1
CLOUDINARY_CLOUDAPISECRET=
```

You can see these docs to learn how to create OAuth app for <a href='https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps'>Github</a>, <a href='https://developers.google.com/identity/protocols/oauth2'>Google</a>, <a href='https://discord.com/developers/docs/topics/oauth2'>Discord</a>.

3. Install packages

```sh
npm i
```

<br>

### 🖼️ Screenshots

Home<br>
<img src="/public/static/meta/s-1.png" alt="screenshot" width="500"/><br>

Trending<br>
<img src="/public/static/meta/s-2.png" alt="screenshot" width="500"/><br>

Notifications<br>
<img src="/public/static/meta/s-3.png" alt="screenshot" width="500"/><br>

Bookmarks<br>
<img src="/public/static/meta/s-4.png" alt="screenshot" width="500"/><br>
<img src="/public/static/meta/s-4.5.png" alt="screenshot" width="500"/><br>

Profile<br>
<img src="/public/static/meta/s-5.png" alt="screenshot" width="500"/><br>

Create posts, upload images<br>
<img src="/public/static/meta/s-6.png" alt="screenshot" width="500"/><br>

Edit profile<br>
<img src="/public/static/meta/s-7.png" alt="screenshot" width="500"/><br>
<br>

Fully responsive<br>
<img src="/public/static/meta/s-8.png" alt="screenshot" width="500"/><br><br>
<img src="/public/static/meta/s-9.png" alt="screenshot" width="500"/><br><br>
<img src="/public/static/meta/s-10.png" alt="screenshot" width="500"/><br><br>
<img src="/public/static/meta/s-11.png" alt="screenshot" width="500"/><br><br>
<br>

### 💻 Technologies used

- [Next.js](https://nextjs.org)
- [tRPC](https://trpc.io)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://typescriptlang.org)
- [Prisma (with MySQL)](https://prisma.io)
- [NextAuth.js](https://next-auth.js.org)
- [Cloudinary](https://cloudinary.com/)
- [framer-motion](https://www.framer.com/motion/)
