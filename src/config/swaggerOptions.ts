export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API QPT',
      version: '1.0.0',
      description:
        'API QPT.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'JSONPlaceholder',
        url: 'https://jsonplaceholder.typicode.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ["../routes/*.ts"]
}