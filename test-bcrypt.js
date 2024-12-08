const bcrypt = require('bcryptjs');

const runTest = async () => {
    const password = "Admin"; 
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt); 

    console.log('Nieuw gehasht wachtwoord:', hashedPassword); 
};

runTest();
