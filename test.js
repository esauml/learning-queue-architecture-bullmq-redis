import { addTemplateEngineJob } from "./job.producer.js";

addTemplateEngineJob("World")
	.then((html) => {
		console.log(html);
	})
	.catch((err) => {
		console.error(err);
	});
