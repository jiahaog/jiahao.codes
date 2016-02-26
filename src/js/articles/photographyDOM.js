import React from 'react';

const resume = require('./../../../data/resume');

const photographyProjects = resume.photography;

function imageNode(details) {
    const {name, website, imageName, summary} = details;
    return <div key={`photography-${imageName}`} className="wow fadeInUp jh-container is-text-centered">
        <div className="photo-showcase-container container">
            <a target="_blank" href={website}>
                <div className="photo-container">
                    <img className="photo-showcase-img" src={`img/${imageName}.jpg`} alt={name}
                         srcSet={`img/${imageName}-480px.jpg 480w, img/${imageName}-960px.jpg 960w, img/${imageName}-1440px.jpg 1440w, img/${imageName}-1920px.jpg 1920w`}
                         sizes="(max-width: 480px) 80vw, (max-width: 900px) 70vw, 700px"/>
                </div>
                <div className="photo-caption-container">
                    <div className="photo-caption title">{name}</div>
                    <div className="photo-caption subtitle">{summary}</div>
                </div>

            </a>
            <div className="photo-caption-container-touch">
                <div className="title is-4">{name}</div>
                <div className="subtitle is-6">{summary}</div>
            </div>
        </div>
    </div>
}

function photographyDOM() {
    return <section className="jh-container is-text-centered">
        <h1 className="title">Photography</h1>
        <h2 className="subtitle">
            Nikon D610 | 50mm <span className="f-number-symbol">f</span>1.8 | 28mm <span
            className="f-number-symbol">f</span>2.8
        </h2>

        {photographyProjects.map(details => {
            return imageNode(details);
        })}
    </section>
}

export default photographyDOM;
