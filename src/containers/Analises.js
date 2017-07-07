import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Panel} from 'react-bootstrap';
import { invokeApig } from '../libs/awsLib';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import './Analises.css'
import screaming_emoji from '../assets/img/screaming_emoji.png';

class Analises extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            suspeitometro: 3839109615.6399965,
            activeIndex: 0
        };
    }
    async componentDidMount() {
        this.setState({ isLoading: true });
        try {
            const o_mais_suspeitos = await this.getRecords({table:'orgaos',limit:5,type:'o_mais_suspeitos'});
            const o_piores = await this.getRecords({table:'orgaos',limit:5,type:'o_piores'});
            const f_mais_suspeitos = await this.getRecords({table:'fornecedores',limit:5,type:'f_mais_suspeitos'});
            this.setState({ o_mais_suspeitos: o_mais_suspeitos, o_piores: o_piores, f_mais_suspeitos: f_mais_suspeitos });
        }
        catch(e) {
            console.log(e);
        }
        this.setState({ isLoading: false });
    }
    getRecords(query) {
        return invokeApig({
            path: "/" + query.table,
            method: 'POST',
            body: query,
        }, null);
    }
    handleNavLink = (event) => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute('href'));
    }
    formatReal(n){
        return n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, "$1.");
    }
    OrgaosMaisSuspeitos(){
        var data = [];
        for (var i in this.state.o_mais_suspeitos){
            var orgao = this.state.o_mais_suspeitos[i];
            data.push({
                name: orgao.nome.substring(0,17),
                "Licitações Suspeitas": orgao.susp_s,
                "Valores Suspeitos (em milhões R$)": (parseInt(orgao.susp_v / 1000000, 10)),
            });
        }
        return (
            <BarChart width={900} height={300} data={data}
                margin={{top: 10, right: 0, left: 0, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis yAxisId="left" orientation="left" stroke="#82ca9d"/>
                <YAxis yAxisId="right" orientation="right" stroke="#8884d8"/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Bar yAxisId="left" dataKey="Licitações Suspeitas" fill="#82ca9d" minPointSize={5}/>
                <Bar yAxisId="right" dataKey="Valores Suspeitos (em milhões R$)" fill="#8884d8" minPointSize={10}/>
            </BarChart>
        );
    }
    OrgaosPiorQualidade(){
        var data = [];
        for (var i in this.state.o_piores){
            var orgao = this.state.o_piores[i];
            data.push({
                name: orgao.nome.substring(0,20),
                susp_s: orgao.susp_s,
                adits: orgao.adits
            });
        }
        return (
            <div>
                <RadarChart cx={350} cy={165} outerRadius={150} width={700} height={320} data={data}>
                    <Radar name="Aditivos" dataKey="adits" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis/>
                </RadarChart>
            </div>
        );
    }
    FornecedoresMaisSuspeitos(){
        var data = [];
        for (var i in this.state.f_mais_suspeitos){
            var fornecedor = this.state.f_mais_suspeitos[i];
            data.push({
                name: fornecedor.nome.substring(0,17),
                "Valores Suspeitos (em milhões R$)": (parseInt(fornecedor.susp_v / 1000000, 10)),
                "Licitações Suspeitas": fornecedor.susp_s,
            });
        }
        return (
            <BarChart width={900} height={300} data={data}
                margin={{top: 10, right: 0, left: 0, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis yAxisId="left" orientation="left" stroke="#82ca9d"/>
                <YAxis yAxisId="right" orientation="right" stroke="#8884d8"/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Bar yAxisId="left" dataKey="Valores Suspeitos (em milhões R$)" fill="#82ca9d" minPointSize={10}/>
                <Bar yAxisId="right" dataKey="Licitações Suspeitas" fill="#8884d8" minPointSize={5}/>
            </BarChart>
        );
    }
    onPieEnter(data, index) {
        this.setState({activeIndex: index,})
    }
    render() {
        return (
            <div className="Analises">
                <Panel>
                    <div className="col-xs-12">
                        <p>
                            Bem vindo ao <b>Suspeitando</b>, aqui realizamos análises dos dados disponíveis
                            pelo portal da transparência do município de São Paulo com o intuito de investigar
                            contratos de licitações fechados com diversos fornecedores. Durante a investigação
                            as suspeitas que temos vão desde contratos superfaturados a má qualidade na definição
                            das licitações e serviços prestados.
                        </p>
                        <p>
                            Este iniciativa é <b>aberta</b>, códigos e análises são open-source e estão disponíveis
                            no <a href="https://github.com/rafapetter/suspeitando" rel="noopener noreferrer" target="_blank">GitHub</a>.
                            Queremos que outras pessoas no Brasil, independente da região ou município,
                            possam fazer parte dessa iniciativa. Existem várias suspeitas sobre a forma como a
                            administração dos municípios é conduzida, e os valores são grandes o suficiente para
                            afetar a vida de boa parte da população.
                        </p>
                        <p>
                            Por enquanto as análises são referentes aos contratos mais recentes, 2016 e 2017. Estaremos
                            acrescentando mais análises em breve. Se quiser falar conosco, envie email para
                            <b> opa@suspeitando.com</b>
                        </p>
                    </div>
                </Panel>
                <Panel className="Resultados" header={'Suspeitômetro'}>
                    <div className="col-xs-12">
                        <div className="col-xs-10">
                            <span className="Currency">R$</span>
                            <span className="Timer">{this.state.suspeitometro ? this.formatReal(this.state.suspeitometro) : null}</span>
                        </div>
                        <div className="col-xs-2">
                            <img className="Emoji" src={screaming_emoji} alt="OMG"/>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <p>
                            São aproximadamente R$ 3,8 bilhões referente apenas a soma do <b> valor adicional suspeito </b>
                            de todos os contratos suspeitos que encontramos no período entre 2016 e 2017.
                        </p>
                        <p>
                            A definição de "<b>suspeito</b>" aqui é: contratos onde o valor é 20% acima de outros contratos que tinham
                            no mínimo 95% de similaridade. E a definição de "<b>similaridade</b>" foi feita através de um modelo de
                            inteligência artificial, que identifica similaridade semântica na descrição do Objeto do contrato,
                            e do valor médio por dia baseado no período de vigência do contrato. Todos os valores comparados em
                            datas diferentes foram ajustados considerando um taxa de inflação de 15% ao ano.

                        </p>
                    </div>
                </Panel>
                <Panel className="Resultados" header={'Orgãos Mais Suspeitos (2016 e 2017)'}>
                    <span>{this.state.isLoading ? 'Carregando...' : null}</span>
                    {this.OrgaosMaisSuspeitos()}
                </Panel>
                <Panel className="Resultados" header={'Orgãos com Mais Aditivos (2016 e 2017)'}>
                    <span>{this.state.isLoading ? 'Carregando...' : null}</span>
                    {this.OrgaosPiorQualidade()}
                </Panel>
                <Panel className="Resultados" header={'Fornecedores Mais Suspeitos (2016 e 2017)'}>
                    <span>{this.state.isLoading ? 'Carregando...' : null}</span>
                    {this.FornecedoresMaisSuspeitos()}
                </Panel>
            </div>
        )
    }
}
export default withRouter(Analises);
