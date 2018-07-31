import React, { Fragment, PureComponent } from 'react'
import { Button, Col, Form, FormGroup, Input, Row } from "reactstrap";
import firebase from "firebase/app";
import "firebase/auth";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

export class Register extends PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            email: "",
            password: "",
            repeatedPassword: "",
            formIsValid: false
        }

        this.register_button = React.createRef();
        this.styleEmailInput.bind(this);
        this.stylePasswordInput.bind(this);
        this.styleRepeatedPasswordInput.bind(this);
    }

    register = () => {
        const { email, password, repeatedPassword } = this.state;

        if(this.repeatedPasswordIsValid() && this.passwordIsValid() && this.emailIsValid()) {
            firebase.auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        console.log("[Register.register()]: hello");
                        const MySwal = withReactContent(Swal)

                        const hello = MySwal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        });
                        
                        hello({
                            type: "success",
                            title:"Haz iniciado sesión"
                        })

                        return this.props.history.push("/");
                    })
                    .catch(error => {
                        const errorCode = error.code;
                        const errorMessage = error.message;

                        console.log(errorCode, errorMessage);
                    });
        } else {
            const MySwal = withReactContent(Swal)

            MySwal.fire({
                type: 'error',
                title: 'Datos incorrectos',
                text: 'Vuelve al formulario, y escribe los datos correctamente',
            });
        }
    }

    emailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    passwordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    repeatedPasswordChange = (e) => {
        this.setState({ repeatedPassword: e.target.value })
    }

    emailIsValid = () => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValid = re.test(this.state.email);
        return isValid;
    }

    passwordIsValid = () => {
        if (this.state.password.length < 8) {
            return false;
        } else {
            return true;
        }
    }

    repeatedPasswordIsValid = () => {
        let lenghtIsAcceptable = false;
        let isEqualsToPassword = false;

        if (this.state.repeatedPassword.length < 8 ) {
            lenghtIsAcceptable = false;
        } else {
            lenghtIsAcceptable = true;
        }

        if (this.state.repeatedPassword === this.state.password) {
            isEqualsToPassword = true;
        } else {
            isEqualsToPassword = false;
        }
        
        return lenghtIsAcceptable && isEqualsToPassword;
    }

    styleEmailInput = () => {
        /* Email validation */
        let email_className = "";
        let email_style = {};

        let emailErrorMessage = null;

        if (this.state.email.length > 0) {
            if (this.emailIsValid()) {
                email_className = "is-valid";
                email_style = { color: "green" };
                emailErrorMessage = null;
            } else { 
                email_className = "is-invalid";
                email_style = { color: "red" }
                emailErrorMessage = (
                    <div style={{textAlign: "left", fontSize: "15px", color:"red", paddingLeft: "5px" }}>
                        El correo debe tener una estructura como esta: <i><u>correo@email.com</u></i>
                    </div>
                )
            }
        }

        const email_input = (
            <Fragment>
                <Input 
                    ref={this.styleEmailInput}
                    type="email" 
                    placeholder="correo@email.com"
                    value={this.state.email}
                    onChange={this.emailChange}
                    className={email_className}
                    style={email_style} />
                
                    {emailErrorMessage}
            </Fragment>
        );

        return email_input;
    }

    stylePasswordInput = () => {
        let message_div = null;
        let passwordStyle = {};
        let passwordClassName = "";

        if (this.state.password.length > 0) {
            if (this.passwordIsValid()) {
                passwordStyle = {color:"green"};
                passwordClassName = "is-valid";
                message_div = null;
            } else {
                passwordStyle = {color:"red"};
                passwordClassName= "is-invalid";
                message_div = (
                    <div style={{textAlign: "left", fontSize: "15px", color:"red", paddingLeft: "5px" }}>
                        La contraseña debe tener al menos 8 caracteres.
                    </div>
                )
            }
        }

        const password_input = (
            <Fragment>
                <Input 
                    type="password" 
                    placeholder="••••••••"
                    value={this.state.password}
                    className={passwordClassName}
                    style={passwordStyle}
                    onChange={this.passwordChange} />

                { message_div }
            </Fragment>
        );

        console.log(password_input);
        return password_input;
    }
    
    styleRepeatedPasswordInput = () => {
        let message_div = null;
        let passwordStyle = {};
        let passwordClassName = "";

        if (this.state.repeatedPassword.length > 0) {
            if (this.repeatedPasswordIsValid()) {
                passwordStyle = {color:"green"};
                passwordClassName = "is-valid";
                message_div = null;
            } else {
                passwordStyle = {color:"red"};
                passwordClassName= "is-invalid";
                message_div = (
                    <div style={{textAlign: "left", fontSize: "15px", color:"red", paddingLeft: "5px", marginTop:"5px"}}>
                        {this.state.repeatedPassword.length < 8 ? <Fragment>- La contraseña debe tener al menos 8 caracteres.<br/></Fragment> : null}
                        {this.state.repeatedPassword !== this.state.password ? "- Las contraseñas no coinciden" : null}
                    </div>
                )
            }
        }

        const repeatedPassword_input = (
            <Fragment>
                <Input 
                    type="password" 
                    placeholder="••••••••"
                    value={this.state.repeatedPassword}
                    className={passwordClassName}
                    style={passwordStyle}
                    onChange={this.repeatedPasswordChange} />

                { message_div }
            </Fragment>
        );

        console.log(repeatedPassword_input);

        return repeatedPassword_input;
    }

    render() {
        const EmailInput = this.styleEmailInput();
        const PasswordInput = this.stylePasswordInput();
        const RepeatedPasswordInput = this.styleRepeatedPasswordInput();

        return (
            <Fragment>
                <Row className="justify-content-center">
                    <Col xs="7" md="6" xl="5" style={{ textAlign: "center" }}>
                        <h1>Registrarme</h1>
                        <p>Somos la bitácora más conocida del país</p>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col xs="7" md="6" xl="5" style={{ textAlign: "center" }}>
                        <Form>
                            <FormGroup>
                                { EmailInput }
                            </FormGroup>

                            <FormGroup>
                                { PasswordInput }
                            </FormGroup>

                            <FormGroup>
                                { RepeatedPasswordInput }
                            </FormGroup>

                            <Button 
                                ref={this.register_button}
                                color="primary" 
                                block={true}
                                onClick={this.register}>
                                Register
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}
