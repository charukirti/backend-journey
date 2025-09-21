import express from 'express';

const app = express();
const port = process.env.PORT || 5001;

// middleware to parse json 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

// test route

app.get('/health', (req, res) => {
    res.json({ message: "Everything is working fine" });
});


app.get('/', (req, res) => {
    const data = {
        title: 'My website',
        name: 'John Doe',
        age: 25,
        isLoggedIn: true
    };

    res.render('index', data);
});


app.get('/form', (req, res) => {
    res.render('form');
});

app.post('/calculate', (req, res) => {
    // capturing marks from request body
    const { name, maths, science, english } = req.body;

    // converting marks into numbers
    const mathsMarks = parseInt(maths);
    const scienceMarks = parseInt(science);
    const englishMarks = parseInt(english);

    console.log(`Maths ${mathsMarks}, Science ${scienceMarks}, English ${englishMarks}`);

    // calculating total
    const totalMarks = mathsMarks + scienceMarks + englishMarks;

    console.log('total marks', totalMarks);

    // calculating percentage
    const percentage = (totalMarks / 300) * 100;

    console.log('percentage', percentage);

    // calculating grade

    let grade = '';

    if (percentage >= 90) {
        grade = 'A';
    } else if (percentage < 90 && percentage >= 80) {
        grade = 'B';
    } else if (percentage < 80 && percentage >= 70) {
        grade = 'C';
    } else if (percentage < 70 && percentage >= 60) {
        grade = 'D';
    } else {
        grade = 'F';
    }

    // creating data object

    const data = {
        name: name,
        maths: mathsMarks,
        science: scienceMarks,
        english: englishMarks,
        total: totalMarks,
        percentage: percentage,
        grade: grade

    };

    res.render('result', data);

});

app.listen(port, () => {
    console.log(`Server is running at PORT ${port}`);
});