import React from 'react';

function educationDom() {
    return <section className="section">
        <div className="container">
            <h1 className="title">Education</h1>
            <h2 className="subtitle">
                Singapore University of Technology and Design
            </h2>
        </div>
    </section>
}

function contactDom() {
    return <section className="section">
        <div className="container">
            <h1 className="title">Contact</h1>
            <h2 className="subtitle">
                jiahao@example.com
            </h2>
        </div>
    </section>
}

export default {
    'Education': educationDom,
    'Contact': contactDom
}
