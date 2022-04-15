const homeController = (req, res)=> {
  res.status(200).json({
    status: 200,
    message: 'Welcome to My To Do App'
  });
};

export default homeController;