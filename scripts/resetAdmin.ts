// scripts/resetAdmin.ts
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma'; // Ajuste le chemin si nécessaire

async function resetAdmin() {
  const adminEmail = 'ltifene@gmail.com';
  const plainPassword = 'testHash';

  try {
    // Vérifier si l'utilisateur admin existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingUser) {
      // Supprimer l'utilisateur existant
      await prisma.user.delete({
        where: { email: adminEmail },
      });
      console.log(`Admin user (${adminEmail}) deleted.`);
    } else {
      console.log(`No existing admin user found for ${adminEmail}.`);
    }

    // Créer un nouveau hash pour le mot de passe
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Créer le nouvel utilisateur admin
    const newAdmin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin',
      },
    });
    console.log('Nouvel utilisateur admin créé avec succès :', newAdmin);
  } catch (error) {
    console.error('Erreur lors de la réinitialisation de l’admin :', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdmin();
