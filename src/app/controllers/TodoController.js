import Todo from '../models/Todo'

class TodoController {

  async store (req, res) {
    try {

      req.body.user = req.userId;
      await Todo.create(req.body);

      return res.json(req.body);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao cadastrar nova tarefa' });
    }
  }

  async all (req, res) {
    try {
      const user = req.userId;
      const result = await Todo.find({user});
      return res.json(result);
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao consultar tarefas' });
    }
  }
}

export default new TodoController();
