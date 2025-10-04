# MongoDB Atlas Setup Guide

## Setting up MongoDB Atlas for Portfolio Backend

### 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account or log in
3. Create a new organization (if needed)

### 2. Create a New Cluster

1. Click "Build a Database"
2. Choose **FREE** shared cluster (M0 Sandbox)
3. Select your preferred cloud provider and region
4. Choose cluster name (e.g., `portfolio-cluster`)
5. Click "Create Cluster"

### 3. Configure Database Access

1. Go to **Database Access** in the left sidebar
2. Click "Add New Database User"
3. Choose authentication method: **Password**
4. Username: `portfolio_user` (or your choice)
5. Password: Generate secure password or set custom
6. Database User Privileges: **Read and write to any database**
7. Click "Add User"

### 4. Configure Network Access

1. Go to **Network Access** in the left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your server's specific IP address
5. Click "Confirm"

### 5. Get Connection String

1. Go to **Database** in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select **Java** driver and version **4.3 or later**
5. Copy the connection string

Example connection string:
```
mongodb+srv://portfolio_user:<password>@portfolio-cluster.abc123.mongodb.net/?retryWrites=true&w=majority
```

### 6. Configure Application

#### For Local Development
Update `application.properties`:
```properties
spring.data.mongodb.uri=mongodb+srv://portfolio_user:YOUR_PASSWORD@portfolio-cluster.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
spring.data.mongodb.database=portfolio
```

#### For Production Deployment
Set environment variables:
```bash
MONGODB_URI=mongodb+srv://portfolio_user:YOUR_PASSWORD@portfolio-cluster.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
MONGODB_DATABASE=portfolio
```

### 7. Test Connection

1. Start your Spring Boot application
2. Check logs for successful MongoDB connection
3. Visit your API endpoints to verify data is being stored

### 8. Security Best Practices

1. **Use strong passwords** for database users
2. **Restrict IP access** to only necessary addresses
3. **Use environment variables** for sensitive data
4. **Enable database auditing** in production
5. **Regular backup** your database

### 9. MongoDB Atlas Features

- **Free tier**: 512MB storage, shared RAM and vCPU
- **Monitoring**: Built-in performance metrics
- **Backup**: Point-in-time recovery
- **Security**: Encryption at rest and in transit
- **Global clusters**: Multi-region deployment

### 10. Alternative: Local MongoDB

For development without Atlas:
```bash
# Using Docker
docker run -d --name mongodb -p 27017:27017 mongo:6-jammy

# Using Docker Compose
npm run docker:dev
```

## Environment Variables

Create `.env` file in backend directory:
```env
MONGODB_URI=mongodb+srv://your-connection-string
MONGODB_DATABASE=portfolio
```

## Troubleshooting

### Common Issues:

1. **Connection timeout**: Check network access whitelist
2. **Authentication failed**: Verify username/password
3. **Database not found**: Will be created automatically on first write
4. **SSL/TLS errors**: Ensure connection string includes SSL options

### Useful MongoDB Atlas Commands:

```javascript
// View collections
show collections

// View projects
db.projects.find().pretty()

// View contacts
db.contacts.find().pretty()

// Count documents
db.projects.countDocuments()
db.contacts.countDocuments()
```

## MongoDB Compass (GUI Tool)

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Use the same connection string to connect
3. Browse and manage your data visually

---

Your MongoDB Atlas database is now ready for your Portfolio application! 🚀