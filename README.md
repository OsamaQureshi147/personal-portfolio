# Developer Portfolio

A modern, responsive developer portfolio website built with Next.js 15, featuring an interactive 3D technology sphere, Sanity CMS integration, and elegant animations.

## ✨ Features

- **Modern Design**: Clean, professional layout with orange theme and gradient effects
- **Interactive 3D Elements**: Floating technology sphere with brand-colored icons
- **Content Management**: Sanity CMS integration for blog posts and projects
- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark/Light Mode**: Theme switching with seamless transitions
- **Performance Optimized**: Static Site Generation (SSG) and Incremental Static Regeneration (ISR)
- **TypeScript**: Full type safety throughout the application
- **SEO Optimized**: Meta tags, structured data, and performance best practices

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Three.js** - 3D graphics and animations
- **React Three Fiber** - React renderer for Three.js

### CMS & Backend
- **Sanity** - Headless CMS for content management
- **Next Sanity** - Official Sanity integration for Next.js

### UI Components
- **shadcn/ui** - Beautiful, accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Beautiful icon library

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Sanity account (for CMS features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/developer-portfolio.git
cd developer-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with your Sanity credentials:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog pages and posts
│   ├── contact/           # Contact page
│   ├── projects/          # Projects pages
│   └── studio/            # Sanity Studio
├── components/            # Reusable components
│   ├── 3d/               # Three.js 3D components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Other components
├── lib/                  # Utility functions and configurations
│   ├── sanity.ts         # Sanity client configuration
│   ├── sanity.queries.ts # GROQ queries
│   └── utils.ts          # Helper functions
└── hooks/                # Custom React hooks
```

## 🎨 Key Components

### Interactive 3D Technology Sphere
- Displays technology skills as floating, brand-colored icons
- Smooth rotation and individual floating animations
- Built with Three.js and React Three Fiber

### Dynamic Content Management
- Blog posts and projects managed through Sanity CMS
- Real-time preview capabilities
- Structured content with rich text support

### Responsive Design System
- Mobile-first approach with Tailwind CSS
- Consistent spacing, typography, and color schemes
- Dark/light mode support

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically with each push

### Other Platforms
- **Netlify**: Connect GitHub repo and deploy
- **Railway**: Support for full-stack applications
- **AWS Amplify**: Scalable hosting with CI/CD

## 🔧 Configuration

### Sanity Setup
1. Create a new Sanity project at [sanity.io](https://sanity.io)
2. Configure your schemas in `sanity.schema.ts`
3. Deploy your Sanity Studio: `npm run build:sanity`

### Customization
- **Colors**: Modify the orange theme in `tailwind.config.ts`
- **Content**: Update personal information in page components
- **3D Elements**: Customize technologies in `src/components/3d/CodeSphere.tsx`

## 📝 Content Management

### Adding Blog Posts
1. Navigate to `/studio` in your browser
2. Create new blog posts with rich content
3. Posts automatically appear on the blog page

### Managing Projects
1. Add projects through Sanity Studio
2. Include technologies, links, and descriptions
3. Projects display on the homepage and projects page

## 🔍 SEO & Performance

- **Core Web Vitals**: Optimized for excellent performance scores
- **Meta Tags**: Dynamic SEO meta tags for all pages
- **Structured Data**: Rich snippets for better search visibility
- **Image Optimization**: Next.js Image component with lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Sanity** - For the powerful CMS platform
- **shadcn** - For the beautiful component library
- **Three.js Community** - For 3D graphics capabilities

## 📞 Contact

- **Portfolio**: [Your Portfolio URL]
- **LinkedIn**: [Your LinkedIn]
- **Email**: [Your Email]
- **GitHub**: [Your GitHub]

---

Built with ❤️ using Next.js and modern web technologies.