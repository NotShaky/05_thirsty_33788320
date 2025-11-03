// Create a new router
const express = require("express");
const router = express.Router();
const app = express();

// Define our data
var shopData = {
    shopName: "Shaky's Boba & Baguettes",
    productCategories: ["Boba Milk Tea", "Boba Fruit Tea", "Baguettes", "Snacks"],
    shopLocations: [
        {
            manager: "Shoaib Rahman",
            address: "8 Lewisham Way, London SE14 6NW, UK",
        },
        {
            manager: "Mango Man",
            address: "210 Mile End Rd, London E1 4LJ, UK",
        },
        {
            manager: "HIRING NOW",
            address: "MORE LOCATIONS COMING SOON!",
        },
    ],
};

// Handle the main routes
router.get("/", (req, res) => {
    res.render("index.ejs", shopData);
});

router.get("/about", (req, res) => {
    res.render("about.ejs", shopData);
});

router.get("/search", (req, res) => {
    res.render("search.ejs", shopData);
});

router.get("/survey", (req, res) => {
    res.render("survey.ejs", shopData);
});

router.get("/search_result", function (req, res) {
    res.render("search_result.ejs", {
        ...shopData, // Pass shopData for the header
        searchText: req.query.search_text,
        category: req.query.category,
    });
});

router.get("/register", (req, res) => {
    res.render("register.ejs", shopData);
});

router.post("/registered", (req, res) => {
    res.render("registered.ejs", {
        ...shopData, // Pass shopData for the header
        firstName: req.body.first,
        lastName: req.body.last,
        emailAddress: req.body.email,
    });
});

router.post("/survey_result", (req, res) => {
    // Process checkbox value
    // If checked, req.body.is_student will be 'on'. If not, it will be undefined.
    const studentStatus = req.body.is_student ? "Yes" : "No";

    res.render("survey_result.ejs", {
        ...shopData, // For the header
        firstName: req.body.first_name,
        surname: req.body.surname,
        email: req.body.email,
        age: req.body.age,
        drinkCategory: req.body.drink_category || "No preference selected", // Handle case where nothing is selected
        isStudent: studentStatus,
    });
});

// Export the router object so index.js can access it
module.exports = router;