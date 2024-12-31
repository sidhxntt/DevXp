# DEVXP 
## ( MODERN TECH BLOG SPA )
### Design Pattern 
 > - Client -> UI
 > - Client -> subscribe(email) -> stores in db 
 > - Content added -> webhook -> push email & other metadata to queue -> worker to process and send mails to user for new content

### Techstack (Development)
1. #### Frontend:
- Vitejs (focus on CSR as UI intensive)
- Accertenity UI with tailwind CSS
- input using react hook form
- recoil for state management
- Headless CMS (contentful)

2. #### Backend: 
- Express - ts node(nodemon)
- supabase with prisma ORM
- BullMQ for queue for server offloading (redis cloud)
- Nodemailer for emails
- docker for containerisation
- pm2 to run producer and worker as different processes in same server 
- contentful webhook with ngrok
---
### Techstack (Production) STEPS
1. #### Backend:
- Buying Domain devxp.in Godaddy
- Making AWS VPC with 2 private and public subnets in 2 different AZs for fault tolerance with IGW, NAT Gateway, EC2 Connect Endpoint, S3 enpoint
- Creating EC2 instance in private instance with security groups allowing port 4000,443,80 & 22 and connecting to it running following cmds:

``` bash
sudo apt update
sudo apt upgrade
sudo apt-get install unzip
curl -fsSL https://bun.sh/install | bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash
sudo apt-get install -y docker.io
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose  && docker-compose --version
sudo docker-compose up
```
- Issuing a certificate for api.devxp.in through AWS ACM by copying CNAME name & CNAME Value for the subdomain given by ACM in go daddy in the add records section of domain in godaddy.
- Creating target group of instance type where http pointing to 4000 and health check on /
- Creating AWS ALB listening to https:443 routing to http:<ec2-private-ip>:4000
- Pointing https://api.devxp.in towards ALB's name through cname (godaddy)
- Updating contentful webhook endpoint from ngrok url to api.devxp.in

2. #### Frontend:
 - updating .env file
 - `npm run build` to create dist folder and uploading it to netlify as manual upload with no CI/CD for this
 - Assigning app.devxp.in to netlify default url for the app and notifying to netlify

> devxp.in -> app.devxp-> netlify CDN -> netlify load balancer -> Netlify WebServer -> api.devxp.in -> AWS ALB -> EC2