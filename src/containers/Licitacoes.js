import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Panel, Breadcrumb, FormGroup, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import './Licitacoes.css';
import { invokeApig } from '../libs/awsLib';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import _ from 'lodash'

class Licitacoes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            filtro: {
                periodo_assinatura: 2017.1,
                orgao: null,
                evento: null,
                suspeito: false,
            },
            tableOptions: {
                loading: true,
                showPagination: true,
                showPageSizeOptions: true,
                showPageJump: true,
                collapseOnSortingChange: true,
                collapseOnPageChange: true,
                collapseOnDataChange: true,
                freezeWhenExpanded: false,
                filterable: true,
                sortable: true,
                resizable: true
            },
            orgaos: ['ARICANDUVA/FORMOSA/CARRÃO', 'ASSISTÊNCIA E DESENVOLVIMENTO SOCIAL', 'ASSUNTOS DE TURISMO', 'AUTARQUIA HOSPITALAR MUNICIPAL', 'AUTORIDADE MUNICIPAL DE LIMPEZA URBANA', 'BUTANTÃ', 'CAMPO LIMPO', 'CAPELA DO SOCORRO', 'CIDADE ADEMAR', 'CIDADE TIRADENTES', 'COMPANHIA DE ENGENHARIA DE TRAFEGO', 'COMPANHIA METROPOLITANA DE HABITAÇÃO', 'COMPANHIA PAULISTANA DE SECURITIZAÇÃO', 'COMPANHIA SÃO PAULO DE DESENVOLVIMENTO E MOBILIZAÇÃO DE ATIVOS', 'CULTURA', 'CÂMARA MUNICIPAL', 'DESESTATIZAÇÃO E PARCERIAS', 'DIREITOS HUMANOS E CIDADANIA', 'EDUCAÇÃO', 'EMPRESA DE TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO', 'ERMELINO MATARAZZO', 'ESPORTES E LAZER', 'FAZENDA', 'FREGUESIA-BRASILÂNDIA', 'GABINETE DO PREFEITO', 'GESTÃO', 'GOVERNO MUNICIPAL', 'GUAIANASES', 'HABITAÇÃO', 'HOSPITAL DO SERVIDOR PÚBLICO MUNICIPAL', 'INOVAÇÃO E TECNOLOGIA', 'INSTITUTO DE PREVIDÊNCIA MUNICIPAL', 'IPIRANGA', 'ITAIM PAULISTA', 'ITAQUERA', 'JABAQUARA', 'JAÇANÃ-TREMEMBÉ', 'JUSTIÇA', 'LAPA', "M'BOI MIRIM", 'MOBILIDADE E TRANSPORTES', 'MOOCA', 'PARELHEIROS', 'PENHA', 'PERUS', 'PESSOA COM DEFICIÊNCIA', 'PINHEIROS', 'PIRITUBA/JARAGUÁ', 'PREFEITURAS REGIONAIS', 'RELAÇÕES INTERNACIONAIS', 'SANTANA/TUCURUVI', 'SANTO AMARO', 'SAPOPEMBA', 'SAÚDE', 'SEGURANÇA URBANA', 'SERVIÇO FUNERÁRIO', 'SERVIÇOS E OBRAS', 'SP NEGÓCIOS', 'SÃO MATEUS', 'SÃO MIGUEL', 'SÃO PAULO OBRAS', 'SÃO PAULO TRANSPORTE', 'SÃO PAULO TURISMO', 'SÃO PAULO URBANISMO', 'TRABALHO E EMPREENDEDORISMO', 'TRIBUNAL DE CONTAS', 'URBANISMO E LICENCIAMENTO', 'VERDE E MEIO AMBIENTE', 'VILA MARIA/VILA GUILHERME', 'VILA MARIANA', 'VILA PRUDENTE'],
            modalidades: ['ACORDO DE COOPERAÇÃO', 'CHAMADA PÚBLICA', 'COMPRA POR ATA DE REGISTRO DE PREÇO', 'CONCORRÊNCIA', 'CONTRATO DE GESTÃO', 'CONVITE', 'CONVÊNIO', 'DISPENSA', 'INEXIGIBILIDADE', 'LEILÃO', 'PREGÃO ELETRÔNICO', 'PREGÃO PRESENCIAL', 'TERMO DE COLABORAÇÃO', 'TOMADA DE PREÇOS'],
        };
    }
    async componentDidMount() {

    }
    async handleFiltrar(){
        this.setState({ isLoading: true, lics: null });
        try {
            var periodo_assinatura = parseFloat(this.state.filtro.periodo_assinatura);
            var periodo_assinatura_ano = parseInt(periodo_assinatura, 10);
            var periodo_assinatura_mes = (periodo_assinatura % 1).toFixed(1) * 30
            var periodo_assinatura_dia = 30;
            if (periodo_assinatura_mes === 3 || periodo_assinatura_mes === 12) periodo_assinatura_dia = 31
            var query = {
                LastEvaluatedKey: null,
                periodo_assinatura_inicio: (new Date(periodo_assinatura_ano, periodo_assinatura_mes - 3, 1)).getTime(),
                periodo_assinatura_fim: (new Date(periodo_assinatura_ano, periodo_assinatura_mes - 1, periodo_assinatura_dia)).getTime(),
                orgao: this.state.filtro.orgao,
                suspeito: this.state.filtro.suspeito,
                evento: this.state.filtro.evento
            }
            //console.log(periodo_assinatura_ano, periodo_assinatura_mes, periodo_assinatura_dia, query)
            //this.setState({ isLoading: false });
            //return;
            const results = await this.getRecords(query);
            var LastEvaluatedKey = results.LastEvaluatedKey;
            //console.log(LastEvaluatedKey, results.Items.length)
            var resultx = results.Items;
            while(LastEvaluatedKey){
                query.LastEvaluatedKey = LastEvaluatedKey;
                const results2 = await this.getRecords(query);
                LastEvaluatedKey = results2.LastEvaluatedKey;
                resultx = resultx.concat(results2.Items)
                //console.log(LastEvaluatedKey, results2.Items.length, resultx.length)
            }
            this.setState({ lics: resultx });
        }
        catch(e) {
            console.log(e);
        }
        this.setState({ isLoading: false });
    }
    getRecords(query) {
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
    handleRowClick = (rowInfo, event) => {
        event.preventDefault();
        this.props.history.push('/licitacoes/' + rowInfo.row.contrato_id);
    }
    formatDinheiro(n) {
        var aux = String(this.formatFloat(n)).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, "$1.")
        return aux;
    }
    formatFloat(n) {
        if (!n) return n;
        return parseFloat(n.replace(/\./g,'').replace(/,/g,'.')).toFixed(2)
    }
    handleChangeFiltro = (event) => {
        var filtro = this.state.filtro;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        var id = target.id ? target.id : target.name;
        filtro[id] = value;
        this.setState({
            filtro: filtro
        });
    }
    listOrgaos(){
        var options = [];
        options.push(<option value="" key={0}>{'----'}</option>);
        if (this.state.orgaos){
            for (var i = 0; i < this.state.orgaos.length; i++) {
                var orgao = this.state.orgaos[i];
                options.push(<option value={orgao} key={i+1}>{orgao}</option>);
            }
        }
        return options;
    }
    validateFiltro() {
        if (!this.state.filtro.periodo_assinatura) return false;
        return true;
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
    formatReal(n){
        return n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, "$1.");
    }
    render() {
        const breadcrumb = (
            <div className="">
                <Breadcrumb >
                    <Breadcrumb.Item onClick={this.handleNavLink} href={'/licitacoes/'}>
                        Licitações
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
        );
        const columns = [
            {
                Header: 'Id',
                id: 'contrato_id',
                accessor: d => d.contrato_id,
                maxWidth: 50,
                sortMethod: (a, b) => {
                    return a - b;
                }
            }, {
                Header: 'Orgão',
                id: 'orgao',
                accessor: d => d.orgao,
                filterMethod: (filter, row) => (row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase()))
            }, {
                Header: 'Fornecedor',
                id: 'fornecedor',
                accessor: d => d.fornecedor ? d.fornecedor.trim() : null,
                filterMethod: (filter, row) => (row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase()))
            }, {
                Header: 'Objeto',
                id: 'objeto',
                minWidth: 200,
                accessor: d => d.objeto ? d.objeto.trim() : null,
                filterMethod: (filter, row) => (row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase()))
            }, {
                Header: 'Data',
                id: 'data_assinatura',
                accessor: d => d.data_assinatura,
                sortMethod: (a, b) => {
                    return a - b;
                },
                Cell: row => (
                    <div>
                        {row.value ? this.GetFormattedDate(new Date(row.value)) : null}
                    </div>
                ),
                maxWidth: 70,
            }, {
                Header: 'Validade (dias)',
                id: 'validade',
                // accessor: d => (d.validade ? d.validade.replace('.0','') : null) + ' ' +  (d.validade_tipo),
                accessor: d => (d.validade ? d.validade.toFixed(0) : null),
                sortMethod: (a, b) => {
                    return a - b;
                },
                maxWidth: 110,
            }, {
                Header: 'Valor (R$)',
                id: 'valor',
                accessor: d => d.valor ? d.valor : null,
                Cell: row => (<b>{row.value > 0 ? this.formatReal(row.value) : null}</b>),
                sortMethod: (a, b) => {
                    return a - b;
                },
                minWidth: 100,
                Footer: <span><strong>Total:</strong> {this.formatReal(_.round(_.sum(_.map(this.state.lics, d => d.valor_f))))}</span>
            }
        ]
        return (
        <div className="Licitacoes">
            <Panel header={breadcrumb}>
                <FormGroup controlId="periodo_assinatura" className="col-sm-3">
                    <ControlLabel>Período</ControlLabel>
                    <FormControl
                        onChange={this.handleChangeFiltro}
                        value={this.state.filtro.periodo_assinatura || ''}
                        componentClass="select">
                        <option value={2017.1}>2017 - 1° Trimestre</option>
                        <option value={2016.4}>2016 - 4° Trimestre</option>
                        <option value={2016.3}>2016 - 3° Trimestre</option>
                        <option value={2016.2}>2016 - 2° Trimestre</option>
                        <option value={2016.1}>2016 - 1° Trimestre</option>
                    </FormControl>
                </FormGroup>
                <FormGroup controlId="orgao" className="col-sm-3">
                    <ControlLabel>Orgão</ControlLabel>
                    <FormControl
                        onChange={this.handleChangeFiltro}
                        value={this.state.filtro.orgao || ''}
                        componentClass="select">
                        {this.listOrgaos()}
                    </FormControl>
                </FormGroup>
                <FormGroup controlId="evento" className="col-sm-3">
                    <ControlLabel>Evento</ControlLabel>
                    <FormControl
                        onChange={this.handleChangeFiltro}
                        value={this.state.filtro.evento || ''}
                        componentClass="select">
                        <option value="">----</option>
                        <option value="ACORDO DE COOPERAÇÃO">ACORDO DE COOPERAÇÃO</option>
                        <option value="ADITAMENTO">ADITAMENTO</option>
                        <option value="COMPRA">COMPRA</option>
                        <option value="CONVÊNIO">CONVÊNIO</option>
                        <option value="NOTA DE EMPENHO">NOTA DE EMPENHO</option>
                        <option value="REGISTRO DE PREÇO">REGISTRO DE PREÇO</option>
                        <option value="TERMO DE COLABORAÇÃO">TERMO DE COLABORAÇÃO</option>
                    </FormControl>
                </FormGroup>
                <FormGroup className="Suspeito col-sm-3">
                    <ControlLabel>Tem Suspeita?</ControlLabel>
                    <Checkbox
                        name="suspeito"
                        onChange={this.handleChangeFiltro}
                        value={this.state.filtro.suspeito}/>
                </FormGroup>
                <FormGroup className="col-sm-3">
                    <LoaderButton
                            bsStyle="primary"
                            isLoading={this.state.isLoading}
                            disabled={ ! this.validateFiltro() }
                            text="Consultar"
                            loadingText="Consultando…"
                            onClick={this.handleFiltrar.bind(this)}
                            style={{marginRight: "20px", marginBottom: "0px",width: "140px"}}>
                    </LoaderButton>
                </FormGroup>
            </Panel>
            {this.state.lics && (
                <Panel className="Resultados" header={this.state.lics ? 'Resultado: ' + this.state.lics.length : 'Consultando...'}>
                    <ReactTable
                        className="-striped -highlight"
                        defaultPageSize={20}
                        defaultSorted={[{
                            id: 'contrato_id',
                            desc: true
                        }]}
                        defaultFilterMethod={(filter, row) => (String(row[filter.id]) === filter.value)}
                        {...this.state.tableOptions}
                        loading={this.state.isLoading}
                        noDataText="Não encontrado"
                        previousText= "Anterior"
                        nextText= "Próxima"
                        loadingText= "Carregando..."
                        pageText= "Página"
                        ofText= "de"
                        rowsText= "registros"
                        data={this.state.lics}
                        columns={columns}
                        getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick: this.handleRowClick.bind(this, rowInfo)
                        }
                      }}
                    />
                </Panel>
            )}
        </div>
        );
    }
}
export default withRouter(Licitacoes);
