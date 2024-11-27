exports.handler = async (event, context) => {
  // 요청 메서드(GET/POST 등) 처리
  const { httpMethod, queryStringParameters, body } = event;

  if (httpMethod === "GET") {
    const name = queryStringParameters.name || "World";
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello, ${name}!` }),
    };
  } else if (httpMethod === "POST") {
    const data = JSON.parse(body || "{}");
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Received data`, data }),
    };
  } else {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }
};

