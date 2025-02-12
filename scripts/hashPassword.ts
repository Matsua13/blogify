// scripts/hashPassword.ts
import bcrypt from 'bcrypt';

const password = 'testHash'; // Le mot de passe en clair

bcrypt.hash(password, 10)
  .then(hash => {
    console.log(`Le mot de passe hashé est : ${hash}`);
  })
  .catch(err => {
    console.error("Erreur lors du hashage :", err);
  });
