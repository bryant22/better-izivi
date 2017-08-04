import Inferno from 'inferno';
import { Link } from 'inferno-router';
import Component from 'inferno-component';
import axios from 'axios';
import ApiService from '../../utils/api';
import { connect } from 'inferno-mobx';
import Card from '../tags/card';
import LoadingView from '../tags/loading-view';
import Header from '../tags/header';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
    };
  }

  register() {
    this.setState({ loading: true, error: null });
    axios
      .post(ApiService.BASE_URL + 'auth/register', this.state.formData)
      .then(response => {
        localStorage.setItem('jwtToken', response.data.data.token);
        this.context.router.push('/');
      })
      .catch(error => {
        var errorMsg = [];
        if (error.response != null && error.response.data != null) {
          for (let item in error.response.data) {
            errorMsg.push(
              <p>
                {item}: {error.response.data[item]}
              </p>
            );
          }
        }
        var errorBox = [];
        errorBox.push(
          <div class="alert alert-danger">
            <strong>Registration fehlgeschlagen</strong>
            <br />
            {errorMsg}
          </div>
        );
        this.setState({ errorBox: errorBox, loading: false });
      });
  }

  handleChange(e) {
    this.state.formData[e.target.name] = e.target.value;
    this.setState({ formData: this.state.formData });
  }

  render() {
    return (
      <Header>
        <div className="page page__register">
          <Card>
            <h1>Registrieren</h1>
            <div class="container">
              {this.state.errorBox}
              <form
                id="registerForm"
                action="javascript:;"
                onSubmit={() => this.register()}
                class="form-horizontal"
                data-toggle="validator"
              >
                <hr />
                <h3>Persönliche Informationen</h3>
                <br />

                <div class="form-group">
                  <label class="control-label col-sm-3" for="zdp">
                    ZDP:
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="number"
                      class="form-control"
                      name="zdp"
                      id="zdp"
                      value={this.state.formData.zdp}
                      onChange={this.handleChange.bind(this)}
                      min="10000"
                      max="100000"
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-3" for="firstname">
                    Vorname:
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      name="firstname"
                      id="firstname"
                      value={this.state.formData.firstname}
                      onChange={this.handleChange.bind(this)}
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-3" for="lastname">
                    Nachname:
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      name="lastname"
                      id="lastname"
                      value={this.state.formData.lastname}
                      onChange={this.handleChange.bind(this)}
                      required
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-sm-3" for="email">
                    E-Mail:
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      id="email"
                      value={this.state.formData.email}
                      onChange={this.handleChange.bind(this)}
                      required
                    />
                  </div>
                </div>

                <div class="form-group has-feedback">
                  <label class="control-label col-sm-3" for="password">
                    Passwort:
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={this.state.formData.password}
                      onChange={this.handleChange.bind(this)}
                      className="form-control"
                      data-minlength="7"
                      placeholder=""
                      required
                    />
                  </div>
                  <div class="col-sm-3" />
                  <div class="help-block col-sm-9">Mindestens 7 Zeichen</div>
                </div>

                <div class="form-group has-feedback">
                  <label class="control-label col-sm-3" for="password_confirm">
                    Passwort Bestätigung:
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="password"
                      id="password_confirm"
                      name="password_confirm"
                      value={this.state.formData.passwordConfirm}
                      onChange={this.handleChange.bind(this)}
                      className="form-control"
                      data-match="#password"
                      data-match-error="Die beiden Eingaben stimmen nicht überein"
                      placeholder=""
                      required
                    />
                  </div>
                  <div class="col-sm-3" />
                  <div class="help-block with-errors col-sm-9" />
                </div>
                <hr />

                <button type="submit" class="btn btn-primary">
                  Registrieren
                </button>
              </form>
            </div>
          </Card>

          <LoadingView loading={this.state.loading} error={this.state.error} />
        </div>
      </Header>
    );
  }

  //initialize validation after render
  componentDidUpdate() {
    $('#registerForm').validator();
  }
}
