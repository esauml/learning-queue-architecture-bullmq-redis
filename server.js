import express from "express";
import { addTemplateEngineJob } from "./job.producer.js";

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/template", async (req, res) => {
	// from name from json payload
	const { name } = req.body;
	try {
		const html = await addTemplateEngineJob(name);
		res.send(html);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
