# Deploying to Dokploy

Dokploy is an open-source self-hosted platform similar to Vercel/Netlify/Heroku. This guide covers deploying your React application to Dokploy.

## Prerequisites

### 1. Install Dokploy on Your VPS

SSH into your server and run:

```bash
curl -sSL https://dokploy.com/install.sh | sh
```

After installation:
- Access the dashboard at `http://your-server-ip:3000`
- Create an owner account
- Configure your domain in the Web Server menu

### 2. DNS Setup

Point an A record in your DNS settings to your server's IP:

```
Type: A
Name: @ (or subdomain like 'app')
Value: your.server.ip.address
TTL: Automatic or 3600
```

## Deployment Method 1: Application (Dockerfile) - Recommended

This method uses your Dockerfile directly and is simpler to manage.

### Steps

1. **Create New Project**
   - Go to Dokploy dashboard
   - Click "Create Project"
   - Name it (e.g., "ts-refresher")

2. **Create Application**
   - Inside your project, click "Create Application"
   - Choose **"Application"** type

3. **Connect Repository**
   - **Git Provider**: Select GitHub/GitLab/Bitbucket
   - **Repository**: Select your repository
   - **Branch**: Choose your branch (e.g., `master`)

4. **Build Configuration**
   - **Build Type**: Dockerfile
   - **Dockerfile Path**: `./Dockerfile`
   - **Build Context**: `.`
   - **Target Stage**: `production`
   - **Port**: `80`

5. **Environment Variables**
   Add your build-time variables (if needed):
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_SECRET=your_secret
   VITE_CLOUD_SUPABASE_URL=your_cloud_url
   VITE_CLOUD_SUPABSE_SECRET=your_cloud_secret
   VITE_AUTH_REDIR=your_redirect_url
   ```

6. **Domain Configuration**
   - **Domain**: Enter your domain (e.g., `app.yourdomain.com`)
   - **SSL**: Enable automatic SSL (Let's Encrypt)
   - Dokploy will automatically configure Traefik

7. **Resource Limits (Optional)**
   - **CPU Limit**: 0.5 cores
   - **Memory Limit**: 256M
   - **Memory Reservation**: 128M

8. **Deploy**
   - Click **"Deploy"** button
   - Monitor the build logs
   - Your app will be live at your domain once deployment completes

### Auto-Deploy from Git

Enable automatic deployments on git push:

1. Go to your application settings
2. Enable **"Auto Deploy"**
3. Dokploy will set up a webhook with your Git provider
4. Every push to your branch will trigger a deployment

## Deployment Method 2: Docker Compose

If you prefer using docker-compose features, use the included `dokploy.docker-compose.yml` file.

### Steps

1. **Create New Service**
   - Go to your project
   - Click "Create Service"
   - Choose **"Docker Compose"**

2. **Connect Repository**
   - Select your Git provider and repository
   - Choose branch

3. **Compose File Configuration**
   - **Compose File Path**: `./dokploy.docker-compose.yml`
   - Or paste the contents directly in the UI

4. **Update Domain in Compose File**
   Edit `dokploy.docker-compose.yml` and replace `your-domain.com`:
   ```yaml
   labels:
     - "traefik.http.routers.react-app.rule=Host(`your-actual-domain.com`)"
   ```

5. **Environment Variables**
   Add any required variables in the Dokploy UI

6. **Deploy**
   - Click **"Deploy"**
   - Dokploy will pull, build, and start your containers

## Dokploy Dashboard Features

### Monitoring

- **Real-time Logs**: View container logs in the dashboard
- **Metrics**: Monitor CPU, memory, and network usage
- **Health Checks**: Automatic health monitoring

### Management

- **Restart**: Restart your application
- **Rebuild**: Trigger a new build
- **Scale**: Scale containers (if using Docker Swarm)
- **Terminal**: Access container shell directly from dashboard

### Backups

Configure automatic backups in the dashboard:
- Schedule backups
- Set retention policies
- Download backup archives

## Custom nginx Configuration

If you need to modify nginx configuration:

1. Ensure `nginx.conf` is in your repository
2. It will be copied during build (as specified in Dockerfile)
3. Redeploy for changes to take effect

## Traefik Integration

Dokploy uses Traefik for routing and SSL. Your labels are already configured in `dokploy.docker-compose.yml`:

- **HTTP to HTTPS redirect**: Automatic
- **SSL certificates**: Auto-provisioned via Let's Encrypt
- **Load balancing**: Automatic if you scale containers

## Troubleshooting

### Build Fails

1. Check build logs in Dokploy dashboard
2. Verify Dockerfile path is correct
3. Ensure all dependencies are in package.json

### Health Check Failing

Your health check expects `/health` endpoint:
```
http://localhost/health
```

Ensure your nginx configuration serves this endpoint.

### Domain Not Accessible

1. Verify DNS records are propagated (use `dig your-domain.com`)
2. Check Traefik configuration in Dokploy
3. Ensure labels are correctly set
4. Check firewall allows ports 80 and 443

### Environment Variables Not Working

For Vite apps, remember:
- Variables must be prefixed with `VITE_`
- They're baked into the build at build-time
- Changing them requires a rebuild

### Port Issues

Ensure:
- Dockerfile exposes port 80: `EXPOSE 80`
- Dokploy application settings use port 80
- Traefik label specifies port 80: `traefik.http.services.react-app.loadbalancer.server.port=80`

## Useful Dokploy CLI Commands

If you have SSH access to your Dokploy server:

```bash
# View all containers
docker ps

# View logs
docker logs dokploy-app-name

# Restart Dokploy
docker restart dokploy

# View Dokploy logs
docker logs dokploy

# Check Traefik configuration
docker exec dokploy-traefik cat /etc/traefik/traefik.yml
```

## API Deployment (Advanced)

Deploy via Dokploy API:

```bash
curl -X POST https://your-dokploy.com/api/deploy \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "your-project-id",
    "applicationId": "your-app-id"
  }'
```

Get your API token from the Dokploy dashboard under Settings.

## Migration from Local Docker

If you're currently running locally with `run-container.sh`:

1. Push your code to Git repository
2. Follow "Deployment Method 1" above
3. Dokploy will handle the build and deployment
4. All docker-compose features (resource limits, security, health checks) are preserved in the Dockerfile and Dokploy configuration

## Resources

- **Dokploy Documentation**: https://docs.dokploy.com/
- **Dokploy GitHub**: https://github.com/Dokploy/dokploy
- **Community Discord**: Available on their website

## Next Steps

After successful deployment:

1. **Set up monitoring** - Configure alerts for downtime
2. **Configure backups** - Set up automated backups
3. **Add staging environment** - Create a separate app for testing
4. **Set up CI/CD** - Enable auto-deploy from your main branch
5. **Configure custom domain** - Add your production domain
6. **Enable HTTPS** - Dokploy handles Let's Encrypt automatically
