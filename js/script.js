document.addEventListener("DOMContentLoaded", () => {
  const campoSenha = document.getElementById("campo-senha");
  const botoes = document.querySelectorAll(".parametro-senha__botao");
  const tamanhoTexto = document.querySelector(".parametro-senha__texto");
  let tamanho = 12;

  botoes[0].addEventListener("click", () => {
    if (tamanho > 1) tamanho--;
    tamanhoTexto.textContent = tamanho;
    gerarSenha();
  });

  botoes[1].addEventListener("click", () => {
    tamanho++;
    tamanhoTexto.textContent = tamanho;
    gerarSenha();
  });

  function gerarSenha() {
    const maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const minusculas = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const simbolos = "!@#$%^&*()_+";

    let caracteres = "";
    if (document.querySelector('input[name="maiusculo"]').checked) caracteres += maiusculas;
    if (document.querySelector('input[name="minusculo"]').checked) caracteres += minusculas;
    if (document.querySelector('input[name="numero"]').checked) caracteres += numeros;
    if (document.querySelector('input[name="simbolo"]').checked) caracteres += simbolos;

    if (caracteres === "") {
      campoSenha.value = "Selecione uma opção!";
      return;
    }

    let senha = "";
    for (let i = 0; i < tamanho; i++) {
      senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    campoSenha.value = senha;
  }

  // Gerar senha inicial
  gerarSenha();

  // Atualiza senha ao mudar os checkboxes
  document.querySelectorAll(".checkbox").forEach(checkbox => {
    checkbox.addEventListener("change", gerarSenha);
  });
});
