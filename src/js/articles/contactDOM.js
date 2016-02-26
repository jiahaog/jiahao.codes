import React from 'react';

const resume = require('./../../../data/resume');

const basics = resume.basics;
const {email} = basics;

function contactDOM() {
    return <section className="wow fadeInUp jh-container">
        <div className="container">
            <h1 className="title">Contact</h1>
            <h2 className="subtitle">
                <a href={`mailto:${email}`}>{email}</a>
            </h2>
        </div>
    </section>
}

export default contactDOM;
