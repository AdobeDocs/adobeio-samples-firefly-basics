/*
* Upload a file to the Files SDK
*/

/**
 * Sample curl request
 *
 * curl --location --request POST 'https://my-namespace.adobeioruntime.net/api/v1/web/my-app-0.0.1/uploadfile' \
 * --header 'Content-Type: application/json' \
 * --data-raw '{
 *     "fileUrl": "https://url.of.file",
 *     "fileLocation": "/mydir/test.csv"
 * }'
 */
const { Core, Files } = require('@adobe/aio-sdk')
const fetch = require('node-fetch')
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../../utils')

// main function that will be executed by Adobe I/O Runtime
async function main (params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

  try {
    // 'info' is the default level if not set
    logger.info('Calling the main action')

    // log parameters, only if params.LOG_LEVEL === 'debug'
    logger.debug(stringParameters(params))

    // check for missing request input parameters and headers
    const requiredParams = ['fileUrl', 'fileLocation']
    const requiredHeaders = []
    const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger)
    }

    const originalFile = await fetch(params.fileUrl)

    const files = await Files.init()
    logger.info('File SDK init done')
    const fileLocation = params.fileLocation
    await files.write(fileLocation, originalFile.body)
    const props = await files.getProperties(fileLocation)
    logger.debug(JSON.stringify(props))

    const response = {
      statusCode: 200,
      body: {}
    }

    // log the response status code
    logger.info(`${response.statusCode}: successful request`)
    return response
  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error', logger)
  }
}

exports.main = main
