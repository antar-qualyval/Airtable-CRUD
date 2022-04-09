const connectDB = require("../utils/connectDB");
const User = require("../utils/UserModel");

exports.handler = async (event, context) => {
    const connected = await connectDB().then(() => {
        return true;
    }).catch((e) => {
        return false;
    })
    console.log(event);


    if (event.httpMethod !== 'POST') {
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
    }
    const data = JSON.parse(event.body);
    console.log(data, event.body)
    await User.create(
    {...data}
    )
    return {
        statusCode: 200,
        body: "Hello boadd vat haiyuu na"
    }
}   