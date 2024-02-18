const mongoose = require("mongoose");
const express = require("express")

const ChannelModel = require("./models/channel");

const app = express()
const PORT =3000


const dbUrl="mongodb+srv://10829465:TcY2DKWRHdNQZYkb@cluster0.pcvt3m9.mongodb.net/gps?retryWrites=true&w=majority"

const connextionParam ={
    useNewUrlParser: true,
    useUnifiedTopology:true
} 
mongoose.connect(dbUrl, connextionParam)
.then(()=>{
    console.info("connected to the DB");

})
.catch((e)=>{
    console.log("Error:",e);
});

app.listen(PORT,()=>{
    console.log(`Listening on PORT: ${PORT}`);
});

app.get("/insert", async (req, res) => {
    try {
        const dbmodel = new ChannelModel();
        dbmodel.name = "INFY T";
        dbmodel.type = "TEChH";
        
        await dbmodel.save();
        
        res.status(200).send({"msg": "inserted to DB"});
    } catch (error) {
        console.error(error);
        res.status(500).send({"error": "Error inserting to DB"});
    }
});
app.get("/channels", async (req, res) => {
    try {
        const channels = await ChannelModel.find(); // Retrieve all channel documents from the database
        
        res.status(200).json(channels); // Send the retrieved channels as JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send({"error": "Error retrieving channels"});
    }
});