import express from 'express';

const app=express();
const port=1000;
app.use(express.json());

let teaData=[];
let nextId=1;

app.post('/teas',(req,res)=>{
const {name,price}=req.body;
const newTea={id:nextId++,name,price};
teaData.push(newTea);
res.status(201).send(newTea);
})
app.get('/teas',(req,res)=>{
res.status(200).send(teaData);
}) 
app.get('/teas/:id',(req,res)=>{
   const tea= teaData.find(t=>t.id===parseInt(req.params.id));
   if(!tea){
    return res.status(404).send("tea not found");
   }
   else{
    res.status(200).send(tea);
   }
})

//update tea
app.put('/teas/:id',(req,res)=>{
const teaID=req.params.id;
const tea=teaData.find(t=>t.id===parseInt(req.params.id));
if(!tea){
    return res.status(404).send("tea not found");
   }
   else{
    const {name,price}=req.body;
    tea.name=name
    tea.price=price
  res.send(200).send(tea);
   }
})

//delete tea
app.delete('/teas/:id',(req,res)=>{
  const index=  teaData.findIndex(t=>t.id===parseInt(req.params.id));
    if(index==-1)return res.status(404).send("tea not found");
    teaData.splice(index,1);
    return   res.send(204).send(`Tea has been deleted succcefully ${teaData}`);

})
app.listen(port,()=>{
    console.log(`server is running at port:${port}......`);
});
