import { QueueEvents, Queue } from "bullmq";

export function addTemplateEngineJob(name) {
	const queueOptions = {
		connection: {
			host: "redis",
			port: 6379,
		},
	};

	const queue = new Queue("templateEngine", queueOptions);
	const queueEvents = new QueueEvents("templateEngine", queueOptions);

	queue.add("templateEngine", { name });

	return new Promise((resolve, reject) => {
		queueEvents.on("completed", (job) => {
			queueEvents.close();
			resolve(job.returnvalue);
		});

		queueEvents.on("failed", (job, err) => {
			queueEvents.close();
			reject(err);
		});
	});
}
