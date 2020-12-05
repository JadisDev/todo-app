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

  async delete (req, res) {
    try {
      const userId = req.userId;
      const { id } = req.params;
      const todo = await Todo.findById(id);

      if (!todo) {
        return res.status(400).json({ error: 'Tarefa não encontrada' });
      }

      if (todo.user != userId) {
        return res.status(400).json({ error: 'Tarefa não pertence ao usuário logado' });
      }

      await Todo.deleteOne({"_id": id})

      return res.json(id);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async toggle (req, res) {
    try {
      const userId = req.userId;
      const { id } = req.body;
      const todo = await Todo.findById(id);

      if (!todo) {
        return res.status(400).json({ error: 'Tarefa não encontrada' });
      }

      if (todo.user != userId) {
        return res.status(400).json({ error: 'Tarefa não pertence ao usuário logado' });
      }

      todo.done = !todo.done;

      await Todo.updateOne({"_id": id}, {done: todo.done})

      return res.json(todo);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

}

export default new TodoController();
