import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Panel, Breadcrumb } from 'react-bootstrap';
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
            lics: [],
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
            }
        };
    }
    async componentDidMount() {
        this.setState({ isLoading: true });
        try {
            const results = await this.getRecords();
            for (var i in results){
                if (results[i].contract_id) {
                    results[i].contract_id = parseInt(results[i].contract_id, 10);
                }
            }
            this.setState({ lics: results });
        }
        catch(e) {
            alert(e);
        }
        this.setState({ isLoading: false });
    }
    getRecords() {
        return invokeApig({ path: '/contracts' }, null);
    }
    handleNavLink = (event) => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute('href'));
    }
    handleRowClick = (rowInfo, event) => {
        event.preventDefault();
        this.props.history.push('/licitacoes/' + rowInfo.row.contract_id);
    }
    formatDinheiro(n) {
        var aux = String(this.formatFloat(n)).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, "$1.")
        return aux;
    }
    formatFloat(n) {
        return parseFloat(n.replace(/\./g,'').replace(/,/g,'.')).toFixed(2)
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
                id: 'contract_id',
                accessor: d => d.contract_id,
                maxWidth: 50,

            }, {
                Header: 'Orgão',
                id: 'Orgao',
                accessor: d => d.Orgao,
                filterMethod: (filter, row) => (row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase()))
            }, {
                Header: 'Fornecedor',
                id: 'Fornecedor',
                accessor: d => d.Fornecedor,
                filterMethod: (filter, row) => (row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase()))
            }, {
                Header: 'Objeto',
                id: 'objeto',
                minWidth: 200,
                accessor: d => d.objeto,
                filterMethod: (filter, row) => (row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase()))
            }, {
                Header: 'Data Assinatura',
                id: 'DataAssinaturaExtrato',
                accessor: d => d.DataAssinaturaExtrato,
                filterMethod: (filter, row) => (row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase()))
            }, {
                Header: 'Validade',
                id: 'ValidadeExtrato',
                accessor: d => (d.ValidadeExtrato ? d.ValidadeExtrato.replace('.0','') : null) + ' ' +  (d.TipoValidadeExtrato),
                filterMethod: (filter, row) => (row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase()))
            }, {
                Header: 'Valor (R$)',
                id: 'ValorContrato',
                accessor: d => this.formatDinheiro(d.ValorContrato),
                filterMethod: (filter, row) => (row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())),
                Footer: <span><strong>Média:</strong> {_.round(_.mean(_.map(this.state.lics, d => this.formatFloat(d.ValorContrato))))}</span>
            }
        ]
        return (
        <div className="lics">
            <Panel header={breadcrumb}>
                {this.state.lics && (
                <ReactTable
                    className="-striped -highlight"
                    defaultPageSize={20}
                    defaultSorted={[{
                        id: 'contract_id',
                        desc: true
                    }]}
                    defaultFilterMethod={(filter, row) => (String(row[filter.id]) === filter.value)}
                    {...this.state.tableOptions}
                    loading={this.state.isLoading}
                    noDataText="Não encontrado"
                    data={this.state.lics}
                    columns={columns}
                    getTdProps={(state, rowInfo, column, instance) => {
                    return {
                        onClick: this.handleRowClick.bind(this, rowInfo)
                    }
                  }}
                />
                )}
            </Panel>
        </div>
        );
    }
}
export default withRouter(Licitacoes);
