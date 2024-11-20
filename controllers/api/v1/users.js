let users = [];  


const getAll = async (req, res) => {
    try {
        res.json({
            status: "Success",
            data: {
                users: users
            }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
}


const create = (req, res) => {
    // Extract the data from the request body
    const { id, name, email, password, street, number, zipcode, city, phone, role } = req.body;
  
    // Create a new user object
    const newUser = {
      id,
      name,
      email,
      password,
      street,
      number,
      zipcode,
      city,
      phone,
      role
    };
  
    // For example, store it in an array (or a database)
    users.push(newUser);
  
    // Send the response back with the created user
    res.json({
      status: "Success",
      data: {
        user: newUser
      }
    });
  };
  


const update = async (req, res) => {
    try {
        const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));  
        if (userIndex === -1) {
            return res.status(404).json({
                status: "Error",
                message: "User not found"
            });
        }

        const updatedUser = { ...users[userIndex], ...req.body };  
        users[userIndex] = updatedUser;  

        res.json({
            status: "Success",
            data: {
                user: updatedUser
            }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
}


const passwordUpdate = async (req, res) => {
    try {
        const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
        if (userIndex === -1) {
            return res.status(404).json({
                status: "Error",
                message: "User not found"
            });
        }

        users[userIndex].password = req.body.password;  

        res.json({
            status: "Success",
            data: {
                user: {
                    id: users[userIndex].id,
                    password: users[userIndex].password
                }
            }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
}

module.exports = {
    getAll,
    create,
    update,
    passwordUpdate
}
