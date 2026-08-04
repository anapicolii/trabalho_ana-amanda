import express from "express"

const app = express();

app.get("/anaeamanda", (req, res)=>{
    res.status(404).json({
        ana: "banana"
    })
})

app.listen(800, ()=>{
    console.log("mensagem bonitinha")
});

