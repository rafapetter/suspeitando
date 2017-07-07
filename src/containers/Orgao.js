import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Panel, FormGroup, ControlLabel, FormControl, Table, Breadcrumb} from 'react-bootstrap';
import './Orgao.css';
import { invokeApig } from '../libs/awsLib';

class Orgao extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            orgao: {},
        };
    }
    async componentDidMount() {
        this.setState({ isLoading: true });
        try {
            const result = await this.getRecord();
            this.setState({ orgao: result });

            if (this.state.orgao.orgao_id){
                var query = {
                    LastEvaluatedKey: null,
                    orgao_id: this.state.orgao.orgao_id
                }
                const results = await this.getRelatedRecords(query);
                var LastEvaluatedKey = results.LastEvaluatedKey;
                var resultx = results.Items;
                while(LastEvaluatedKey){
                    query.LastEvaluatedKey = LastEvaluatedKey;
                    const results2 = await this.getRelatedRecords(query);
                    LastEvaluatedKey = results2.LastEvaluatedKey;
                    resultx = resultx.concat(results2.Items)
                }
                this.setState({ lics: resultx });
            }
        }
        catch(e) {
            console.log(e);
        }
        this.setState({ isLoading: false });
    }
    getRecord() {
        return invokeApig({ path: '/orgaos/' + this.props.match.params.id }, null);
    }
    getRelatedRecords(query) {
        return invokeApig({
            path: '/contratos',
            method: 'POST',
            body: query,
        }, null);
    }
    handleNavLink = (event) => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute('href'));
    }
    async componentWillReceiveProps(nextProps){

    }
    formatReal(n){
        return n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, "$1.");
    }
    render() {
        const breadcrumb = (
            <div className="">
                <Breadcrumb >
                    <Breadcrumb.Item onClick={this.handleNavLink} href={'/orgaos/'}>
                        Orgãos
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        {(this.state.orgao.nome ? this.state.orgao.nome : '')}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
        );
        return (
        <div className="Orgao">
            <Panel header={breadcrumb}>
                {this.state.orgao && (
                    <div>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Nome</ControlLabel>
                        <FormControl.Static>
                            {this.state.orgao.nome}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Número de Licitações</ControlLabel>
                        <FormControl.Static>
                            {this.state.orgao.lics}
                        </FormControl.Static>
                    </FormGroup>
                    </div>
                )}
            </Panel>
            <Panel className="Resultados" header={'Licitações Relacionadas: ' + (this.isLoading ?  'Consultando...' :  (this.state.lics ? this.state.lics.length : ''))}>
                {this.state.lics && (
                <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Orgão</th>
                            <th>Objeto</th>
                            <th>Validade (dias)</th>
                            <th>Valor Total (R$)</th>
                            <th>Suspeito (R$)</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.lics.map((lic, i) => (
                        <tr key={i} onClick={this.handleNavLink} href={'/licitacoes/'+lic.contrato_id} style={lic.id_suspeito ? {background: '#fdbdbd'} : null}>
                            <td>{lic.contrato_id}</td>
                            <td>{lic.orgao}</td>
                            <td className="LimitText">{lic.objeto}</td>
                            <td>{lic.validade ? lic.validade.toFixed(0) : null}</td>
                            <td>{lic.valor ? this.formatReal(lic.valor) : null}</td>
                            <td>
                                {lic.id_suspeito ? this.formatReal(lic.valor_suspeito) : null}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                )}
            </Panel>
        </div>
        );
    }
}
export default withRouter(Orgao);
