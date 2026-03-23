const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');
const path = require('path');

// 🔹 External Middleware
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const app = express();

// ================= MIDDLEWARE =================
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// 🔹 Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});
app.use(limiter);

// 🔹 Custom Logger
app.use((req, res, next) => {
    console.log(`${new Date()} ${req.method} ${req.url}`);
    next();
});

// ================= ROUTES =================

// Home
app.get('/', (req, res) => {
    res.send('Server is running 🚀');
});


// ================= 🍪 COOKIE TASK =================

// 🔹 Store name + rollno in cookies
app.post('/set-user-cookie', (req, res) => {
    const { name, rollno } = req.body;

    if (!name || !rollno) {
        return res.status(400).send("Name and Roll No required");
    }

    res.cookie('name', name, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    });

    res.cookie('rollno', rollno, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    });

    res.send("User data stored in cookies 🍪");
});

// 🔹 Get cookie data
app.get('/get-user-cookie', (req, res) => {
    const { name, rollno } = req.cookies;

    if (!name || !rollno) {
        return res.send("No cookie data found");
    }

    res.json({ name, rollno });
});

// 🔹 Clear cookies
app.get('/clear-user-cookie', (req, res) => {
    res.clearCookie('name');
    res.clearCookie('rollno');

    res.send("Cookies cleared ❌");
});


// ================= FORM ROUTES =================

// Show form
app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Save form data in log.txt
app.post('/users', (req, res) => {
    const { name, rollno } = req.body;

    if (!name || !rollno) {
        return res.status(400).send("Name and Roll No required");
    }

    const logData = `Name: ${name}, Roll No: ${rollno}, Time: ${new Date().toISOString()}\n`;

    fs.appendFile(path.join(__dirname, 'log.txt'), logData, (err) => {
        if (err) return res.status(500).send("Error saving data");

        res.send("Data saved in log.txt");
    });
});


// ================= API ROUTES =================

// Get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
});

// Add new user
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        ...req.body
    };

    users.push(newUser);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) return res.status(500).json({ message: "Error saving" });

        res.status(201).json({ message: "User added", user: newUser });
    });
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = users.splice(index, 1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) return res.status(500).json({ message: "Error deleting" });

        res.json({ message: "User deleted", user: deletedUser });
    });
});


// ================= SERVER =================
const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});








// const express = require('express');
// const users = require('./MOCK_DATA.json');
// const fs = require('fs');
// const path = require('path');

// // External Middleware
// const morgan = require('morgan');
// const cors = require('cors');
// const helmet = require('helmet');
// const cookieParser = require('cookie-parser');
// const rateLimit = require('express-rate-limit');

// const app = express();

// // ================= MIDDLEWARE =================
// app.use(morgan('dev'));
// app.use(cors());
// app.use(helmet());
// app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // Rate Limiter
// const limiter = rateLimit({
//     windowMs: 60 * 1000, // 1 min
//     max: 100
// });
// app.use(limiter);

// // Custom Logger
// app.use((req, res, next) => {
//     console.log(`${new Date()} ${req.method} ${req.url}`);
//     next();
// });

// // ================= ROUTES =================

// // Home route
// app.get('/', (req, res) => {
//     res.send('Server is running 🚀');
// });

// //  Show HTML form
// app.get('/users', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// //  Save form data in log.txt
// app.post('/users', (req, res) => {
//     const { name, rollno } = req.body;

//     if (!name || !rollno) {
//         return res.status(400).send("Name and Roll No are required");
//     }

//     const logData = `Name: ${name}, Roll No: ${rollno}, Time: ${new Date().toISOString()}\n`;

//     fs.appendFile(path.join(__dirname, 'log.txt'), logData, (err) => {
//         if (err) {
//             console.log("Error writing:", err);
//             return res.status(500).send("Error saving data");
//         }

//         res.send("Data saved successfully");
//     });
// });

// // Get all users
// app.get('/api/users', (req, res) => {
//     res.json(users);
// });

// //  Get user by ID
// app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(u => u.id === id);

//     if (!user) {
//         return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user);
// });

// // Add new user
// app.post('/api/users', (req, res) => {
//     const newUser = {
//         id: users.length + 1,
//         ...req.body
//     };

//     users.push(newUser);

//     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
//         if (err) return res.status(500).json({ message: "Error saving data" });

//         res.status(201).json({ message: "User added", user: newUser });
//     });
// });

// // 🔹 Delete user
// app.delete('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);

//     const index = users.findIndex(u => u.id === id);

//     if (index === -1) {
//         return res.status(404).json({ message: "User not found" });
//     }

//     const deletedUser = users.splice(index, 1);

//     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
//         if (err) return res.status(500).json({ message: "Error deleting user" });

//         res.json({ message: "User deleted", user: deletedUser });
//     });
// });

// // ================= SERVER =================
// const PORT = 8000;

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });







// // // const express = require('express');
// // // const users = require('./MOCK_DATA.json');
// // // const fs = require('fs');
// // // const path = require('path');


