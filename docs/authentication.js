/* -------------------------------------------------------------------------- */
/*                         OpenAPI 2.0 (a.k.a Swagger)                        */
/* -------------------------------------------------------------------------- */
/**
 *
 * @swagger
 * /register:
 *  post:
 *    tags:
 *      - Authentication
 *    consumes:
 *       - application/json
 *    description: Send registration information
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: Registration successful
 *
 * /login:
 *  post:
 *    tags:
 *      - Authentication
 *    consumes:
 *      - application/json
 *    description: Send login information
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: Login successful
 *
 *
 * /password:
 *  post:
 *    tags:
 *      - Authentication
 *    description: Send change password information
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *            - id
 *            - currentPassword
 *            - newPassword
 *            - confirmPassword
 *          properties:
 *            id:
 *              type: string
 *            currentPassword:
 *              type: string
 *            newPassword:
 *              type: string
 *            confirmPassword:
 *              type: string
 *    responses:
 *      '200':
 *        description: Password changed successfully
 */
