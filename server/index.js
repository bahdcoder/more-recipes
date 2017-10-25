import Express from 'express';

const app = new Express();
app.get('/', (req ,res) => {
  res.json(['some express json from home endpoint ']);
});
app.listen(4044);
