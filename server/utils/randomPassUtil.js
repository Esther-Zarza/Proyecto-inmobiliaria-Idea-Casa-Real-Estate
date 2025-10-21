export const randomPass = () => {

  return "patata";

}

export const generateRandomPass = (length = 12) => {

  const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const minusculas = "abcdefghijklmnopqrstuvwxyz";
  const numeros = "0123456789";
  const simbolos = "!@#$%^&*()_+[]{}|;:,.<>?";

  const todos = mayusculas + minusculas + numeros + simbolos;

  let contrasena = "";

  // Asegurar que contenga al menos uno de cada tipo
  contrasena += mayusculas[Math.floor(Math.random() * mayusculas.length)];
  contrasena += minusculas[Math.floor(Math.random() * minusculas.length)];
  contrasena += numeros[Math.floor(Math.random() * numeros.length)];
  contrasena += simbolos[Math.floor(Math.random() * simbolos.length)];

  // Rellenar el resto con caracteres aleatorios de todos los tipos
  for (let i = contrasena.length; i < length; i++) {
    contrasena += todos[Math.floor(Math.random() * todos.length)];
  }

  // Mezclar la contraseña para que no siempre empiece con mayuscula, etc.
  contrasena = contrasena
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  return contrasena;
}