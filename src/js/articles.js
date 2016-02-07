import React from 'react';
import Levenshtein from 'levenshtein';


function educationDOM() {
    return <section className="section">
        <div className="container">
            <h1 className="title">Education</h1>
            <h2 className="subtitle">
                Singapore University of Technology and Design
            </h2>
        </div>
    </section>
}

function contactDOM() {
    return <section className="section">
        <div className="container">
            <h1 className="title">Contact</h1>
            <h2 className="subtitle">
                jiahao@example.com
            </h2>
        </div>
    </section>
}

function photographyDOM() {
    return <section className="section">
        <div className="is-centered">
            <h1 className="title">Photography</h1>
            <h2 className="subtitle">
                Nikon D610 | 50mm <span className="f-number-symbol">f</span>1.8 | 28mm <span className="f-number-symbol">f</span>2.8
            </h2>
        </div>
        <div className="jh-container center-content" >
            <iframe className="storehouse-src" src="//www.storehouse.co/stories/ascprp8jjCv9/embed" scrolling="no"></iframe>
        </div>
        <div className="jh-container center-content" >
            <iframe className="storehouse-src" src="//www.storehouse.co/stories/r82s7/embed" scrolling="no"></iframe>
        </div>
        <div className="jh-container center-content" >
            <iframe className="storehouse-src" src="//www.storehouse.co/stories/o4oov/embed" scrolling="no"></iframe>
        </div>
    </section>
}

function defaultDOM() {
    return <section className="section">
        Type something!
    </section>
}
function fuzzyKey(inpString, keys) {
    let smallestDistance = Number.MAX_SAFE_INTEGER;
    let smallestKey = '';
    keys.forEach(key => {
        const distanceObj = new Levenshtein(inpString.toLowerCase(), key.toLowerCase());
        const distance = distanceObj.distance;

        if (distance < smallestDistance) {
            smallestDistance = distance;
            smallestKey = key;
        }
    });

    if (smallestDistance < 5) {
        return smallestKey;
    }
    return null;
}

class Articles {
    constructor() {
        this.articles = {
            'Education': educationDOM,
            'Contact': contactDOM,
            'Photography': photographyDOM
        }
    }

    fuzzyGetDOMfunc(testString) {
        const key = fuzzyKey(testString, this.getAllKeys());
        if (!key) {
            return defaultDOM;
        }

        return this.articles[key];
    }

    getAllKeys() {
        return Object.keys(this.articles);
    }
}

export default Articles;
