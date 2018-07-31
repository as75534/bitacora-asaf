import React, { PureComponent, Fragment } from "react";
import { Row, Col, Button, Input, FormGroup, Label, Form } from "reactstrap";
import firebase from "firebase/app";
import "firebase/database";

export class CreatePost extends PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            title: "",
            body: "",
        }
    }
    
    post = () => {
        if (this.state.title && this.state.body) {
            const dbRefPosts = this.props.postsRef; 
            console.log(dbRefPosts);
            const post = { 
                title: this.state.title,
                body: this.state.body,
            };

            dbRefPosts.push(post);
            dbRefPosts.on('value', snap => console.log(snap.val()));

            return this.props.history.push("/");
        }
    }

    render() {
        return (
            <Fragment>
                <Row>
                    <Col>
                        <h1>Crear publicación</h1>
                        <Form>
                            <FormGroup>
                                <Label for="title_input">Título</Label>
                                <Input 
                                    id="title_input" 
                                    type="text"
                                    value={this.state.title}
                                    onChange={e => this.setState({ title: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="body_textarea">Cuerpo</Label>
                                <Input 
                                    type="textarea" 
                                    style={{ height: "10em" }}
                                    value={this.state.body}
                                    onChange={e => this.setState({ body: e.target.value })}/>
                            </FormGroup>

                            <Button color="primary" onClick={this.post}>Post</Button>
                        </Form>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}
