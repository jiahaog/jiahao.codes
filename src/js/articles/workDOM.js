import React from 'react';
import helpers from './articleHelpers';

const {getYears, getHref} = helpers;
const resume = require('./../../../data/resume');

const work = resume.work;

function workNode(details) {
    const {company, position, startDate, endDate, highlights, website, keywords} = details;
    const {startYear, endYear} = getYears(startDate, endDate);

    return <div className="wow fadeInUp container">
        <div className="columns">
            <div className="column">
                <h2 className="title is-4">
                    {company}
                </h2>
                <h2 className="subtitle is-6">
                    <a target="_blank" href={website}>{position}</a>
                </h2>
            </div>
            <div className="column is-2">
                {startYear} – {endYear}
            </div>
        </div>
        {keywords.map(keyword => {
            return <span key={`${name}-${keyword}`}>
                <a target="_blank" href={getHref(keyword)} className="tag is-success">
                    {keyword}
                </a>{' '}
            </span>
        })}
        <div className="content">
            <ul>
                {highlights.map((highlight, index) => {
                    return <li key={`${company}-highlight-${index}`}>{highlight}</li>
                })}
            </ul>
        </div>
    </div>
}

function workDOM() {
    return <section className="jh-container">
        <h1 className="title">Working Experience</h1>
        <div className="jh-container">
            {work.map((details, index) => {
                return <section key={`work-${index}`} className="section">
                    {workNode(details)}
                </section>
            })}
        </div>
    </section>
}

export default workDOM;
