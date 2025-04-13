const userService = require("../service/usuarioService.js");

async function buscarUsuarioId(req, res) {
  try {
    const { id } = req.params;
    console.log(`Requisição recebida: GET /usuario/${id}`);

    const usuario = await userService.buscarUsuarioId(id);
    console.log(`Usuário encontrado:`, usuario);

    res.status(200).json(usuario);
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error.message);
    res.status(500).send({
      message: "Erro ao buscar usuario por id",
      error: error.message,
    });
  }
}

async function cadastrarUsuario(req, res) {
  const { nome, cnpj, email, senha, telefone, tipo } = req.body;
  console.log("Requisição para cadastro de usuário recebida:");
  console.log({ nome, cnpj, email, telefone, tipo });

  if (!nome) {
    console.warn("Validação falhou: Nome ausente");
    return res.status(400).json({ message: "Erro! Nome é obrigatório." });
  }

  if (!email) {
    console.warn("Validação falhou: Email ausente");
    return res.status(400).json({ message: "Erro! Email é obrigatório." });
  }

  if (!cnpj) {
    console.warn("Validação falhou: CNPJ ausente");
    return res.status(400).json({ message: "Erro! CNPJ é obrigatório." });
  }

  if (!telefone) {
    console.warn("Validação falhou: Telefone ausente");
    return res.status(400).json({ message: "Erro! Telefone é obrigatório." });
  }

  if (!senha) {
    console.warn("Validação falhou: Senha ausente");
    return res.status(400).json({ message: "Erro! Senha é obrigatória." });
  }
  
  const cnpjNumerico = cnpj.replace(/[^\d]/g, "")
  if (!validarCNPJ(cnpjNumerico)) {
    console.warn("CNPJ inválido:", cnpj);
    return res.status(400).json({ message: "Erro! CNPJ inválido." });
  }

  if (!validarTelefone(telefone)) {
    console.warn("Telefone inválido:", telefone);
    return res.status(400).json({ message: "Erro! Telefone inválido." });
  }

  if (!validarEmail(email)) {
    console.warn("Email inválido:", email);
    return res.status(400).json({ message: "Erro! Email inválido." });
  }
  
  try {
    const telefoneFormatado = formatarTelefone(telefone)
    const usuarioExistente = await userService.buscarUsuario(email);

    if (usuarioExistente) {
      console.warn("Tentativa de cadastro com email já existente:", email);
      return res.status(400).json({ message: "Erro! Email já cadastrado." });
    }

    await userService.cadastrarUsuario(nome, cnpjNumerico, email, senha, telefoneFormatado, tipo);
    console.log("Usuário cadastrado com sucesso:", email);

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar usuário:", error.message);
    res.status(500).json({ message: "Erro ao criar usuário", error: error.message });
  }
}

async function loginUsuario(req, res) {
  const { email, senha } = req.body;
  console.log("Requisição de login recebida:");
  console.log("Email:", email);
  console.log("Senha:", senha);

  if (!email) {
    console.warn("Erro de validação: Email ausente");
    return res.status(400).json({ message: "Erro! Email é obrigatório." });
  }

  if (!validarEmail(email)) {
    console.warn("Erro de validação: Email inválido");
    return res.status(400).json({ message: "Erro! Email inválido." });
  }

  if (!senha) {
    console.warn("Erro de validação: Senha ausente");
    return res.status(400).json({ message: "Erro! Senha é obrigatória." });
  }

  try {
    const usuario = await userService.buscarUsuario(email);
    console.log("Resultado da busca de usuário:", usuario);

    if (!usuario) {
      console.warn("Usuário não encontrado com o email fornecido.");
      return res.status(404).json({ message: "Erro! Usuário não encontrado." });
    }
    
    if (usuario.senha !== senha) {
      console.warn("Senha inválida para o email:", email);
      return res.status(400).json({ message: "Erro! Senha inválida." });
    }

    const usuarioFormatado = {
      id: usuario.id,
      nome: usuario.nome,
      cnpj: formatarCNPJ(usuario.cnpj),
      email: usuario.email,
      telefone: formatarTelefone(usuario.telefone),
      tipo: usuario.tipo
    };
    console.log("Login bem-sucedido! Usuário formatado:", usuarioFormatado);

    return res.status(200).json(usuarioFormatado);
  } catch (error) {
    console.error("Erro ao tentar logar usuário:", error.message);
    return res.status(500).json({ message: "Erro ao logar usuário", error: error.message });
  }
}

async function recadastrarSenha(req, res) {
  const { email, novaSenha } = req.body;
  console.log("Requisição recebida para recadastrar senha:");
  console.log("Email:", email);
  console.log("Nova Senha:", novaSenha);

  if (!email) {
    console.warn("Erro de validação: Email ausente");
    return res.status(400).json({ message: "Erro! Email é obrigatório." });
  }

  if (!validarEmail(email)) {
    console.warn("Erro de validação: Email inválido");
    return res.status(400).json({ message: "Erro! Email inválido." });
  }

  if (!novaSenha) {
    console.warn("Erro de validação: Senha ausente");
    return res.status(400).json({ message: "Erro! Senha é obrigatória." });
  }

  try {
    const usuarioExistente = await userService.buscarUsuario(email);
    console.log("Usuário encontrado:", usuarioExistente);

    if (usuarioExistente === undefined) {
      console.warn("Usuário não encontrado no sistema.");
      return res.status(400).json({ message: "Erro! Usuário não encontrado." });
    }

    if (usuarioExistente.novaSenha === novaSenha) {
      console.warn("Nova senha é igual à atual.");
      return res.status(400).json({ message: "Erro! A senha deve ser diferente da atual." });
    }

    await userService.editarUsuario(email, novaSenha);
    console.log("Senha atualizada com sucesso para:", email);

    return res.status(200).json({ message: "Senha recadastrada com sucesso!" });
  } catch (error) {
    console.error("Erro ao recadastrar senha:", error.message);
    return res.status(500).json({ message: "Erro ao recadastrar senha", error: error.message });
  }
}

function validarCNPJ(cnpj) {
  if (cnpj.length !== 14) {
    return false;
  }

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0)) {
    return false;
  }

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1)) {
    return false;
  }

  return true;
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarTelefone(telefone) {
  const telefoneLimpo = telefone.replace(/[^\d]/g, "");
  const regexComDDD11 = /^\d{2}9?\d{4}\d{4}$/;
  return regexComDDD11.test(telefoneLimpo);
}

function formatarTelefone(telefone) {
  const telefoneLimpo = telefone.replace(/[^\d]/g, "");
  if (telefoneLimpo.length === 11) {
    return `(${telefoneLimpo.slice(0, 2)}) ${telefoneLimpo.slice(2, 7)}-${telefoneLimpo.slice(7)}`;
  } else if (telefoneLimpo.length === 10) {
    return `(${telefoneLimpo.slice(0, 2)}) ${telefoneLimpo.slice(2, 6)}-${telefoneLimpo.slice(6)}`;
  } else {
    return telefone;
  }
}

function formatarCNPJ(cnpj) {
  return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
}

module.exports = {
  buscarUsuarioId,
  cadastrarUsuario,
  loginUsuario,
  recadastrarSenha
};
