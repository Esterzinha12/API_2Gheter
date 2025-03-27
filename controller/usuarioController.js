const userService = require("../service/usuarioService.js");

async function buscarUsuarioId(req, res) {
  try {
    const { id } = req.params;
    const usuario = await userService.buscarUsuarioId(id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).send({
      message: "Erro ao buscar usuario por id",
      error: error.message,
    });
  }
}


async function cadastrarUsuario(req, res) {
  const { nome, cnpj, email, senha, telefone, tipo } = req.body;

  if (!nome) return res.status(400).json({ message: "Erro! Nome é obrigatório." });
  if (!email) return res.status(400).json({ message: "Erro! Email é obrigatório." });
  if (!cnpj) return res.status(400).json({ message: "Erro! CNPJ é obrigatório." });
  if (!telefone) return res.status(400).json({ message: "Erro! Telefone é obrigatório." });
  if (!senha) return res.status(400).json({ message: "Erro! Senha é obrigatória." });
  
  const cnpjNumerico = cnpj.replace(/[^\d]/g, "")
  if (!validarCNPJ(cnpjNumerico)) return res.status(400).json({ message: "Erro! CNPJ inválido." });
  if (!validarTelefone(telefone)) return res.status(400).json({ message: "Erro! Telefone inválido." });
  if (!validarEmail(email)) return res.status(400).json({ message: "Erro! Email inválido." });
  const telefoneFormatado = formatarTelefone(telefone)

  try {
    const usuarioExistente = await userService.buscarUsuario(email);
    if (usuarioExistente) {
      return res.status(400).json({ message: "Erro! Email já cadastrado." });
    }

    await userService.cadastrarUsuario(nome, cnpjNumerico, email, senha, telefoneFormatado, tipo);
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário", error: error.message });
  }
}

async function loginUsuario(req, res) {
  const { email, senha } = req.body;

  if (!email) return res.status(400).json({ message: "Erro! Email é obrigatório." });
  if (!validarEmail(email)) return res.status(400).json({ message: "Erro! Email inválido." });
  if (!senha) return res.status(400).json({ message: "Erro! Senha é obrigatória." });

  try {
    const usuario = await userService.buscarUsuario(email);
    if (!usuario) {
      return res.status(404).json({ message: "Erro! Usuário não encontrado." });
    }
    
    if (usuario.senha !== senha) {
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
    return res.status(200).json(usuarioFormatado);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao logar usuário", error: error.message });
  }
}

async function recadastrarSenha(req, res) {
  const { email, novaSenha } = req.body;

  if (!email) return res.status(400).json({ message: "Erro! Email é obrigatório." });
  if (!validarEmail(email)) return res.status(400).json({ message: "Erro! Email inválido." });
  if (!novaSenha) return res.status(400).json({ message: "Erro! Senha é obrigatória." });

  try {
    const usuarioExistente = await userService.buscarUsuario(email);
    if (usuarioExistente === undefined) {
      return res.status(400).json({ message: "Erro! Usuário não encontrado." });
    } else if (usuarioExistente.novaSenha === novaSenha) {
      return res.status(400).json({ message: "Erro! A senha deve ser diferente da atual." });
    }

    await userService.editarUsuario(email, novaSenha);

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
