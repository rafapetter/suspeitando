import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Panel } from 'react-bootstrap';
import './Orgaos.css';
import { invokeApig } from '../libs/awsLib';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class Orgaos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orgaos: [],
            isLoading: false,
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
    async componentDidMount(){
        this.setState({ isLoading: true, orgaos: null });
        try {
            const results = await this.getRecords();
            this.setState({ orgaos: results });
        }
        catch(e) {
            console.log(e);
        }
        this.setState({ isLoading: false });
    }
    getRecords(query) {
        return invokeApig({
            path: '/orgaos',
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
        if (rowInfo) this.props.history.push('/orgaos/' + rowInfo.row.orgao_id);
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
        const columns = [
            {
                Header: 'ID',
                id: 'orgao_id',
                accessor: d => parseInt(d.orgao_id, 10),
                maxWidth: 50,
                sortMethod: (a, b) => {
                    return a - b;
                },
                show: false
            },{
                Header: 'Nome',
                id: 'nome',
                accessor: d => d.nome,
                filterMethod: (filter, row) => (row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase()))
            }, {
                Header: '# Licitações',
                id: 'lics',
                accessor: d => d.lics,
                sortMethod: (a, b) => {
                    return a - b;
                },
                maxWidth: 100,
            }, {
                Header: 'Adit.',
                id: 'adits',
                accessor: d => d.adits > 0 ? d.adits : null,
                sortMethod: (a, b) => {
                    return a - b;
                },
                maxWidth: 60,
            }, {
                Header: '% Adit.',
                id: 'adits_per',
                accessor: d => (d.lics > 0 && d.adits > 0) ? (((d.adits/d.lics) * 100).toFixed(2)) : null,
                sortMethod: (a, b) => {
                    return a - b;
                },
                Cell: row => (
                    <div>
                        {row.value ? row.value + '%' : null}
                    </div>
                ),
                maxWidth: 60,
            }, {
                Header: 'Última Licitação',
                id: 'ultimo_lic',
                accessor: d => d.ultimo_lic,
                sortMethod: (a, b) => {
                    return a - b;
                },
                Cell: row => (
                    <div>
                        {row.value ? this.GetFormattedDate(new Date(row.value)) : null}
                    </div>
                )
            }, {
                Header: 'Valor Total (R$)',
                id: 'valor_total',
                accessor: d => d.valor_total ? d.valor_total : null,
                sortMethod: (a, b) => {
                    return a - b;
                },
                Cell: row => (
                    <div>
                        {row.value ? this.formatReal(row.value) : null}
                    </div>
                )
            }, {
                Header: 'Suspeitas',
                id: 'susp_s',
                accessor: d => d.susp_s ? parseInt(d.susp_s, 10) : null,
                sortMethod: (a, b) => {
                    return a - b;
                }
            }, {
                Header: 'Valor Suspeito (R$)',
                id: 'susp_v',
                accessor: d => d.susp_v ? d.susp_v : null,
                sortMethod: (a, b) => {
                    return a - b;
                },
                Cell: row => (
                    <div>
                        {row.value ? this.formatReal(row.value) : null}
                    </div>
                )
            }, {
                Header: '% Suspeito',
                id: 'susp_perc',
                accessor: d => d.susp_v ? (((d.susp_v/d.valor_total) * 100).toFixed(2)) : null,
                sortMethod: (a, b) => {
                    return a - b;
                },
                Cell: row => (
                    <div>
                        {row.value ? row.value + '%' : null}
                    </div>
                )
            }
        ]
        return (
        <div className="Orgaos">
            <Panel className="Resultados" header={this.state.orgaos ? 'Resultado: ' + this.state.orgaos.length + ' orgãos' : 'Consultando...'}>
                {this.state.orgaos && (
                    <ReactTable
                        className="-striped -highlight"
                        defaultPageSize={20}
                        defaultSorted={[{
                            id: 'nome',
                            desc: false
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
                        data={this.state.orgaos}
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
export default withRouter(Orgaos);
