case "categoria":
  try {
    if (!args.length) {
      // If no arguments are provided, respond with an error message
      return await socket.responderTexto(
        c,
        id_chat,
        erroComandoMsg(comando, botInfo),
        mensagem
      );
    }

    // User-provided category text
    let categoriaUsuario = texto_recebido;

    // Fetch products using the API function
    let { resultado: produtosCategoria } = await api.Gerais.obterProdutosCategoria(
      categoriaUsuario
    );

    // Prepare the response with the first product
    let primeiroProduto = produtosCategoria[0]; // Example: Display the first product
    let textoResposta = criarTexto(
      comandos_info.utilidades.categoria.msgs.resposta,
      primeiroProduto.titulo,
      primeiroProduto.preco,
      primeiroProduto.descricao
    );

    // Respond with an image and product details
    await socket.responderArquivoLocal(
      c,
      tiposMensagem.imagem,
      id_chat,
      primeiroProduto.imagem,
      textoResposta,
      mensagem
    );
  } catch (err) {
    if (!err.erro) throw err;

    // Respond with an error message
    await socket.responderTexto(
      c,
      id_chat,
      criarTexto(comandos_info.outros.erro_api, comando, err.erro),
      mensagem
    );
  }
  break;
