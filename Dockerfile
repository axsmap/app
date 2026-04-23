FROM node:20-alpine
WORKDIR /app
# Set environment early
ENV NODE_ENV=production
# Install dependencies
COPY package.json ./
RUN npm i
# Copy full source
COPY . .
# Build app
RUN npm run build
# Create non-root user
#RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
# Adjust ownership (optional but safer)
#RUN chown -R nextjs:nodejs /app
#USER nextjs
EXPOSE 3000
CMD ["npm", "start"]