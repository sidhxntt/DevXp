module.exports = {
  apps: [
    {
      name: 'producer', 
      script: 'dist/server.js', 
      instances: 1,
      autorestart: true, 
      watch: false,
      max_memory_restart: '500M', 
    },
    {
      name: 'worker', 
      script: 'dist/utils/worker.js', 
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '400M',
    },
  ],
};
