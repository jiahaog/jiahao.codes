import React from 'react';

const resume = require('./../../../data/resume');
const skills = resume.skills;

function normalizeKeyword(keyword) {
    return keyword.toLowerCase().replace(' ', '-');
}

function keywordNodes(level, proficiency) {

    if (!level) {
        return;
    }

    let proficiencyStr;
    let colorModifier;
    switch (proficiency) {
        case 0:
            proficiencyStr = '+++';
            colorModifier = 'color-primary';
            break;
        case 1:
            proficiencyStr = '++';
            colorModifier = 'color-info';
            break;
        default:
            proficiencyStr = '+';
            colorModifier = 'color-success';
            break;
    }


    return level.map(keyword => {
        const svgFileName = normalizeKeyword(keyword);
        return <div key={keyword} className={`${colorModifier} skill-item column children-v-centered`}>
            <a className={`${colorModifier} columns is-mobile is-fullwidth is-clickable`}>
                <div className="column is-text-centered children-v-centered">
                    <img className="skill-svg" src={`svg/${svgFileName}.svg`} alt={keyword}/>
                </div>
                <div className="column children-v-centered">
                    <div className="is-text-centered">{keyword}</div>
                </div>
                <div className="column children-v-centered">
                    <div>{proficiencyStr}</div>
                </div>
            </a>
        </div>
    });
}

function skillNode(details) {
    const {name, levels} = details;

    const skill0 = keywordNodes(levels['0'], 0);
    const skill1 = keywordNodes(levels['1'], 1);
    const skill2 = keywordNodes(levels['2'], 2);

    const proficient = <ul className="columns is-multiline is-mobile">
        {skill0}
        {skill1}
        {skill2}
    </ul>;

    return <div className="container">
        <h2 className="title is-4">
            {name}
        </h2>
        {proficient}
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
