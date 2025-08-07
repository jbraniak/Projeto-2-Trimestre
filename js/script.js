/* main.js */
const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

botoes[0].onclick = () => {
  if (tamanhoSenha > 1) tamanhoSenha--;
  numeroSenha.textContent = tamanhoSenha;
  geraSenha();
};

botoes[1].onclick = () => {
  if (tamanhoSenha < 20) tamanhoSenha++;
  numeroSenha.textContent = tamanhoSenha;
  geraSenha();
};

checkbox.forEach(cb => cb.onclick = geraSenha);

function geraSenha() {
  let alfabeto = '';
  if (checkbox[0].checked) alfabeto += letrasMaiusculas;
  if (checkbox[1].checked) alfabeto += letrasMinusculas;
  if (checkbox[2].checked) alfabeto += numeros;
  if (checkbox[3].checked) alfabeto += simbolos;

  let senha = '';
  for (let i = 0; i < tamanhoSenha; i++) {
    let index = Math.floor(Math.random() * alfabeto.length);
    senha += alfabeto[index];
  }

  campoSenha.value = senha;
  classificaSenha(alfabeto.length);
}

function classificaSenha(tamAlfabeto) {
  let entropia = tamanhoSenha * Math.log2(tamAlfabeto);
  forcaSenha.classList.remove('fraca', 'media', 'forte');
  if (entropia > 57) {
    forcaSenha.classList.add('forte');
  } else if (entropia > 35) {
    forcaSenha.classList.add('media');
  } else {
    forcaSenha.classList.add('fraca');
  }

  const valorEntropia = document.querySelector('.entropia');
  valorEntropia.textContent = "Um computador pode levar até " + Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24)) + " dias para descobrir essa senha.";
}

geraSenha();
