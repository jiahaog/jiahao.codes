import React from 'react';
import helpers from './articleHelpers';

const {getYears, getHref} = helpers;

const resume = require('./../../../data/resume');
const projects = resume.projects;

function gitHubButton(user, repo) {
    const src = `https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=star&count=true`;
    return <iframe src={src} scrolling="0" width="170px" height="20px"></iframe>
}

function maybeOverride(repo) {
    if (repo === 'ttt') {
        return <p>
            Play it <a target="_blank" href="http://jiahaog.github.io/ttt">here</a>!
        </p>
    }
}
function projectsDOM() {
    const projectNodes = projects.map(project => {
        const {name, gitHubUser, gitHubRepo, summary, startDate, endDate, keywords, screenshots, website} = project;
        const {startYear, endYear} = getYears(startDate, endDate);
        return <section className="wow fadeInUp section" key={name}>
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <h2 className="title is-4">
                            {name}
                        </h2>
                        <h2 className="subtitle is-6">
                            <div className="text-preset-button-group">
                                {keywords.map((keyword, index) => {
                                    let tagModifier = 'is-success';
                                    if (index === 0) {
                                        tagModifier = 'is-info';
                                    }
                                    return <span key={`${name}-${keyword}`}>
                                            <a target="_blank" href={getHref(keyword)} className={`tag ${tagModifier}`}>
                                                {keyword}
                                            </a>{' '}
                                        </span>
                                })}
                            </div>
                        </h2>
                    </div>

                    <div className="column is-2">
                        <p>{startYear} – {endYear}</p>

                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <div className="content">
                            <p>{summary}</p>
                            <div className="subsection is-text-centered">
                                <a target="_blank" href={website}>
                                    {screenshots ? screenshots.map((src, index) => {
                                        return <img className="project-screenshot" key={`${name}-screenshot-${index}`} src={src} alt={`${name}-screenshot`}/>
                                    }): ''}
                                </a>
                            </div>
                            {maybeOverride(gitHubRepo)}
                        </div>
                    </div>
                    <div className="column is-2">
                        <p>{gitHubButton(gitHubUser, gitHubRepo)}</p>
                    </div>
                </div>
            </div>
        </section>
    });

    return <section className="jh-container">
        <h1 className="title">Projects</h1>
        <div className="columns">
            <div className="column">
                <div className="summary-paragraph content">
                    <p>In my free time, I enjoy working on various open source projects that allows me to explore the exciting new technologies freely available on the internet. Check me out on <a target="_blank" href="https://github.com/jiahaog">GitHub</a>!</p>
                </div>
            </div>
            <div className="column is-3">
                <iframe src="https://ghbtns.com/github-btn.html?user=jiahaog&type=follow&count=true" scrolling="0" width="170px" height="20px"></iframe>
            </div>
        </div>
        {projectNodes}
    </section>
}

export default projectsDOM;
