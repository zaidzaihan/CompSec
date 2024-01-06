const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://zaidzaihan1611:n2kRMBbjonlmy6rF@vms.qotxlyq.mongodb.net/";
const client = new MongoClient(uri);

var jwt = require('jsonwebtoken');
const privatekey = "helloworld";
var token;

const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'VMS API',
            version: '1.0.0'
        },
        components: {  // Add 'components' section
            securitySchemes: {  // Define 'securitySchemes'
                bearerAuth: {  // Define 'bearerAuth'
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./index.js'],
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const bcrypt = require('bcrypt');
var hashed;

app.use(express.json())

//Generate Hash for password
async function generateHash(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}


// register a visitor 
async function register(identification_No, name, gender, ethnicity, temperature, dateofbirth, citizenship, document_type, expiryDate, address, town, postcode, state, country, phone_number, vehicle_number, vehicle_type, visitor_category, preregistered_pass, no_of_visitors, purpose_of_visit, visit_limit_hrs, visit_limit_min, To_meet, Host_Information, Location_or_department, Unit_no, Location_Information, Permit_number, Delivery_Order, Remarks, fever, sore_throat, dry_cough, runny_nose, shortness_of_breath, body_ache, travelled_oversea_last_14_days, contact_with_person_with_Covid_19, recovered_from_covid_19, covid_19_test, date){
    await client.connect();
    const exist = await client.db("VMS").collection("Visitors").findOne({identification_No: identification_No});
    //hashed = await bcrypt.hash(password,10);
    if(exist){
        console.log("User is already registered!");
    }else{
        await client.db("VMS").collection("Visitors").insertOne({
            identification_No: identification_No,
            name: name,
            gender: gender,
            ethnicity: ethnicity,
            temperature: temperature,
            dateofbirth: dateofbirth,
            citizenship: citizenship,
            document_type: document_type,
            expiryDate: expiryDate,
            address: address,
            town: town,
            postcode: postcode,
            state: state,
            country: country,
            phone_number: phone_number,
            vehicle_number: vehicle_number,
            vehicle_type: vehicle_type,
            visitor_category: visitor_category,
            preregistered_pass: preregistered_pass,
            no_of_visitors: no_of_visitors,
            purpose_of_visit: purpose_of_visit,
            visit_limit_hrs: visit_limit_hrs,
            visit_limit_min: visit_limit_min,
            To_meet: To_meet,
            Host_Information: Host_Information,
            Location_or_department: Location_or_department,
            Unit_no: Unit_no,
            Location_Information: Location_Information,
            Permit_number: Permit_number,
            Delivery_Order: Delivery_Order, 
            Remarks: Remarks,
        });
        await client.db("VMS").collection("Health Status").insertOne({
            identification_No: identification_No,
            Name: name,
            temperature: temperature,
            fever: fever,
            sore_throat: sore_throat,
            dry_cough: dry_cough,
            runny_nose: runny_nose,
            shortness_of_breath: shortness_of_breath,
            body_ache: body_ache,
            travelled_oversea_last_14_days: travelled_oversea_last_14_days,
            contact_with_person_with_Covid_19: contact_with_person_with_Covid_19,
            recovered_from_covid_19: recovered_from_covid_19,
            covid_19_test: covid_19_test,
            date: date
        });
        console.log("registered successfully!");
    }
}


//update Visitor for admin
async function updateVisitor(identification_No, name, gender, ethnicity, temperature, dateofbirth, citizenship, document_type, expiryDate, address, town, postcode, state, country, phone_number, vehicle_number, vehicle_type, visitor_category, preregistered_pass, no_of_visitors, purpose_of_visit, visit_limit_hrs, visit_limit_min, To_meet, Host_Information, Location_or_department, Unit_no, Location_Information, Permit_number, Delivery_Order, Remarks, fever, sore_throat, dry_cough, runny_nose, shortness_of_breath, body_ache, travelled_oversea_last_14_days, contact_with_person_with_Covid_19, recovered_from_covid_19, covid_19_test, date) {
    try {
      // Connect to the MongoDB server
      await client.connect();
      console.log('Connected to the MongoDB server');
  
      const exist = await client.db("VMS").collection("Visitors").findOne({ identification_No: identification_No });
      if (exist) {
        await client.db("VMS").collection("Visitors").updateOne(
            { identification_No: identification_No },
            {$set: {
                name: name,
                gender: gender,
                ethnicity: ethnicity,
                temperature: temperature,
                dateofbirth: dateofbirth,
                citizenship: citizenship,
                document_type: document_type,
                expiryDate: expiryDate,
                address: address,
                town: town,
                postcode: postcode,
                state: state,
                country: country,
                phone_number: phone_number,
                vehicle_number: vehicle_number,
                vehicle_type: vehicle_type,
                visitor_category: visitor_category,
                preregistered_pass: preregistered_pass,
                no_of_visitors: no_of_visitors,
                purpose_of_visit: purpose_of_visit,
                visit_limit_hrs: visit_limit_hrs,
                visit_limit_min: visit_limit_min,
                To_meet: To_meet,
                Host_Information: Host_Information,
                Location_or_department: Location_or_department,
                Unit_no: Unit_no,
                Location_Information: Location_Information,
                Permit_number: Permit_number,
                Delivery_Order: Delivery_Order,
                Remarks: Remarks
              }
            }
          );
      await client.db("VMS").collection("Health Status").updateOne(
        { identification_No: identification_No },
        {
          $set: {
            Name: name,
            temperature: temperature,
            fever: fever,
            sore_throat: sore_throat,
            dry_cough: dry_cough,
            runny_nose: runny_nose,
            shortness_of_breath: shortness_of_breath,
            body_ache: body_ache,
            travelled_oversea_last_14_days: travelled_oversea_last_14_days,
            contact_with_person_with_Covid_19: contact_with_person_with_Covid_19,
            recovered_from_covid_19: recovered_from_covid_19,
            covid_19_test: covid_19_test,
            date: date
          }
        }
      );
      console.log("Updated successfully!");
    }else {
        console.log("Visitor not found!");
      }
    } catch (error) {
      console.error("Error updating visitor:", error);
    } finally {
      // Close the connection
      await client.close();
      console.log('Connection closed');
    }
  }


//Logs function
async function logs(identification_No, name, role) {
    const options = { timeZone: 'Asia/Kuala_Lumpur' }; // Set the time zone to Malaysia

    // Get the current date and time in Malaysia
    const currentDate = new Date().toLocaleDateString('en-MY', options);
    const currentTime = new Date().toLocaleTimeString('en-MY', options);

    await client.connect();

    // Insert the log with the formatted local date and time
    client.db("VMS").collection("Logs").insertOne({
        identification_No: identification_No,
        name: name,
        Type: role,
        date: currentDate,
        entry_time: currentTime,
        exit_time: "pending"
    });
}

    
//login for staff
async function login(res, identification, hashedPassword) {
    await client.connect();
    const exist = await client.db("VMS").collection("UserInfo").findOne({ identification_No: identification });
    if (exist) {
        const passwordMatch = await bcrypt.compare(exist.password, hashedPassword);
        if (passwordMatch) {
            console.log("Login Success!\nRole: "+ exist.role);
            logs(identification, exist.name, exist.role);
            const token = jwt.sign({ identification_No: identification, role: exist.role }, privatekey);
            res.send("Token: " + token);
        } else {
            console.log("Wrong password!");
        }
    } else {
        console.log("Username not exist!");
    }
}

async function visitorLogin(res, Identification_No){
    await client.connect();
    const exist = await client.db("VMS").collection("Visitors").findOne({identification_No: Identification_No});
    if(exist){
        res.send("Welcome!");
        //Masukkan logs
        await logs(Identification_No, exist.name, exist.visitor_category);
    } else {
        res.send("Visitor not registered!");
    }
}

//view visitor
async function viewVisitors(identification_No, role) {
    try {
        await client.connect();
        let exist;

        if (role === "Admin" || role === "Staff" || role === "Security") {
            exist = await client.db("VMS").collection("Visitors").find({}).toArray();
        } else {
            exist = await client.db("VMS").collection("Visitors").findOne({ identification_No: identification_No });
        }

        return exist;
    } catch (error) {
        // Handle errors appropriately
        console.error("An error occurred:", error.message);
        return null; // Return null or another suitable value to indicate an error
    }
}



//post method to register visitor
/**
 * @swagger
 * /user/registerVisitor:
 *   post:
 *     summary: Register a visitor
 *     description: Register a visitor with required details
 *     tags:
 *       - Staff
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identification_No:
 *                 type: string
 *               name:
 *                 type: string
 *               gender:
 *                 type: string
 *               ethnicity:
 *                 type: string
 *               temperature:
 *                 type: string
 *               dateofbirth:
 *                 type: string
 *               citizenship:
 *                 type: string
 *               document_type:
 *                 type: string
 *               expiryDate:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *               town:
 *                 type: string
 *               postcode:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               vehicle_number:
 *                 type: string
 *               vehicle_type:
 *                 type: string
 *               visitor_category:
 *                 type: string
 *               preregistered_pass:
 *                 type: string
 *               no_of_visitors:
 *                 type: string
 *               purpose_of_visit:
 *                 type: string
 *               visit_limit_hrs:
 *                 type: string
 *               visit_limit_min:
 *                 type: string
 *               To_meet:
 *                 type: string
 *               Host_Information:
 *                 type: string
 *               Location_or_department:
 *                 type: string
 *               Unit_no:
 *                 type: string
 *               Location_Information:
 *                 type: string
 *               Permit_number:
 *                 type: string
 *               Delivery_Order:
 *                 type: string
 *               Remarks:
 *                 type: string
 *               fever:
 *                 type: string
 *               sore_throat:
 *                 type: string
 *               dry_cough:
 *                 type: string
 *               runny_nose:
 *                 type: string
 *               shortness_of_breath:
 *                 type: string
 *               body_ache:
 *                 type: string
 *               travelled_oversea_last_14_days:
 *                 type: string
 *               contact_with_person_with_Covid_19:
 *                 type: string
 *               recovered_from_covid_19:
 *                 type: string
 *               covid_19_test:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       '200':
 *         description: Visitor registration successful
 *       '400':
 *         description: Invalid request body or insufficient permissions
 *       '401':
 *         description: Unauthorized - Invalid token or insufficient permissions
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *   securityDefinitions:
 *     JWT:
 *       type: "apiKey"
 *       name: "Authorization"
 *       in: "header"
 */
app.post('/user/registerVisitor', async function(req, res){
    var token = req.header('Authorization').split(" ")[1];
    try {
        var decoded = jwt.verify(token, privatekey);
        if (!decoded || !decoded.role) {
            res.status(401).send("Unauthorized");
            return;
        }
    } catch(err) {
        res.status(500).send("Error!");
        return;
    }
    if (decoded.role === "Staff" || decoded.role === "Admin") {
        const {
            identification_No, name, gender, ethnicity, temperature, dateofbirth, citizenship, document_type, expiryDate, address, town, postcode, state, country, phone_number, vehicle_number, vehicle_type, visitor_category, preregistered_pass, no_of_visitors, purpose_of_visit, visit_limit_hrs, visit_limit_min, To_meet, Host_Information, Location_or_department, Unit_no, Location_Information, Permit_number, Delivery_Order, Remarks, fever, sore_throat, dry_cough, runny_nose, shortness_of_breath, body_ache, travelled_oversea_last_14_days, contact_with_person_with_Covid_19, recovered_from_covid_19, covid_19_test, date
        } = req.body;

        try {
            await register(identification_No, name, gender, ethnicity, temperature, dateofbirth, citizenship, document_type, expiryDate, address, town, postcode, state, country, phone_number, vehicle_number, vehicle_type, visitor_category, preregistered_pass, no_of_visitors, purpose_of_visit, visit_limit_hrs, visit_limit_min, To_meet, Host_Information, Location_or_department, Unit_no, Location_Information, Permit_number, Delivery_Order, Remarks, fever, sore_throat, dry_cough, runny_nose, shortness_of_breath, body_ache, travelled_oversea_last_14_days, contact_with_person_with_Covid_19, recovered_from_covid_19, covid_19_test, date);
            res.send("Registered visitor successfully!");
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while registering the visitor");
        }
    } else {
        res.status(403).send("Forbidden: You do not have access");
    }
});

//login post for staff
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Authenticate user
 *     description: Login with identification number and password
 *     tags:
 *       - Staff
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identification_No:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized - Invalid credentials
 */
app.post('/user/login', async function(req, res){
    const { identification_No, password } = req.body;
    const hashedPassword = await generateHash(password);
    await login(res, identification_No, hashedPassword);
});


//user logout
/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: User logout
 *     description: Logout user by updating exit time in logs
 *     tags:
 *       - Staff
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User successfully logged out
 *       '400':
 *         description: Invalid request body or user not logged in before
 */
app.post('/user/logout', async function(req, res){
    try {
        const token = req.header('Authorization').split(' ')[1];
        const decodedToken = jwt.verify(token, privatekey);

        const currentDate = new Date();
        const exitTime = currentDate.toLocaleTimeString("en-US", { timeZone: "Asia/Kuala_Lumpur" }); // Get the time only

        await client.connect();
        const exist = await client.db("VMS").collection("UserInfo").findOne({ identification_No: decodedToken.identification_No });
        if(exist){
            await client.db("VMS").collection("Logs").updateOne({ identification_No: decodedToken.identification_No }, { $set: { exit_time: exitTime, date: currentDate.toLocaleDateString() } });
            res.send(`Successfully logged out!\nCheck out time: ${exitTime}`);
            console.log(exist.exit_time);
        } else {
            res.send("User not found!");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});


//delete visitors
/**
 * @swagger
 * /deleteVisitors/{id}:
 *   delete:
 *     summary: Delete visitor by ID
 *     description: Delete a visitor and their health status by ID
 *     tags:
 *       - Staff
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the visitor to be deleted
 *     requestBody:
 *       required: false
 *     responses:
 *       '200':
 *         description: Visitor deleted successfully
 *       '400':
 *         description: Visitor not found or insufficient permissions
 *       '401':
 *         description: Unauthorized - Invalid token or insufficient permissions
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *   securityDefinitions:
 *     JWT:
 *       type: "apiKey"
 *       name: "Authorization"
 *       in: "header"
 */
app.delete('/deleteVisitors/:id',async function(req, res) {
    const documentId = req.params.id;
    var token = req.header('Authorization').split(" ")[1];
    var decoded = jwt.verify(token, privatekey);
    console.log(decoded.role);
    await client.connect();
if(decoded.role == "Admin"|| decoded.role == "Staff"){
    const exist = await client.db("VMS").collection("Visitors").findOne({identification_No: documentId})
    if(exist){
        await client.db("VMS").collection("Visitors").deleteOne({ identification_No: documentId });
        await client.db("VMS").collection("Health Status").deleteOne({ identification_No: documentId });
        res.send("Deleted Successfully!");
    }else{
        res.send("Visitor not found!");
    }}
    else{
        res.send("No access!");
    }
});



//login post for visitor
/**
 * @swagger
 * /visitor/login:
 *   post:
 *     summary: Visitor login
 *     description: Login for visitor authentication
 *     tags:
 *       - Visitors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identification_No:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Visitor login successful
 *       '401':
 *         description: Invalid credentials or visitor not found
 */
app.post('/visitor/login', async function(req, res){
    const {identification_No} = req.body;
    visitorLogin(res, identification_No);
});

//View Visitor
/**
 * @swagger
 * /user/view/visitor:
 *   post:
 *     summary: "View visitors"
 *     description: "Retrieve visitors based on user role"
 *     tags:
 *       - Staff & Visitors
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: "Visitors retrieved successfully"
 *       '400':
 *         description: "Invalid token or error in retrieving visitors"
 *       '401':
 *         description: "Unauthorized - Invalid token or insufficient permissions"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *   securityDefinitions:
 *     JWT:
 *       type: "apiKey"
 *       name: "Authorization"
 *       in: "header"
 */
app.post('/user/view/visitor', async function(req, res){
    var token = req.header('Authorization').split(" ")[1];
    try {
        var decoded = jwt.verify(token, privatekey);
        console.log(decoded.role);
        res.send(await viewVisitors(decoded.identification_No, decoded.role));
      } catch(err) {
        res.send("Error!");
      }
});

//update visitor
/**
 * @swagger
 * /user/updateVisitor:
 *   post:
 *     summary: Update visitor information
 *     description: Update visitor details based on user role
 *     tags:
 *       - Staff
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identification_No:
 *                 type: string
 *               name:
 *                 type: string
 *               gender:
 *                 type: string
 *               ethnicity:
 *                 type: string
 *               temperature:
 *                 type: string
 *               dateofbirth:
 *                 type: string
 *                 format: date
 *               citizenship:
 *                 type: string
 *               document_type:
 *                 type: string
 *               expiryDate:
 *                 type: string
 *                 format: date
 *               # Add other properties here...
 *               recovered_from_covid_19:
 *                 type: string
 *               covid_19_test:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       '200':
 *         description: Visitor information updated successfully
 *       '400':
 *         description: Invalid request body or insufficient permissions
 *       '401':
 *         description: Unauthorized - Invalid token or insufficient permissions
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 *   securityDefinitions:
 *     JWT:
 *       type: "apiKey"
 *       name: "Authorization"
 *       in: "header"
 */

app.post('/user/updateVisitor', async function(req, res){
    var token = req.header('Authorization').split(" ")[1];
    const {identification_No, name, gender, ethnicity, temperature, dateofbirth, citizenship, document_type, expiryDate, address, town, postcode, state, country, phone_number, vehicle_number, vehicle_type, visitor_category, preregistered_pass, no_of_visitors, purpose_of_visit, visit_limit_hrs, visit_limit_min, To_meet, Host_Information, Location_or_department, Unit_no, Location_Information, Permit_number, Delivery_Order, Remarks, fever, sore_throat, dry_cough, runny_nose, shortness_of_breath, body_ache, travelled_oversea_last_14_days, contact_with_person_with_Covid_19, recovered_from_covid_19, covid_19_test, date} = req.body;
    var decoded = jwt.verify(token, privatekey);
    console.log(decoded.role);
    if(decoded.role == "Admin" || decoded.role == "Staff"){
        await updateVisitor(identification_No, name, gender, ethnicity, temperature, dateofbirth, citizenship, document_type, expiryDate, address, town, postcode, state, country, phone_number, vehicle_number, vehicle_type, visitor_category, preregistered_pass, no_of_visitors, purpose_of_visit, visit_limit_hrs, visit_limit_min, To_meet, Host_Information, Location_or_department, Unit_no, Location_Information, Permit_number, Delivery_Order, Remarks, fever, sore_throat, dry_cough, runny_nose, shortness_of_breath, body_ache, travelled_oversea_last_14_days, contact_with_person_with_Covid_19, recovered_from_covid_19, covid_19_test, date);
    }else{
        console.log("No access!");
    }
});


//To view logs for authorized user
/**
 * @swagger
 * /user/view/Logs:
 *   post:
 *     summary: "View all logs in the database"
 *     description: "Retrieve logs for all users in database"
 *     tags:
 *       - Staff
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: "Logs retrieved successfully"
 *       '400':
 *         description: "Invalid token or error in retrieving logs"
 *       '401':
 *         description: "Unauthorized - Invalid token or insufficient permissions"
 *     consumes:
 *       - "application/json"
 *     produces:
 *       - "application/json"
 * securityDefinitions:
 *   JWT:
 *     type: "apiKey"
 *     name: "Authorization"
 *     in: "header"
 */
app.post('/user/view/Logs', async function(req, res){
    var token = req.header('Authorization').split(" ")[1];
    await client.connect()
    var decoded = jwt.verify(token, privatekey);
    console.log(decoded.role);
    if(decoded.role == "Admin" || decoded.role == "Security"){
        const datalogs = await client.db("VMS").collection("Logs").find({}).toArray() 
        res.send(datalogs);
    }else{
        res.send("No access!");
    }
})

//Visitor logout
/**
 * @swagger
 * /visitor/logout:
 *   post:
 *     summary: Visitor logout
 *     description: Logout for visitors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identification_No:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Visitor logged out successfully
 *       '400': 
 *         description: Invalid request body or user not logged in
 */
app.post('/visitor/logout', async function(req, res){
    const {identification_No} = req.body;
    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleTimeString(); // Format: HH:MM:SS
    await client.connect();
    const exist = await client.db("VMS").collection("Visitors").findOne({identification_No: identification_No});
    if(exist){
        await client.db("VMS").collection("Logs").updateOne({identification_No: identification_No},{$set:{exit_time: formattedTime}});
        res.send("Successfully log Out!\nCheck out time: "+ formattedTime);
    }else{
        res.send("User not logged In!");
    }
});

app.get('/', (req, res)=>{
    res.send("Testing deployment from zaidzaihan.azurewebsites.net");
});



app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
  });

