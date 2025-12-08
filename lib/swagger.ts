import { createSwaggerSpec } from "next-swagger-doc";
import schemas from "@/openapi/schemas.json";

export const getSwaggerSpec = () => {
    return createSwaggerSpec({
        apiFolder: "app/api",
        definition: {
            openapi: "3.0.0",
            info: {
                title: "EduVoiceCMS API",
                version: "1.0.0",
                description: "API documentation for EduVoiceCMS",
            },
            components: {
                schemas,
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    }
                }
            },
            security: [{ bearerAuth: [] }]
        },
    });
};