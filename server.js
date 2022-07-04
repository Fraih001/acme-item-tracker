const { conn, User, Thing } = require('./db');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));


app.post('/api/things', async(req, res, next)=> {
  try {
    res.status(201).send(await Thing.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/things', async(req, res, next)=> {
  try {
    res.send(await Thing.findAll({
      order: [
        ['ranking', 'ASC']
      ]
    }));
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/things/:id', async(req, res, next)=> {
  try {
    const thing = await Thing.findByPk(req.params.id)
    res.status(204).send(await thing.destroy());
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/things/:id', async(req, res, next)=> {
  try{
      const thing = await Thing.findByPk(req.params.id);
      await thing.update(req.body)

      res.status(201).send(await thing.update(req.body));
  } catch(er) {
      next(er);
  }
});

app.post('/api/users', async(req, res, next)=> {
  try {
    res.status(201).send(await User.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/users', async(req, res, next)=> {
  try {
    res.send(await User.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/users/:id', async(req, res, next)=> {
  try {
    const user = await User.findByPk(req.params.id)
    res.status(204).send(await user.destroy());
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/things/:id', async(req, res, next)=> {
  try {
    const thing = await Thing.findByPk(req.params.id);
    res.status(201).send(await thing.update(req.body, {
      where: {userId: req.params.userId}
    }));
  }
  catch(ex){
    next(ex);
  }
});


const port = process.env.PORT || 3050;

app.listen(port, ()=> console.log(`listening on port ${port}`));

const init = async()=> {
  try {
    await conn.sync({ force: true });
    const [Alex, Chris, Addison, Colleen] = await Promise.all(
      ['Alex', 'Chris', 'Addison', 'Colleen'].map( name => User.create({ name }))
    );

    await Promise.all([
      Thing.create({ name: 'Computer', userId: Alex.id }),
      Thing.create({ name: 'Pen', userId: Chris.id }),
      Thing.create({ name: 'Toy', userId: Alex.id }),
      Thing.create({ name: 'Sandwich', userId: Colleen.id }),
      Thing.create({ name: 'Car', userId: Addison.id }),
      Thing.create({ name: 'Remote', userId: Addison.id }),





    ])
  }
  catch(ex){
    console.log(ex);
  }
};

init();
