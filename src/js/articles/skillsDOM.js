import React from 'react';

const resume = require('./../../../data/resume');
const skills = resume.skills;


function keywordNodes(level, proficiency) {

    if (!level) {
        return;
    }

    let proficiencyStr;

    switch (proficiency) {
        case 0:
            proficiencyStr = '+++';
            break;
        case 1:
            proficiencyStr = '++';
            break;
        default:
            proficiencyStr = '+';
            break;
    }

    return level.map(keyword => {
        return <li key={keyword}>
            {keyword} {proficiencyStr}
        </li>
    });
}

function skillNode(details) {
    const {name, levels} = details;

    const skill0 = keywordNodes(levels['0'], 0);
    const skill1 = keywordNodes(levels['1'], 1);
    const skill2 = keywordNodes(levels['2'], 2);

    const proficient = <ul>
        {skill0}
        {skill1}
        {skill2}
    </ul>;

    return <div className="container">
        <h2 className="title is-4">
            {name}
        </h2>
        <div className="content">
            {proficient}
        </div>
    </div>
}

function workDOM() {
    return <section className="jh-container">
        <h1 className="title">Skills</h1>
        <div className="jh-container">
            {skills.map((details, index) => {
                return <section key={`skills-${index}`} className="section">
                    {skillNode(details)}
                </section>
            })}
        </div>
    </section>
}


export default workDOM;
