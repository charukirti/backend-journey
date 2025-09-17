import { nanoid } from "nanoid";
import URL from "../models/url.js";
import { AppError } from "../middlewares/errorHandlers.js";

async function handleGenerateNewShortURL(req, res, next) {
    try {

        // for debug error

        console.log('Full req.body:', req.body);
        console.log('Type of req.body:', typeof req.body);
        console.log('req.body.url:', req.body.url);
        console.log('Type of req.body.url:', typeof req.body.url);

        const body = req.body;

        if (!body.url) {
            throw new AppError('URL is required', 400);
        }

        const shortId = nanoid(8);

        await URL.create({
            shortId,
            redirectURL: body.url
        });

        return res.status(201).json({
            message: 'URL shortened successfully',
            shortId
        });
    } catch (error) {
        next(error);
    }
}



// get url/ redirect url

async function handleRedirectUrl(req, res, next) {
    try {
        const shortId = req.params.shortID;

        const entry = await URL.findOneAndUpdate({ shortId }, {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        });


        res.redirect(entry?.redirectURL);
    } catch (error) {
        next(error);
    }
}


async function handleGetAnalytics(req, res, next) {
    try {
        const shortId = req.params.shortID;

        const result = await URL.findOne({ shortId });
        console.log(result); // null 


        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory
        });
    } catch (error) {
        next(error);
    }
}

export { handleGenerateNewShortURL, handleRedirectUrl, handleGetAnalytics };
