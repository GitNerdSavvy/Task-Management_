const express =require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv').config();
const PORT= process.env.PORT;
const BASE_URL=process.env.BASE_URL;
const app=express();

app.use(express.json());
app.use(cors());
  

mongoose.connect(BASE_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=> console.log("Connected to MongoDB ")).catch(console.err);

const lists=require('./data/lists')

app.get('/list', async(req, res)=>{
        const list = await lists.find();
        res.json(list);
});
app.post('/List/new' , (req,res)=>{
    const List = new lists({
        title: req.body.title,
        description: req.body.description
    })
    List.save();
    res.json(List);
});

app.delete('/List/delete/:id' ,async (req,res)=>{
    const result =await lists.findByIdAndDelete(req.params.id);
    res.json({result});
})

app.get('/List/status/:id', async (req, res) => {
	const List = await lists.findById(req.params.id);

	List.status = !List.status;

	List.save();

	res.json(List);
})

app.put('/List/update/:id', async (req, res) => {
	const List = await lists.findById(req.params.id);

	List.title = req.body.title;
	List.description= req.body.description;
	

	List.save();

	res.json(List);
});



app.listen(PORT, ()=>console.log(`Server is running on ${PORT}`));