/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * Write a key-value pair into the State SDK
 *
 * Sample curl request:
 * curl --location --request POST 'https://my-namespace.adobeioruntime.net/api/v1/web/my-app-0.0.1/state-write' \
 * --header 'Content-Type: application/json' \
 * -- data-raw '{
 *     "key": "name",
 *     "value": "James Bond"
 * }'
 */
const { Core, State } = require('@adobe/aio-sdk')
const { errorResponse, stringParameters, checkMissingRequestInputs } = require('../../utils')

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
    const requiredParams = ['key', 'value']
    const requiredHeaders = []
    const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger)
    }
    
    const state = await State.init()
    const val = await state.get(params.key)
    let result
    // if key already exists, return its value
    if (val != null) {
      result = `reading ${params.key}=${val.value}`
    } 
    // else, save the k-v pair
    else {
      await state.put(params.key, params.value)
      result = `writing ${params.key}=${params.value}`
    }

    logger.debug(result)

    const response = {
      statusCode: 200,
      body: {
        key: params.key,
        value: params.value,
        message: result
      }
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
