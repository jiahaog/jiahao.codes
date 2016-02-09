import React from 'react';
import ReactDOM from 'react-dom';
import Articles from './articles/articlesMain';
const articles = new Articles();

// workaround until waypoints can be Browserified
require('waypoints/lib/noframework.waypoints.js');

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    handleChange = event => {
        this.setState({
            text: event.target.value
        });
    };

    buttonOnClick = value => {
        this.setState({
            text: value
        });
    };

    maybeDropdown = () => {
        if (!this.state.text) {
            return;
        }

        const getOptions = () => {
            return articles.getAllKeys().map(option => {
                return <option key={option} value={option}/>
            });
        };

        return <datalist id="languages">
            {getOptions()}
        </datalist>
    };

    componentDidMount = () => {
        ReactDOM.findDOMNode(this.refs.searchBoxInput).focus();
    };

    render() {
        return <div>
            <div className="section">
                <h2 className="subtitle">
                    Discover things about me!
                </h2>
                <div className="container">
                    <p className="control">
                        <input className="search-box-input input" type="text"
                               onChange={this.handleChange}
                               list="languages"
                               ref="searchBoxInput"
                               value={this.state.text}
                               autofocus/>
                        {this.maybeDropdown()}
                    </p>
                </div>
                <div className="text-preset-button-group">
                    <span className="tag is-primary" onClick={this.buttonOnClick.bind(this, 'Education')}>Education</span>
                    <span className="tag is-primary" onClick={this.buttonOnClick.bind(this, 'Contact')}>Contact</span>
                <span className="tag is-primary"
                      onClick={this.buttonOnClick.bind(this, 'Photography')}>Photography</span>
                </div>
            </div>
            <ContentDetails rawText={this.state.text}/>
        </div>
    }
}

class ContentDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAll: false
        }
    }

    componentDidMount = () => {
        new Waypoint({
            element: document.getElementById('whitespace-placeholder'),
            handler: (direction) => {
                if (direction === 'down') {
                    this.setState({
                        showAll: true
                    });
                }
            }
        });
    };

    showContent = () => {
        return articles.fuzzyGetDOMfunc(this.props.rawText)();
    };

    maybeShowAll = () => {
        if (this.state.showAll) {
            return <div>
                {articles.allDOM()}
            </div>
        }
    };

    render() {
        return <div>
            {this.showContent()}
            <div id="whitespace-placeholder" className="continue-scroll-placeholder is-centered">
                <i className="scroll-icon fa fa-angle-down"/>
            </div>
            {this.maybeShowAll()}
        </div>
    }
}

export default SearchBox;
