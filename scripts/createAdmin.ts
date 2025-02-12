// scripts/createAdmin.ts
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma'; // Assure-toi que le chemin et l'extension sont corrects

async function createAdmin() {
  // Hasher le mot de passe avec 10 salt rounds
  const hashedPassword = await bcrypt.hash('testHash', 10);

  // Création de l’utilisateur admin dans la base de données
  await prisma.user.create({
    data: {
      email: 'ltifene@gmail.com',
      password: hashedPassword,
      name: 'Admin',
    },
  });

  console.log('Admin created');
}

createAdmin()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
