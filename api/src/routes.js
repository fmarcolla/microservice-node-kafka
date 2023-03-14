import express from 'express';

const routes = express.Router();

routes.post('/certifications', async (req, res) => {
    

    return res.json({ ok: true});
});

export default routes;