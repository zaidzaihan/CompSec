const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://zaidzaihan1611:n2kRMBbjonlmy6rF@vms.qotxlyq.mongodb.net/";
const client = new MongoClient(uri);

var jwt = require('jsonwebtoken');
const privatekey = "helloworld";
var token;

const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 

const bcrypt = require('bcrypt');
const saltround = 10;
var hashed;

app.use(express.json())

//Generate Hash for password
async function generateHash(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}


// register a visitor 
async function register(identification_No, name, password, gender, ethnicity, temperature, dateofbirth, citizenship, document_type, expiryDate, address, town, postcode, state, country, phone_number, vehicle_number, vehicle_type, visitor_category, preregistered_pass, no_of_visitors, purpose_of_visit, visit_limit_hrs, visit_limit_min, To_meet, Host_Information, Location_or_department, Unit_no, Location_Information, Permit_number, Delivery_Order, Remarks, fever, sore_throat, dry_cough, runny_nose, shortness_of_breath, body_ache, travelled_oversea_last_14_days, contact_with_person_with_Covid_19, recovered_from_covid_19, covid_19_test, date){
    await client.connect();
    const exist = await client.db("VMS").collection("Visitors").findOne({identification_No: identification_No});
    hashed = await bcrypt.hash(password,10);
    if(exist){
        console.log("User is already registered!");
    }else{
        await client.db("VMS").collection("Visitors").insertOne({
            identification_No: identification_No,
            name: name,
            password: hashed,
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
async function logs(identification_No, name, role){
    // Get the current date and time
    const currentDate = new Date();

    // Format the date
    const formattedDate = currentDate.toLocaleDateString(); // Format: MM/DD/YYYY

    // Format the time
    const formattedTime = currentDate.toLocaleTimeString(); // Format: HH:MM:SS
    await client.connect()
    client.db("VMS").collection("Logs").insertOne({
        identification_No: identification_No,
        name: name,
        Type: role,
        date: formattedDate,
        entry_time: formattedTime,
        exit_time: "pending"
    })
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

async function visitorLogin(res, Identification_No, password){
    await client.connect();
    const exist = await client.db("VMS").collection("Visitors").findOne({identification_No: Identification_No});
    if(exist){
        if(bcrypt.compare(password,await exist.password)){
        console.log("Welcome!");
        token = jwt.sign({ identification_No: Identification_No, role: exist.visitor_category}, privatekey);
        res.send("Token: "+ token);
        //Masukkan logs
        await logs(Identification_No, exist.name, exist.visitor_category);
        }else{
            console.log("Wrong password!")
        }
    }else{
        console.log("Visitor not registered!");
    }
}


//view visitor
async function viewVisitors(identification_No, role){
    var exist;
    await client.connect();
    if(role == "Admin" || role == "Staff" || role == "Security"){
        exist = client.db("VMS").collection("Visitors").find({}).toArray();
    }else if (role == "Guest"){
        exist = await client.db("VMS").collection("Visitors").findOne({identification_No:identification_No});
    }
    return exist;
}


//post method to register visitor
app.post('/user/registerVisitor', async function(req, res){
    var token = req.header('Authorization').split(" ")[1];
    try {
        var decoded = jwt.verify(token, privatekey);
        console.log(decoded.role);
      } catch(err) {
        console.log("Error!");
      }
    console.log(decoded);
    if (await decoded.role == "Staff" || await decoded.role == "Admin"){
        const {identification_No, name, password, gender, ethnicity, temperature, dateofbirth, citizenship, document_type, expiryDate, address, town, postcode, state, country, phone_number, vehicle_number, vehicle_type, visitor_category, preregistered_pass, no_of_visitors, purpose_of_visit, visit_limit_hrs, visit_limit_min, To_meet, Host_Information, Location_or_department, Unit_no, Location_Information, Permit_number, Delivery_Order, Remarks, fever, sore_throat, dry_cough, runny_nose, shortness_of_breath, body_ache, travelled_oversea_last_14_days, contact_with_person_with_Covid_19, recovered_from_covid_19, covid_19_test, date} = req.body;
        await register(identification_No, name,password, gender, ethnicity, temperature, dateofbirth, citizenship, document_type, expiryDate, address, town, postcode, state, country, phone_number, vehicle_number, vehicle_type, visitor_category, preregistered_pass, no_of_visitors, purpose_of_visit, visit_limit_hrs, visit_limit_min, To_meet, Host_Information, Location_or_department, Unit_no, Location_Information, Permit_number, Delivery_Order, Remarks, fever, sore_throat, dry_cough, runny_nose, shortness_of_breath, body_ache, travelled_oversea_last_14_days, contact_with_person_with_Covid_19, recovered_from_covid_19, covid_19_test, date);
    }else{
        console.log("You have no access!");
    }
});


//login post for staff
app.post('/user/login', async function(req, res){
    const { identification_No, password } = req.body;
    const hashedPassword = await generateHash(password);
    await login(res, identification_No, hashedPassword);
});

app.post('/user/logout', async function(req, res){
    const {identification_No, password} = req.body;
    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleTimeString(); // Format: HH:MM:SS
    await client.connect();
    const exist = await client.db("VMS").collection("UserInfo").findOne({identification_No: identification_No});
    if(exist){
        if(await exist.password == password){
            await client.db("VMS").collection("Logs").updateOne({ identification_No: identification_No },{ $set: { exit_time: formattedTime } });
            console.log("Successfully log Out!\nCheck out time: "+ formattedTime);
            console.log(exist.exit_time);
        }
    }else{
        console.log("User not logged In before!")
    }
});

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
        console.log("Visitor not found!");
    }}
    else{
        console.log("No access!");
    }
});

//login post for visitor
app.post('/visitor/login', async function(req, res){
    const {identification_No, password} = req.body;
    visitorLogin(res, identification_No, password);
});

app.post('/user/view/visitor', async function(req, res){
    var token = req.header('Authorization').split(" ")[1];
    try {
        var decoded = jwt.verify(token, privatekey);
        console.log(decoded.role);
        res.send(await viewVisitors(decoded.identification_No, decoded.role));
      } catch(err) {
        console.log("Error!");
      }
});


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

app.post('/user/viewLogs', async function(req, res){
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


app.post('/visitor/logout', async function(req, res){
    const {identification_No} = req.body;
    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleTimeString(); // Format: HH:MM:SS
    await client.connect();
    const exist = await client.db("VMS").collection("Visitors").findOne({identification_No: identification_No});
    if(exist){
        await client.db("VMS").collection("Logs").updateOne({identification_No: identification_No},{$set:{exit_time: formattedTime}});
        console.log("Successfully log Out!\nCheck out time: "+ formattedTime);
    }else{
        console.log("User not logged In!");
    }
});

app.get('/', (req, res)=>{
    res.send("Test deployment");
});



app.listen(port, () => {
    console.log(`Server listening at port ${port}`)
  });

