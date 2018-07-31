import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Card, CardColumns, CardTitle, CardText } from "reactstrap";

export class Publications extends PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            publications: []
        };

    }

    observePublications = () => {
        this.props.postsRef.on('value', snap => {
            console.log(snap.val());
            const publications = snap.val();
            const posts = [];
            for(const p in publications) {
                posts.push(publications[p]);
                console.log(publications[p]);
            }

            this.setState({ publications: posts });
        });
    }

    
    componentWillMount() {
        this.observePublications();
    }

    generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color; 
    }
    
    render() {
        return (
            <Fragment>
                <h1>Publicaciones</h1>
                <hr/>
                <CardColumns>
                {
                    this.state.publications ? this.state.publications.map((p, index) => {
                        console.log(p);
                        return (
                                <Card key={index} body style={{ backgroundColor: "white", color:"black", border: `1px solid ${this.generateRandomColor()}`}}>
                                    <CardTitle>{p.title}</CardTitle>
                                    <CardText>{p.body}</CardText>
                                </Card>
                        )
                    }) : null
                }
                </CardColumns>
            </Fragment>
        );
    }
}