const swaggerJSDoc = require("swagger-jsdoc");
const SwaggerParser = require("@apidevtools/swagger-parser");

const swaggerOptions = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Job Tracker API",
            version: "1.0.0",
            description: "API for managing users and job applications"
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Local development server"
            }
        ],
        tags: [
            { name: "Users", description: "User registration, authentication, and administration" },
            { name: "Applications", description: "Job application management" }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            parameters: {
                applicationId: {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "MongoDB application ID",
                    schema: {
                        type: "string",
                        pattern: "^[a-fA-F0-9]{24}$"
                    },
                    example: "65f1c2a3b4c5d6e7f8a9b0c1"
                }
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: { type: "string", example: "65f1c2a3b4c5d6e7f8a9b0c1" },
                        username: { type: "string", example: "jane.doe" },
                        currentWorkingStatus: { type: "string", example: "unemployed" },
                        role: { type: "string", enum: ["user", "admin"], example: "user" }
                    }
                },
                UserCredentials: {
                    type: "object",
                    required: ["username", "password"],
                    properties: {
                        username: { type: "string", example: "jane.doe" },
                        password: { type: "string", format: "password", minLength: 1, example: "secret123" }
                    }
                },
                Application: {
                    type: "object",
                    properties: {
                        _id: { type: "string", pattern: "^[a-fA-F0-9]{24}$", example: "65f1c2a3b4c5d6e7f8a9b0c1" },
                        company: { type: "string", example: "Acme Inc." },
                        position: { type: "string", example: "Backend Developer" },
                        status: { type: "string", example: "Applied" },
                        appliedDate: { type: "string", format: "date-time" },
                        version: { type: "integer", example: 0 }
                    }
                },
                ApplicationInput: {
                    type: "object",
                    required: ["company", "position"],
                    properties: {
                        company: { type: "string", minLength: 1, example: "Acme Inc." },
                        position: { type: "string", minLength: 1, example: "Backend Developer" },
                        status: { type: "string", example: "Applied" }
                    }
                },
                ApplicationUpdate: {
                    type: "object",
                    minProperties: 1,
                    properties: {
                        company: { type: "string", minLength: 1, example: "Acme Inc." },
                        position: { type: "string", minLength: 1, example: "Senior Backend Developer" },
                        status: { type: "string", example: "Interview" }
                    }
                },
                ApplicationPagination: {
                    type: "object",
                    properties: {
                        page: { type: "integer", example: 1 },
                        limit: { type: "integer", example: 10 },
                        total: { type: "integer", example: 25 },
                        totalPages: { type: "integer", example: 3 },
                        hasNextPage: { type: "boolean", example: true },
                        hasPrevioutPage: { type: "boolean", example: false }
                    }
                },
                ApplicationListResponse: {
                    type: "object",
                    required: ["status", "Data"],
                    properties: {
                        status: { type: "boolean", example: true },
                        Data: {
                            type: "object",
                            required: ["applications", "pagination"],
                            properties: {
                                applications: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Application" }
                                },
                                pagination: { $ref: "#/components/schemas/ApplicationPagination" }
                            }
                        }
                    }
                },
                Error: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        message: { type: "string", example: "Authentication required" }
                    }
                }
            }
        }
    },
    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

async function validateSwaggerSpec() {
    await SwaggerParser.validate(swaggerSpec);
    console.log("Swagger specification is valid");
}

module.exports = { swaggerSpec, validateSwaggerSpec };