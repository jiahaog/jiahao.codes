import React from 'react';

const resume = require('./../../../data/resume');

const profiles = resume.basics.profiles;

function profileNode(details) {
    const {network, url} = details;
    return <span key={`photography-${network}`} className="jh-container">
        <a target="_blank" href={url}>
            <img className="profile-svg" src={`svg/${network.toLowerCase()}.svg`} alt={network}/>
        </a>
    </span>

}

function profileDOM() {
    return <section className="jh-container is-centered">
        <h1 className="title">Profiles</h1>
        <h2 className="subtitle">

        </h2>
        <div className="jh-container">
            {profiles.map(details => {
                return profileNode(details);
            })}
        </div>
    </section>
}

export default profileDOM;
