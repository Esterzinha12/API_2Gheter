const userService = require("../service/usuarioService.js");

async function cadastrarUsuario(req, res) {
  const { nome, cnpj, email, senha, telefone, tipo } = req.body;

  if (!nome) return res.status(400).json({ message: "Erro no cadastro! Nome é obrigatório." });
  if (!email) return res.status(400).json({ message: "Erro no cadastro! Email é obrigatório." });
  if (!cnpj) return res.status(400).json({ message: "Erro no cadastro! CNPJ é obrigatório." });
  if (!telefone) return res.status(400).json({ message: "Erro no cadastro! Telefone é obrigatório." });
  if (!senha) return res.status(400).json({ message: "Erro no cadastro! Senha é obrigatória." });
  
  const cnpjNumerico = cnpj.replace(/[^\d]/g, "")
  if (!validarCNPJ(cnpjNumerico)) return res.status(400).json({ message: "Erro no cadastro! CNPJ inválido." });
  if (!validarTelefone(telefone)) return res.status(400).json({ message: "Erro no cadastro! Telefone inválido." });
  if (!validarEmail(email)) return res.status(400).json({ message: "Erro no cadastro! Email inválido." });

  try {
    const usuarioExistente = await userService.buscarUsuario(email);
    if (usuarioExistente && usuarioExistente.length > 0) {
      return res.status(400).json({ message: "Erro no cadastro! Email já cadastrado." });
    }

    await userService.cadastrarUsuario(nome, cnpjNumerico, email, senha, telefone, tipo);
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário", error: error.message });
  }
}

async function logarUsuario(req, res) {
  const { email, senha } = req.body;

  if (!email) return res.status(400).json({ message: "Erro! Email é obrigatório." });
  if (!validarEmail(email)) return res.status(400).json({ message: "Erro! Email inválido." });
  if (!senha) return res.status(400).json({ message: "Erro! Senha é obrigatória." });

  try {
    const usuario = await userService.buscarUsuario(email);
    if (!usuario || usuario.senha !== senha) {
      return res.status(400).json({ message: "Erro! Senha inválida." });
    }

    const usuarioFormatado = {
      nome: usuario.nome,
      cnpj: formatarCNPJ(usuario.cnpj),
      email: usuario.email,
      telefone: formatarTelefone(usuario.telefone),
      tipo: usuario.tipo
    };
    return res.status(200).json(usuarioFormatado);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao logar usuário", error: error.message });
  }
}

async function recadastrarSenha(req, res) {
  const { email, novaSenha } = req.body;

  if (!email) return res.status(400).json({ message: "Erro no cadastro! Email é obrigatório." });
  if (!validarEmail(email)) return res.status(400).json({ message: "Erro no cadastro! Email inválido." });
  if (!novaSenha) return res.status(400).json({ message: "Erro no cadastro! Senha é obrigatória." });

  try {
    const usuarioExistente = await userService.buscarUsuario(email);
    if (usuarioExistente && usuarioExistente.senha === novaSenha) {
      return res.status(400).json({ message: "Erro no cadastro! A senha deve ser diferente da atual." });
    }

    await userService.buscarUsuario(email);

    return res.status(200).json({ message: "Senha recadastrada com sucesso!" });
  } catch (error) {
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
  const tamanho = telefoneLimpo.length;

  if (tamanho === 11) {
    if (telefoneLimpo[0] === '9') {
      return true;
    }
  }

  if (tamanho === 10)  true;
  if (tamanho === 8) true;
  return false;
}

function formatarTelefone(telefone) {
  return telefone.length === 10
    ? `(${telefone.slice(0, 2)}) ${telefone.slice(2, 6)}-${telefone.slice(6)}`
    : `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7)}`;
}

function formatarCNPJ(cnpj) {
  return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(5, 8)}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`;
}

module.exports = {
  cadastrarUsuario,
  logarUsuario,
  recadastrarSenha
};
