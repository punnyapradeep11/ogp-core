const express = require('express');
const router = express.Router();
const successResponse = require('../middleware/default-response').successResponse
const errorResponse = require('../middleware/default-response').errorResponse

const urlParsingService = require('../services/urlParsing-service');

module.exports.extractUrlMetaData = async (req, res) => {
    urlParsingService.parseUrl(req.body.url)
    .then((result) => {
        successResponse(res, result)
    },(err) => {
        errorResponse(res, err);
    });
}




