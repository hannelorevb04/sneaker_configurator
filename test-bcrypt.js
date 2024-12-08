const bcrypt = require('bcryptjs');

const runTest = async () => {
    const password = "Admin"; // Wachtwoord dat je wilt hashen
    const salt = await bcrypt.genSalt(10); // Genereer een salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash het wachtwoord

    console.log('Nieuw gehasht wachtwoord:', hashedPassword); // Print de hash
};

runTest();
