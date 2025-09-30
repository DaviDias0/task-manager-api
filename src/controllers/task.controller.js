const getHelloWorld = (req, res) => {
    res.status(200).send('Meu primeiro servidor Node.js (agora com SOLID)!');
};

module.exports = {
    getHelloWorld
};