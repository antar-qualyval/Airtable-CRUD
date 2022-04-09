const connectDB = require("../utils/connectDB");
const User = require("../utils/UserModel");

exports.handler = async (event, context) => {
    const connected = await connectDB().then(() => {
        return true;
    }).catch((e) => {
        return false;
    })
    console.log(event);


    if (event.httpMethod !== 'PUT') {
        return {
            statusCode: 404,
            body: JSON.stringify({
                success: false,
                message: 'Wrong request Sent'
            })
        }
    }

    if (!connected) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                success: false,
                message: 'Database connection failed'
            })
        }
    };
    console.log(event);
    const users = await User.deleteOne({_id: event.queryStringParameters.id})
    return {
        statusCode: 200,
        body: JSON.stringify({
            success: true,
            message: "All User List",
            users
        })
    }
}       