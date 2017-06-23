import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Panel, FormGroup, ControlLabel, FormControl, Table, Breadcrumb} from 'react-bootstrap';
import './Licitacao.css';
import { invokeApig } from '../libs/awsLib';

class Licitacao extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            lic: {},
        };
    }
    compare(b,a) {
        if (a.sim < b.sim)
            return -1;
        if (a.sim > b.sim)
            return 1;
        return 0;
    }
    async componentDidMount() {
        this.setState({ isLoading: true });
        try {
            const result = await this.getRecord();
            if (result.sims){
                for (var i in result.sims){
                    for (var j in result.sim){
                        if (String(result.sim[j].id) === String(result.sims[i].contract_id)){
                            result.sims[i].sim = result.sim[j].sim;
                        }
                    }
                }
                result.sims.sort(this.compare);
            }
            this.setState({ lic: result });
        }
        catch(e) {
            console.log(e);
        }
        this.setState({ isLoading: false });
    }
    getRecord() {
        return invokeApig({ path: '/contracts/' + this.props.match.params.id }, null);
    }
    handleNavLink = (event) => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute('href'));
    }
    async componentWillReceiveProps(nextProps){

    }
    render() {
        const breadcrumb = (
            <div className="">
                <Breadcrumb >
                    <Breadcrumb.Item onClick={this.handleNavLink} href={'/licitacoes/'}>
                        Licitações
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        {'Número Contrato: ' + (this.state.lic.NúmeroContrato ? this.state.lic.NúmeroContrato : '')}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
        );
        return (
        <div className="lic">
            <Panel header={breadcrumb}>
                {this.state.lic && (
                    <div>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Orgão</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.Orgao}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Modalidade</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.Modalidade}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-12">
                        <ControlLabel>Fornecedor</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.Fornecedor}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Fornecedor Documento</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.FornecedorTipo} - {this.state.lic.FornecedorDocumento}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Número Licitação</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.Número_Licitação}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-12">
                        <ControlLabel>Objeto</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.objeto}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Data Publicação Extrato</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.DataPublicaçãoExtrato}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Data Assinatura Extrato</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.DataAssinaturaExtrato}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Validade Extrato</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.ValidadeExtrato ? this.state.lic.ValidadeExtrato.replace('.0','') : null} {this.state.lic.TipoValidadeExtrato}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Valor Contrato</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.ValorContrato}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Retranca</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.Retranca}
                        </FormControl.Static>
                    </FormGroup>
                    </div>
                )}
            </Panel>
            {this.state.lic.sims && (
            <Panel header={'Contratos Relacionados: ' + this.state.lic.sims.length}>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Orgão</th>
                            <th>Fornecedor</th>
                            <th>Objeto</th>
                            <th>Data Assinatura</th>
                            <th>Validade</th>
                            <th>Valor (R$)</th>
                            <th>Similaridade</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.lic.sims.map((sim, i) => (
                        <tr key={i} onClick={this.handleNavLink} href={'/licitacoes/'+sim.contract_id}>
                            <td>{sim.contract_id}</td>
                            <td>{sim.Orgao}</td>
                            <td>{sim.Fornecedor}</td>
                            <td>{sim.objeto}</td>
                            <td>{sim.DataAssinaturaExtrato}</td>
                            <td>{sim.ValidadeExtrato ? sim.ValidadeExtrato.replace('.0','') : null} {sim.TipoValidadeExtrato}</td>
                            <td>{sim.ValorContrato}</td>
                            <td>{(parseFloat(sim.sim) * 100).toFixed(2)}%</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Panel>
            )}
        </div>
        );
    }
}
export default withRouter(Licitacao);
