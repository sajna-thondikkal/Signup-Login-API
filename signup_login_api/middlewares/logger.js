const pino = require('pino');
const pinoLogger = require('pino-http');
const { randomUUID } = require('node:crypto');
const logger = pinoLogger({
    logger:pino(),
    genReqId: function (req,res) {
        const existingId = req.id ?? req.headers["x-request-id"];
        if(existingId) return existingId;
        const id = randomUUID();
        res.setHeader('x-request-id',id);
        return id;
    },
})
module.exports = logger;