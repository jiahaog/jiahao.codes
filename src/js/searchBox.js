import React from 'react';
import articles from './articles';

const searchOptionKeys = Object.keys(articles);

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };

        this.searchOptionKeys = searchOptionKeys
    }

    handleChange = event => {
        this.setState({
            text: event.target.value
        });
    };

    maybeDropdown = () => {
        if (!this.state.text) {
            return;
        }

        const getOptions = () => {
            return this.searchOptionKeys.map(option => {
                return <option key={option} value={option}/>
            });
        };

        return <datalist id="languages">
            {getOptions()}
        </datalist>
    };

    render() {
        return <div>
            <div className="container">
                <p className="control">
                    <input className="input" type="text"
                           placeholder="Enter Text"
                           onChange={this.handleChange}
                           list="languages"/>
                    {this.maybeDropdown()}
                </p>
            </div>

            <ContentDetails hello={this.state.text}/>
        </div>
    }
}

class ContentDetails extends React.Component {
    showContent = () => {
        const getDom = articles[this.props.hello];
        if (!getDom) {
            return 'Unknown';
        }
        return getDom();
    };

    render() {
        return <div>
            {this.showContent()}
        </div>
    }
}

export default SearchBox;
