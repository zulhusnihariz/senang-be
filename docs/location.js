/* -------------------------------------------------------------------------- */
/*                         OpenAPI 2.0 (a.k.a Swagger)                        */
/* -------------------------------------------------------------------------- */
/**
 * @swagger
 *
 * definitions:
 *    states:
 *      type: object
 *      properties:
 *        state_id:
 *          type: string
 *        state_name:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *    areas:
 *      type: object
 *      properties:
 *        area_id:
 *          type: string
 *        area_name:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *        state_id:
 *          type: string
 *    postcodes:
 *      type: object
 *      properties:
 *        postcode_id:
 *          type: string
 *        postcode_name:
 *          type: string
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *        state_id:
 *          type: string
 *        area_id:
 *          type: string
 * /states:
 *  get:
 *    tags:
 *      - Location
 *    description: Get all states
 *    responses:
 *      '200':
 *        description: Return an array of state
 *        schema:
 *          $ref: '#/definitions/states'
 *
 * /states/{state_id}:
 *  get:
 *    tags:
 *      - Location
 *    description: Get state by ID
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *            - state_id
 *          properties:
 *            state_id:
 *              type: string
 *    responses:
 *      '200':
 *        description: Return a state object
 *        schema:
 *          $ref: '#/definitions/states'
 *
 *
 * /areas:
 *  get:
 *    tags:
 *      - Location
 *    description: Get all areas
 *    responses:
 *      '200':
 *        description: Return an array of area
 *        schema:
 *          $ref: '#/definitions/areas'
 *
 * /areas/{area_id}:
 *  get:
 *    tags:
 *      - Location
 *    description: Get area by ID
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *            - area_id
 *          properties:
 *            area_id:
 *              type: string
 *    responses:
 *      '200':
 *        description: Return an area object
 *        schema:
 *          $ref: '#/definitions/areas'
 *
 * /postcodes:
 *  get:
 *    tags:
 *      - Location
 *    description: Get all postcodes
 *    responses:
 *      '200':
 *        description: Return an array of postcode
 *        schema:
 *          $ref: '#/definitions/postcodes'
 *
 * /postcodes/{postcode_id}:
 *  get:
 *    tags:
 *      - Location
 *    description: Get postcode by ID
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *            - postcode_id
 *          properties:
 *            postcode_id:
 *              type: string
 *    responses:
 *      '200':
 *        description: Return a postcode object
 *        schema:
 *          $ref: '#/definitions/postcodes'
 *
 */
