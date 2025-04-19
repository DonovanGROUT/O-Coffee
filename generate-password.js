import argon2 from 'argon2';

async function generatePasswordHash(password) {
    try {
        const hash = await argon2.hash(password);
        console.log(`Password: ${password}`);
        console.log(`Hash: ${hash}`);
        return hash;
    } catch (err) {
        console.error('Erreur lors du hashage:', err);
    }
}

// Générer des hashes pour 'Admin123' et 'Member123'
async function main() {
    await generatePasswordHash('Admin123');
    console.log('----------------------------');
    await generatePasswordHash('Member123');
}

main();