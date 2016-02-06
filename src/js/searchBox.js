import React from 'react';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = event => {
        this.setState({
            text: event.target.value
        });
    };

    render() {
        return <div>
            <p className="control">
                <input className="input" type="text" placeholder="Text input" onChange={this.handleChange}/>
            </p>
        </div>
    }
}

export default SearchBox;
