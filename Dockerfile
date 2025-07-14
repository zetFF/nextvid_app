# Gunakan image Node.js resmi
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Salin file konfigurasi
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file proyek
COPY . .

# Build aplikasi
RUN npm run build

# Jalankan Next.js dalam mode production
CMD ["npm", "start"]
