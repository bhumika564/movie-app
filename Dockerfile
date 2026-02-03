# 1. Base image (Node.js ka chhota version)
FROM node:20-alpine

# 2. Working directory set karna
WORKDIR /app

# 3. Dependencies copy aur install karna
COPY package*.json ./
RUN npm install

# 4. Baaki code copy karna
COPY . .

# 5. Next.js app ko build karna (Production ke liye)
RUN npm run build

# 6. Port expose karna
EXPOSE 3000

# 7. App start karna
CMD ["npm", "start"]