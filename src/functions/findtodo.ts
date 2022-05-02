import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";




export const handler: APIGatewayProxyHandler = async (event) => {
    const { user_id } = event.pathParameters;
    
    const tableItems = await document.scan({
      TableName: "todos",
    }).promise();

    const response = tableItems.Items.filter( item => {
        return item.user_id === user_id;
    })

    return {
        statusCode: 200,
        body: JSON.stringify(response)  
    }
}