import React, {Component} from 'react';

class MapController extends Component {
  state = {};
  render() {
    return (
      <div className="map-controller">
        <header>
          <h2>Google Offices in USA</h2>
          <form onChange={e => this.props.onStateFilter(e.target.value)}>
            <label htmlFor="select-state">Choose state:</label>
            <select name="State" id="select-state">
              <option value="All">All</option>
              <option value="Washington">Washington</option>
              <option value="Oregon">Oregon</option>
              <option value="California">California</option>
              <option value="Colorado">Colorado</option>
            </select>
          </form>
        </header>
      </div>
    );
  }
}

export default MapController;
