const http = require('http');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      // 执行指定的命令
      exec('git fetch --all && git reset --hard origin/main && git pull', (error, stdout, stderr) => {
        if (error) {
          console.error(`Command execution error: ${error}`);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Error executing command');
        } else {
          console.log(`Command executed successfully. Output: ${stdout}`);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Command executed successfully');
        }
      });
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(5103, '0.0.0.0', () => {
  console.log('Server is running on http://0.0.0.0:5103');
});

