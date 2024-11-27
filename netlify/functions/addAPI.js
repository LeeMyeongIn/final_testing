const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const { httpMethod } = event;

  if (httpMethod === "GET") {
    try {
      const response = await fetch("https://api.example.com/data");
      const data = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }
};
