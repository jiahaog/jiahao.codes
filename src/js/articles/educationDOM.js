import React from 'react';

const resume = require('./../../../data/resume');
const university = resume.education[0];
const preUniversity = resume.education[1];

function getYear(dateString) {
    return new Date(dateString).getUTCFullYear();
}
function getYears(startDateString, endDateString) {
    return {
        startYear: getYear(startDateString),
        endYear: getYear(endDateString)
    }
}

function universityDOM() {
    const {institution, area, studyType, track, startDate, endDate, courses, highlights} = university;
    const {startYear, endYear} = getYears(startDate, endDate);
    return <section className="section">
        <div className="container">
            <div className="columns">
                <div className="column">

                    <h2 className="title is-4">
                        {institution}
                    </h2>
                    <h2 className="subtitle is-6">
                        University
                    </h2>
                </div>
                <div className="column is-2">
                    {startYear} – {endYear}
                </div>
            </div>
            <div className="content">
                <ul>
                    <li>{studyType}</li>
                    <li>{area}</li>
                    <li>{track} Track</li>
                    <li>{highlights[0]}</li>
                </ul>
            </div>
        </div>
    </section>
}

function preUniversityDOM() {
    const {institution, area, studyType, track, startDate, endDate, courses, highlights} = preUniversity;
    const {startYear, endYear} = getYears(startDate, endDate);
    return <section className="section">
        <div className="container">
            <div className="columns">
                <div className="column">

                    <h2 className="title is-4">
                        {institution}
                    </h2>
                    <h2 className="subtitle is-6">
                        Secondary School & Junior College
                    </h2>
                </div>
                <div className="column is-2">
                    {startYear} – {endYear}
                </div>
            </div>
            <div className="content">
                <ul>
                    <li>{studyType}</li>
                </ul>
            </div>
        </div>
    </section>
}

function educationDOM() {
    return <section className="section">
            <h1 className="title">Education</h1>
            {universityDOM()}
            {preUniversityDOM()}
    </section>
}

export default educationDOM;
