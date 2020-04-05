const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const someRoutes = express.Router();
const PORT = 4000;


app.use(cors());
app.use(bodyParser.json());

//mongoose
const { mongoose } = require("./db/mongoose");
const { Company } = require("./db/models/company");
const { ExchangeRate } = require("./db/models/exchangerate");

// companies
someRoutes.route('/companies').get(function (req, res) {
    Company.find(function (err, companies) {
        if (err) {
            console.log(err);
        } else {
            res.json(companies);
        }
    });
});

someRoutes.route('/company/:id').get(function (req, res) {
    let id = req.params.id;
    Company.findById(id, function (err, company) {
        res.json(company);
    });
});

someRoutes.route('/company/update/:id').post(function (req, res) {
    Company.findById(req.params.id, function (err, company) {
        if (!company)
            res.status(404).send("data is not found");
        else
            company.id = req.body.company_id;
        company.name = req.body.company_name;
        company.tier = req.body.company_tier;

        company.save().then(todo => {
            res.json('Company updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

someRoutes.route('/company/add').post(function (req, res) {
    let company = new Company(req.body);
    company.save()
        .then(company => {
            res.status(200).json({ 'company': 'company added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new company failed');
        });
});

// exchange rates
someRoutes.route('/rates').get(function (req, res) {
    ExchangeRate.find(function (err, rates) {
        if (err) {
            console.log(err);
        } else {
            res.json(rates);
        }
    });
});


app.use('/com', someRoutes);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});