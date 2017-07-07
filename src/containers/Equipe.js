import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Panel } from 'react-bootstrap';
import './Equipe.css'
import GitLogo from '../assets/img/GitHub-Mark-64px.png';
import LinkedinLogo from '../assets/img/In-2C-48px-R.png';

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
            <Panel>
                <div className="col-sm-12">
                    <p>
                        A iniciativa deste projeto surgiu durante a competição <b> Hack in Sampa </b>
                        realizada em junho de 2017, e que tinha como objetivo estimular
                        a criação de soluções de combate a corrupção.
                    </p>
                </div>
            </Panel>
            <div className="Card col-sm-4">
                <Panel className="Resultados">
                    <div className="Avatar col-sm-4 col-xs-5">
                        <img src="https://avatars3.githubusercontent.com/u/3884633?v=3" alt=""/>
                    </div>
                    <div className="Name col-sm-8 col-xs-7">
                        <b>Kevin Dantas</b>
                        <div style={{paddingTop:'7px'}}>
                            <a href="https://github.com/kevindantas" rel="noopener noreferrer" target="_blank">
                                <img src={GitLogo} alt="GitLogo" style={{height:"20px"}}/>
                            </a>
                            <a href="https://br.linkedin.com/in/kevindantas" rel="noopener noreferrer" target="_blank" style={{marginLeft: '15px'}}>
                                <img src={LinkedinLogo} alt="LinkedinLogo" style={{height:"20px"}}/>
                            </a>
                        </div>
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
                        <div style={{paddingTop:'7px'}}>
                            <a href="" rel="noopener noreferrer" target="_blank">
                                <img src={GitLogo} alt="GitLogo" style={{height:"20px"}}/>
                            </a>
                            <a href="https://br.linkedin.com/in/patrickens" rel="noopener noreferrer" target="_blank" style={{marginLeft: '15px'}}>
                                <img src={LinkedinLogo} alt="LinkedinLogo" style={{height:"20px"}}/>
                            </a>
                        </div>
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
                        <div style={{paddingTop:'7px'}}>
                            <a href="https://github.com/PedroLelis" rel="noopener noreferrer" target="_blank">
                                <img src={GitLogo} alt="GitLogo" style={{height:"20px"}}/>
                            </a>
                            <a href="https://br.linkedin.com/in/pedrolelis" rel="noopener noreferrer" target="_blank" style={{marginLeft: '15px'}}>
                                <img src={LinkedinLogo} alt="LinkedinLogo" style={{height:"20px"}}/>
                            </a>
                        </div>
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
                        <div style={{paddingTop:'7px'}}>
                            <a href="https://github.com/rafapetter" rel="noopener noreferrer" target="_blank">
                                <img src={GitLogo} alt="GitLogo" style={{height:"20px"}}/>
                            </a>
                            <a href="https://br.linkedin.com/in/rafaelpettersen" rel="noopener noreferrer" target="_blank" style={{marginLeft: '15px'}}>
                                <img src={LinkedinLogo} alt="LinkedinLogo" style={{height:"20px"}}/>
                            </a>
                        </div>
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
                        <div style={{paddingTop:'7px'}}>
                            <a href="https://github.com/wendelnascimento" rel="noopener noreferrer" target="_blank">
                                <img src={GitLogo} alt="GitLogo" style={{height:"20px"}}/>
                            </a>
                            <a href="https://br.linkedin.com/in/wendel-nascimento-b2979291" rel="noopener noreferrer" target="_blank" style={{marginLeft: '15px'}}>
                                <img src={LinkedinLogo} alt="LinkedinLogo" style={{height:"20px"}}/>
                            </a>
                        </div>
                    </div>
                </Panel>
            </div>
        </div>
        );
    }
}
export default withRouter(Equipe);
