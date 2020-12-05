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
}

export default new TodoController();
