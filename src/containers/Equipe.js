import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Panel } from 'react-bootstrap';
import './Equipe.css'

class Equipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,

        };
    }
    async componentDidMount(){
        this.setState({ isLoading: true, orgaos: null });
        try {

        }
        catch(e) {
            console.log(e);
        }
        this.setState({ isLoading: false });
    }
    handleNavLink = (event) => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute('href'));
    }
    render() {
        return (
        <div className="Equipe">
            <div className="Card col-sm-4">
                <Panel className="Resultados">
                    <div className="Avatar col-sm-4 col-xs-5">
                        <img src="https://avatars3.githubusercontent.com/u/3884633?v=3" alt=""/>
                    </div>
                    <div className="Name col-sm-8 col-xs-7">
                        <b>Kevin Dantas</b><br/>
                        kevinds29@gmail.com
                    </div>
                </Panel>
            </div>
            <div className="Card col-sm-4">
                <Panel className="Resultados">
                    <div className="Avatar col-sm-4 col-xs-5">
                        <img src="https://scontent.fcgh7-1.fna.fbcdn.net/v/t1.0-1/p160x160/12919732_1009444805799835_1853261711445209555_n.jpg?oh=1823ab57d627c729c0d9f54c514410e7&oe=5A03CA4E" alt=""/>
                    </div>
                    <div className="Name col-sm-8 col-xs-7">
                        <b>Patrick Ens</b><br/>
                        patrickhacens@gmail.com
                    </div>
                </Panel>
            </div>
            <div className="Card col-sm-4">
                <Panel className="Resultados">
                    <div className="Avatar col-sm-4 col-xs-5">
                        <img src="https://avatars3.githubusercontent.com/u/17286508?v=3" alt=""/>
                    </div>
                    <div className="Name col-sm-8 col-xs-7">
                        <b>Pedro Lelis</b><br/>
                        pedrolelis21@gmail.com
                    </div>
                </Panel>
            </div>
            <div className="Card col-sm-4">
                <Panel className="Resultados">
                    <div className="Avatar col-sm-4 col-xs-5">
                        <img src="https://avatars2.githubusercontent.com/u/10067015?v=" alt=""/>
                    </div>
                    <div className="Name col-sm-8 col-xs-7">
                        <b>Rafael Pettersen</b><br/>
                        petter100@gmail.com
                    </div>
                </Panel>
            </div>
            <div className="Card col-sm-4">
                <Panel className="Resultados">
                    <div className="Avatar col-sm-4 col-xs-5">
                        <img src="https://scontent.fcgh7-1.fna.fbcdn.net/v/t1.0-1/p160x160/16711628_1939575749401299_4270391138512945013_n.jpg?oh=af57fdb0dcff78978b2977156316dfee&oe=59C32390" alt=""/>
                    </div>
                    <div className="Name col-sm-8 col-xs-7">
                        <b>Wendel Nascimento</b><br/>
                        <span style={{fontSize:'12px'}}> wendel.nascimento2@outlook.com</span>
                    </div>
                </Panel>
            </div>
        </div>
        );
    }
}
export default withRouter(Equipe);
