import React from 'react';

const resume = require('./../../../data/resume');

const photographyProjects = resume.photography;

function imageNode(details) {
    const {name, website, imageName} = details;
    return <div key={`photography-${imageName}`} className="jh-container is-centered">
        <a target="_blank" href={website}>
            <div className="photo-showcase-container">
                <img className="photo-showcase-img" src={`img/${imageName}.jpg`} alt={name}
                     srcSet={`img/${imageName}-480px.jpg 480w, img/${imageName}-960px.jpg 960w, img/${imageName}-1440px.jpg 1440w, img/${imageName}-1920px.jpg 1920w`}
                     sizes="(max-width: 480px) 100vw, (max-width: 900px) 70vw, 700px"/>
                <span className="photo-caption title">{name}</span>
            </div>
        </a>
    </div>
}

function photographyDOM() {
    return <section className="section">
        <div className="is-centered">
            <h1 className="title">Photography</h1>
            <h2 className="subtitle">
                Nikon D610 | 50mm <span className="f-number-symbol">f</span>1.8 | 28mm <span className="f-number-symbol">f</span>2.8
            </h2>
        </div>

        {photographyProjects.map(details => {
            return imageNode(details);
        })}
    </section>
}

export default photographyDOM;
