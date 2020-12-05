class ApiController {
  async test (req, res) {
    return res.status(200).json({ api: 'running' });
  }
}

export default new ApiController();
