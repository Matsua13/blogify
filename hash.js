// hash.js
import { hash as _hash } from 'bcrypt';

// Récupère le mot de passe depuis les arguments de la ligne de commande
const password = process.argv[2];

if (!password) {
  console.error("Usage: node hash.js <motDePasse>");
  process.exit(1);
}

const saltRounds = 10; // Nombre d'itérations pour le hachage (plus c'est élevé, plus c'est sécurisé mais plus lent)

_hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error("Error:", err);
    process.exit(1);
  }
  console.log("Done:", hash);
});
