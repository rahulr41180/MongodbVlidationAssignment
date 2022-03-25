
const app = require("./index");

const Connectdb = require("./configs/db");

app.listen(6500, async() =>
{
    try
    {
        Connectdb();

        console.log("listening on port 6500");
    }
    catch(error)
    {
        console.log("error :", error);
    }
})