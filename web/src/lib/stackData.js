const stackData = [
  {
    name: "React.js",
    logo: "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-1024.png",
  },
  {
    name: "Next.js",
    logo: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg",
  },
  { name: "Vue.js", logo: "https://cdn.worldvectorlogo.com/logos/vue-9.svg" },
  {
    name: "Nuxt.js",
    logo: "https://nuxt.com/assets/design-kit/icon-green.svg",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.worldvectorlogo.com/logos/typescript.svg",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.worldvectorlogo.com/logos/javascript-1.svg",
  },
  { name: "HTML5", logo: "https://cdn.worldvectorlogo.com/logos/html-1.svg" },
  { name: "CSS3", logo: "https://cdn.worldvectorlogo.com/logos/css-3.svg" },
  { name: "Sass", logo: "https://cdn.worldvectorlogo.com/logos/sass-1.svg" },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg",
  },
  {
    name: "Material UI",
    logo: "https://cdn.worldvectorlogo.com/logos/material-ui-1.svg",
  },
  {
    name: "Bootstrap",
    logo: "https://cdn.worldvectorlogo.com/logos/bootstrap-5-1.svg",
  },
  {
    name: "Webpack",
    logo: "https://cdn.worldvectorlogo.com/logos/webpack-icon.svg",
  },
  {
    name: "Framer Motion",
    logo: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
  },
  {
    name: "React Query",
    logo: "https://seeklogo.com/images/R/react-query-logo-1340EA4CE9-seeklogo.com.png",
  },
  {
    name: "Zustand",
    logo: "https://avatars.githubusercontent.com/u/695951?s=200&v=4",
  },
  {
    name: "Jest",
    logo: "https://static-00.iconduck.com/assets.00/jest-icon-1855x2048-ifiupldr.png",
  },

  // Backend
  {
    name: "Node.js",
    logo: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
  },
  {
    name: "Express",
    logo: "https://cdn.worldvectorlogo.com/logos/express-109.svg",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.worldvectorlogo.com/logos/postgresql.svg",
  },
  {
    name: "MySQL",
    logo: "https://download.logo.wine/logo/MySQL/MySQL-Logo.wine.png",
  },
  {
    name: "Prisma",
    logo: "https://cdn.worldvectorlogo.com/logos/prisma-3.svg",
  },
  {
    name: "Firebase",
    logo: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg",
  },
  {
    name: "Supabase",
    logo: "https://cdn.prod.website-files.com/655b60964be1a1b36c746790/655b60964be1a1b36c746d41_646dfce3b9c4849f6e401bff_supabase-logo-icon_1.png",
  },
  { name: "Redis", logo: "https://cdn.worldvectorlogo.com/logos/redis.svg" },
  {
    name: "RabbitMQ",
    logo: "https://static-00.iconduck.com/assets.00/rabbitmq-icon-484x512-s9lfaapn.png",
  },
  {
    name: "GraphQL",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/250px-GraphQL_Logo.svg.png",
  },
  { name: "NestJS", logo: "https://cdn.worldvectorlogo.com/logos/nestjs.svg" },
  {
    name: "FastAPI",
    logo: "https://cdn.worldvectorlogo.com/logos/fastapi.svg",
  },
  { name: "Docker", logo: "https://cdn.worldvectorlogo.com/logos/docker.svg" },
  {
    name: "Nginx",
    logo: "https://www.svgrepo.com/show/373924/nginx.svg",
  },
  { name: "AWS", logo: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
  {
    name: "Stripe",
    logo: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg",
  },
  { name: "Vercel", logo: "https://cdn.worldvectorlogo.com/logos/vercel.svg" },

  // Blockchain / Web3
  {
    name: "Solidity",
    logo: "https://cdn.worldvectorlogo.com/logos/solidity.svg",
  },
  {
    name: "Ethereum",
    logo: "https://cdn.worldvectorlogo.com/logos/ethereum-eth.svg",
  },
  {
    name: "Polygon",
    logo: "https://altcoinsbox.com/wp-content/uploads/2023/03/matic-logo.png",
  },
  {
    name: "Solana",
    logo: "./assets/icons/solana.svg",
  },
  {
    name: "Hardhat",
    logo: "https://seeklogo.com/images/H/hardhat-logo-888739EBB4-seeklogo.com.png",
  },
  {
    name: "The Graph",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo0p489sFlss7HSIKcPQOQoC0FdzyQ7AsGVg&s",
  },
  {
    name: "Chainlink",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQG7VLkgiQhDj-m-jmXN246LOJEtMaLAjEw&s",
  },
  {
    name: "WalletConnect",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAUpkrZvGNGglwLFW9FkIy9xQkczJAS5gTdA&s",
  },
  {
    name: "Metamask",
    logo: "https://cdn.worldvectorlogo.com/logos/metamask.svg",
  },

  // Python Ecosystem
  {
    name: "Python",
    logo: "https://cdn.worldvectorlogo.com/logos/python-5.svg",
  },
  {
    name: "Django",
    logo: "https://cdn.worldvectorlogo.com/logos/django.svg",
  },
  {
    name: "Flask",
    logo: "https://cdn.worldvectorlogo.com/logos/flask.svg",
  },
  {
    name: "Celery",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Celery_logo.png",
  },
  {
    name: "SQLAlchemy",
    logo: "https://cdn.worldvectorlogo.com/logos/sqlalchemy.svg",
  },
  {
    name: "Pandas",
    logo: "https://cdn.worldvectorlogo.com/logos/pandas.svg",
  },

  // Design Tools
  {
    name: "Figma",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1667px-Figma-logo.svg.png",
  },
  {
    name: "Adobe Photoshop",
    logo: "https://cdn.worldvectorlogo.com/logos/adobe-photoshop-2.svg",
  },
  {
    name: "Adobe After Effects",
    logo: "https://static.vecteezy.com/system/resources/previews/055/138/449/non_2x/adobe-after-effect-logo-square-rounded-adobe-after-effect-logo-adobe-after-effect-logo-free-download-free-png.png",
  },

  // Additional Web Technologies
  {
    name: "WebSocket",
    logo: "https://cdn.worldvectorlogo.com/logos/websocket.svg",
  },
  {
    name: "Socket.io",
    logo: "https://cdn.worldvectorlogo.com/logos/socket-io.svg",
  },
  {
    name: "WebRTC",
    logo: "https://cdn.worldvectorlogo.com/logos/webrtc.svg",
  },
  {
    name: "Apache",
    logo: "https://cdn.worldvectorlogo.com/logos/apache-13.svg",
  },
  {
    name: "Ansible",
    logo: "https://cdn.worldvectorlogo.com/logos/ansible.svg",
  },
  {
    name: "Jenkins",
    logo: "https://cdn.worldvectorlogo.com/logos/jenkins-1.svg",
  },
  {
    name: "Kubernetes",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/1200px-Kubernetes_logo_without_workmark.svg.png",
  },
];
export default stackData;
