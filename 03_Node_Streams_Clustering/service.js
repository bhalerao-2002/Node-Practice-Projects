//This is main file and covering Clustering
const http = require('http');
const cluster = require('node:cluster');
//Maximum number of nodes we can create in cluster of Node servers is equal to number of CPU cores.
const numCpus = require('os').availableParallelism();

//we will make one primary Node Server which will act like load balancer. Note that primary Node Server will not resolve requests it will only resolve In which node server this request should go on.

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else { //if node server is not main cluster then our APP node server will run.
    require("./index.js");
}