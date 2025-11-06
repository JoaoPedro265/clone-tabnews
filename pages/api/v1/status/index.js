//request: trata do que as coisas do mundo de fora ta entrado no sistema
//response:trata do que vc quer responder la pra fora
function status(request, response) {
  response.status(200).json({ chave: "vc é foda cara" });
}

export default status;
