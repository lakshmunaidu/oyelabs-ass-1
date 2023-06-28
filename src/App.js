// question 1

const express = require('express')
const app = express()

app.use(express.json())

// POST /api/login
app.post('/api/login', (req, res) => {
  const {phoneNumber} = req.body

  // Validate phone number format
  if (!isValidPhoneNumber(phoneNumber)) {
    return res.status(400).json({error: 'Invalid phone number format'})
  }

  // Perform phone number login logic here

  // Assuming successful login, return a response
  return res.json({message: 'Phone number login successful'})
})

// Helper function to validate phone number format
function isValidPhoneNumber(phoneNumber) {
  // Implement your phone number validation logic here
  // Return true if the phone number is valid, false otherwise
}

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})


///////question 2-----------------------------------------------------------

SELECT c.customerId, c.name, GROUP_CONCAT(s.subjectName ORDER BY s.subjectName ASC SEPARATOR ',') AS subjects
FROM customers c
JOIN mapping m ON c.customerId = m.customerId
JOIN subjects s ON m.subjectId = s.subjectId
GROUP BY c.customerId, c.name
ORDER BY c.name ASC;


//question 3-------------------------------------------------------------------------------------------------------------
const mysql = require('mysql')
const customers = [
  {
    email: 'anurag11@yopmail.com',
    name: 'anurag',
  },
  {
    email: 'sameer11@yopmail.com',
    name: 'sameer',
  },
  // Rest of the customer data
]

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
})

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err)
    return
  }
  console.log('Connected to MySQL database')

  insertCustomers(customers)
    .then(() => {
      console.log('Data insertion complete')
      connection.end()
    })
    .catch(error => {
      console.error('Error inserting data:', error)
      connection.end()
    })
})

function insertCustomers(customers) {
  const queries = customers.map(customer => {
    const {email, name} = customer
    const sql = `INSERT INTO customers (email, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)`
    const values = [email, name]

    return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      })
    })
  })

  return Promise.all(queries)
}


////question 4-------------------------------------------
const person = {
  id: 2,
  gender: 'mail',
}

const student = {
  name: 'ravi',
  email: 'ravi11@yopmail.com',
}

const mergedObject = {
  ...person,
  ...student,
}

console.log(mergedObject)

///////////////question 5----------------
const request = require('request')
const util = require('util')
const getGoogleHomePage = util.promisify(request)

getGoogleHomePage('http://www.google.com')
  .then(response => {
    console.log('RESULT==>', response.body)
  })
  .catch(error => {
    console.error('Error:', error)
  })

////question 6
const numbers = [1, 2, 3 /* ... */, , 99, 100]
const expectedSum = (100 * (100 + 1)) / 2 // Sum of numbers from 1 to 100
const givenSum = numbers.reduce((sum, num) => sum + num, 0)
const missingNumber = expectedSum - givenSum

console.log('Missing number:', missingNumber)

