const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.send("Hello there!");
});

router.post("/", async function (req, res) {
    let reqBody;
    let reqHeaders;
    let eventBody;
    let eventHeaders;

    // TODO: Determine why new version of @vendia/serverless-express or express or node version is making req.body to be Buffer
    // issue: https://github.com/vendia/serverless-express/issues/347
    if (req.body instanceof Buffer) {
        console.log("body is Buffer");
        reqBody = JSON.parse(req.body.toString());
    } else {
        console.log("body is Object");
        reqBody = req.body;
    }

    if (req.apiGateway?.event?.body) {
        if (typeof req.apiGateway.event.body !== "object") {
            eventBody = JSON.parse(req.apiGateway.event.body);
        } else {
            eventBody = req.apiGateway.event.body;
        }
    }

    // Comparing headers
    reqHeaders = req.headers;
    eventHeaders = req.apiGateway?.event?.headers;


    return res.status(200).json({
        payload: {
            reqBody,
            reqHeaders,
            eventBody,
            eventHeaders,
        },
        name: reqBody?.name ?? eventBody.name ?? "-",
        time: +new Date(),
    });
});

router.post("/ip", async function (req, res) {
    let ip = "not found";
    const lambdaEvent = req.apiGateway?.event;
    if (req?.socket?.remoteAddress) {
        ip = req.socket.remoteAddress;
    } else if (lambdaEvent?.headers) {
        [ip] = lambdaEvent.headers["X-Forwarded-For"].split(",");
    }
    console.log(
        "req?.socket?.remoteAddress: %s req.ip: %s, req.ips: %s",
        req?.socket?.remoteAddress,
        req.ip,
        req.ips
    );
    console.log(lambdaEvent?.headers?.["X-Forwarded-For"]);
    return res.status(200).json({
        ip,
    });
});
module.exports = router;