// // // const morgan = require('morgan');
// // // const cors = require('cors');
// // // const helmet = require('helmet');
// // // const cookieParser = require('cookie-parser');
// // // const rateLimit = require('express-rate-limit');

// // // const app = express();
// // // const router = express.Router();


// // // app.use(express.static(path.join(__dirname, 'public')));
// // // app.use(express.urlencoded({ extended: false }));
// // // app.use(express.json());


// // // app.use(morgan('dev'));
// // // app.use(cors());
// // // app.use(helmet());
// // // app.use(cookieParser());


// // // const limiter = rateLimit({
// // //     windowMs: 60 * 1000, // 1 min
// // //     max: 100
// // // });
// // // app.use(limiter);


// // // // ================= ROUTES =================

// // // // Home route
// // // app.get('/', (req, res) => {
// // //     res.send('Server is running 🚀');
// // // });


// // // // 🔹 Get all users
// // // app.get('/api/users', (req, res) => {
// // //     return res.json(users);
// // // });


// // // // 🔹 Get user by ID
// // // app.get('/api/users/:id', (req, res) => {
// // //     const id = Number(req.params.id);
// // //     const user = users.find(u => u.id === id);

// // //     if (!user) {
// // //         return res.status(404).json({ message: 'User not found' });
// // //     }

// // //     return res.json(user);
// // // });


// // // // 🔹 Add new user
// // // app.post('/api/users', (req, res) => {
// // //     const newUser = {
// // //         id: users.length + 1,
// // //         ...req.body
// // //     };

// // //     users.push(newUser);

// // //     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
// // //         if (err) return res.status(500).json({ message: 'Error saving data' });

// // //         return res.status(201).json({ message: 'User added', user: newUser });
// // //     });
// // // });


// // // // 🔹 Delete user
// // // app.delete('/api/users/:id', (req, res) => {
// // //     const id = Number(req.params.id);

// // //     const index = users.findIndex(u => u.id === id);

// // //     if (index === -1) {
// // //         return res.status(404).json({ message: 'User not found' });
// // //     }

// // //     const deletedUser = users.splice(index, 1);

// // //     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
// // //         if (err) return res.status(500).json({ message: 'Error deleting user' });

// // //         return res.json({ message: 'User deleted', user: deletedUser });
// // //     });
// // // });


// // // // ================= SERVER =================

// // // const PORT = 3000;

// // // app.listen(PORT, () => {
// // //     console.log(`Server running on http://localhost:${PORT}`);
// // // });// const express = require('express');
// // // // const users = require('./MOCK_DATA.json');

// // // // const app = express();

// // // // // middleware
// // // // app.use(express.urlencoded({ extended: false }));
// // // // app.use(express.json());

// // // // // GET all users
// // // // app.get('/users', (req, res) => {
// // // //     return res.json(users);
// // // // });

// // // // // GET user by id
// // // // app.get('/users/:id', (req, res) => {
// // // //     const id = Number(req.params.id);
// // // //     const user = users.find((u) => u.id === id);

// // // //     if (!user) {
// // // //         return res.status(404).json({ message: "User not found" });
// // // //     }

// // // //     return res.json(user);
// // // // });

// // // // // POST new user
// // // // app.post('/users', (req, res) => {
// // // //     const body = req.body;
// // // //     console.log('body', body);

// // // //     users.push({ id: users.length + 1, ...body });

// // // //     return res.json({ status: 'pending' });
// // // // });

// // // // // server start
// // // // app.listen(8000, () => {
// // // //     console.log("server running on port 8000");
// // // // });

// // const express = require('express');
// // const users = require('./MOCK_DATA.json');
// // const fs = require("fs");
// // const path = require('path');
// // const app = express();

// // app.use(express.static(path.join(__dirname, 'public')));
// // app.use(express.urlencoded({ extended: false }));
// // app.use(express.json());

// // // GET /users -> show form page
// // app.get('/users', (req, res) => {
// //     const filePath = path.join(__dirname, 'public', 'index.html');
// //     res.sendFile(filePath);
// // });

// // // POST /users -> get name and rollno, save in log.txt
// // app.post('/users', (req, res) => {
// //     const { name, rollno } = req.body;

// //     if (!name || !rollno) {
// //         return res.status(400).send("Name and Roll No are required");
// //     }

// //     const logData = `Name: ${name}, Roll No: ${rollno}, Time: ${new Date().toISOString()}\n`;

// //     fs.appendFile(path.join(__dirname, 'log.txt'), logData, (err) => {
// //         if (err) {
// //             console.log("Error writing to file:", err);
// //             return res.status(500).send("Error saving data");
// //         }

// //         res.send("Data saved successfully in log.txt");
// //     });
// // });

// // // GET user by id
// // app.get('/users/:id', (req, res) => {
// //     const userid = Number(req.params.id);
// //     const user = users.find((u) => u.id === userid);

// //     if (!user) {
// //         return res.status(404).json({ message: "User not found" });
// //     }

// //     return res.json(user);
// // });

// // // server start
// // app.listen(8000, () => {
// //     console.log("server running on port 8000");
// // });

// // //External Middleware
// // // margin cars helmet cookie-parser express-rate-limit

