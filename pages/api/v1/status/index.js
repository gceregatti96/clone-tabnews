function status(request, response) {
  response.status(200).json({ chave: "Santos é o novo campeão" });
}

export default status;
