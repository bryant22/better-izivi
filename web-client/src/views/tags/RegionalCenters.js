import Inferno from 'inferno';
import VNodeFlags from 'inferno-vnode-flags';
import { Link } from 'inferno-router';
import Component from 'inferno-component';
import axios from 'axios';
import ApiService from '../../utils/api';
import { connect } from 'inferno-mobx';

export default class RegionalCenters extends Component {
  renderRegionalCenters(state) {
    var options = [];
    options.push(<option value="" />);

    for (let i = 0; i < state.regianlCenters.length; i++) {
      let isSelected = false;
      if (parseInt(state.result['regional_center']) == i + 1) {
        isSelected = true;
      }

      options.push(
        <option value={state.regianlCenters[i].id} selected={isSelected}>
          {state.regianlCenters[i].name}
        </option>
      );
    }

    return options;
  }

  getRegionalCenters(self) {
    axios
      .get(ApiService.BASE_URL + 'regionalcenter', { headers: { Authorization: 'Bearer ' + localStorage.getItem('jwtToken') } })
      .then(response => {
        self.setState({
          regianlCenters: response.data,
        });
      })
      .catch(error => {
        self.setState({ error: error });
      });
  }
}