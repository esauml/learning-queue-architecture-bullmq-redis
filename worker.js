import { Worker } from "bullmq";

const queueOptions = {
	connection: {
		host: "redis",
		port: 6379,
	},
};

const JOB = "templateEngine";

const registerWorker = (workerCallback) => {
	return new Worker(JOB, workerCallback, queueOptions);
};

// add worker named templateEngine that returns a simple html template
const worker = registerWorker(async (job) => {
	const { name } = job.data;

	console.log(`Processing job ${job.id} with data ${job.data}`);

	const html = `
	<html>
		<head>
			<title>Template Engine</title>
		</head>
		<body>
			<h1>Hello ${name}</h1>
		</body>
	</html>
	`;

	return html;
});

worker.on("completed", (job) => {
	console.log(`${job.id} has completed!`);
});

worker.on("failed", (job, err) => {
	console.log(`${job.id} has failed with ${err.message}`);
});
