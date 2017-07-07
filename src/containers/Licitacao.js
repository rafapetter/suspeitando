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
        if (a.similar < b.similar)
            return -1;
        if (a.similar > b.similar)
            return 1;
        return 0;
    }
    async componentDidMount() {
        this.setState({ isLoading: true });
        try {
            const result = await this.getRecord();
            if (result.sims){
                for (var i in result.sims){
                    for (var j in result.similar){
                        if (String(result.similar[j].id) === String(result.sims[i].contrato_id)){
                            result.sims[i].similar = result.similar[j].similar;
                            result.sims[i].taxa_corrigida = result.similar[j].taxa_corrigida;
                            result.sims[i].valor_dia = result.similar[j].valor_dia;
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
        return invokeApig({ path: '/contratos/' + this.props.match.params.id }, null);
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
    GetFormattedDate(dtx) {
        var month = this.str_pad(dtx.getMonth() + 1);
        var day = this.str_pad(dtx.getDate());
        var year = this.str_pad(dtx.getFullYear());
        return day + "/" + month + "/" + year;
    }
    str_pad(n) {
        return String("00" + n).slice(-2);
    }
    render() {
        const breadcrumb = (
            <div className="">
                <Breadcrumb >
                    <Breadcrumb.Item onClick={this.handleNavLink} href={'/licitacoes/'}>
                        Licitações
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        {'Número Contrato: ' + (this.state.lic.numero_contrato ? this.state.lic.numero_contrato : '')}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
        );
        return (
        <div className="Licitacao">
            <Panel header={breadcrumb}>
                {this.state.lic && (
                    <div>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Orgão</ControlLabel>
                        <FormControl.Static>
                            <a onClick={this.handleNavLink} href={'/orgaos/'+this.state.lic.orgao_id}>
                                {this.state.lic.orgao}
                            </a>
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Modalidade</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.modalidade}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-12">
                        <ControlLabel>Fornecedor</ControlLabel>
                        <FormControl.Static>
                            <a onClick={this.handleNavLink} href={'/fornecedores/'+this.state.lic.fornecedor_doc}>
                                {this.state.lic.fornecedor}
                            </a>
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Fornecedor Documento</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.fornecedor_tipo} - {this.state.lic.fornecedor_doc}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Evento</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.evento}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-12">
                        <ControlLabel>Objeto</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.objeto}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Data Publicação</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.data_publicacao}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Data Assinatura</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.data_assinatura_s}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Validade (dias)</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.validade}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Valor (R$)</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.valor}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Número do Processo</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.numero_processo}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Número da Licitação</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.numero_licitacao}
                        </FormControl.Static>
                    </FormGroup>
                    <FormGroup className="col-sm-6">
                        <ControlLabel>Retranca</ControlLabel>
                        <FormControl.Static>
                            {this.state.lic.retranca}
                        </FormControl.Static>
                    </FormGroup>
                    {this.state.lic.id_suspeito && (
                        <FormGroup className="col-sm-6" style={{background: '#fdbdbd'}}>
                            <ControlLabel>Suspeito - Valor Adicional (R$)</ControlLabel>
                            <FormControl.Static>
                                {this.formatReal(this.state.lic.valor_suspeito)}
                            </FormControl.Static>
                        </FormGroup>
                    )}
                    </div>
                )}
            </Panel>
            {this.state.lic.sims && (
            <Panel className="Resultados" header={'Contratos Similares: ' + this.state.lic.sims.length}>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Objeto</th>
                            <th>Validade (dias)</th>
                            <th>Valor Total (R$)</th>
                            <th>Valor por Dia (R$)</th>
                            <th>Similaridade</th>
                            <th>Variação de Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.lic.sims.map((sim, i) => (
                        <tr key={i} onClick={this.handleNavLink} href={'/licitacoes/'+sim.contrato_id} style={this.state.lic.id_suspeito === sim.contrato_id ? {background: '#fdbdbd'} : null}>
                            <td>{sim.contrato_id}</td>
                            <td className="LimitText">{sim.objeto}</td>
                            <td>{sim.validade_dias ? sim.validade_dias.toFixed(0) : null}</td>
                            <td>{sim.valor_f ? this.formatReal(sim.valor_f) : null}</td>
                            <td>{sim.valor_dia ? this.formatReal(sim.valor_dia) : null}</td>
                            <td>{(parseFloat(sim.similar) * 100).toFixed(0)}%</td>
                            <td>{sim.taxa_corrigida > 0 ? (sim.taxa_corrigida * 100).toFixed(0) + '%' : null}</td>
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
