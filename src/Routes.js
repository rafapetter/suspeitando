import React from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncComponent from './components/AsyncComponent';
import AppliedRoute from './components/AppliedRoute';
import Platform from './containers/Platform';

const importHome = () => import('./containers/Home');
const importAnalises = () => import('./containers/Analises');
const importLicitacoes = () => import('./containers/Licitacoes');
const importLicitacao = () => import('./containers/Licitacao');
const importFornecedores = () => import('./containers/Fornecedores');
const importFornecedor = () => import('./containers/Fornecedor');
const importOrgaos = () => import('./containers/Orgaos');
const importOrgao = () => import('./containers/Orgao');
const importEquipe = () => import('./containers/Equipe');
const importNotFound = () => import('./containers/NotFound');

export default ({ childProps }) => (
    <Switch>
        <Platform>
                <Switch>
                    <AppliedRoute path="/" exact component={asyncComponent(importHome)} props={childProps} />
                    <AppliedRoute path="/analises" exact component={asyncComponent(importAnalises)}/>
                    <AppliedRoute path="/licitacoes/:id" exact component={asyncComponent(importLicitacao)}/>
                    <AppliedRoute path="/licitacoes" exact component={asyncComponent(importLicitacoes)}/>
                    <AppliedRoute path="/fornecedores/:id" exact component={asyncComponent(importFornecedor)}/>
                    <AppliedRoute path="/fornecedores" exact component={asyncComponent(importFornecedores)}/>
                    <AppliedRoute path="/orgaos/:id" exact component={asyncComponent(importOrgao)}/>
                    <AppliedRoute path="/orgaos" exact component={asyncComponent(importOrgaos)}/>
                    <AppliedRoute path="/equipe" exact component={asyncComponent(importEquipe)}/>
                    <Route component={asyncComponent(importNotFound)} />
                </Switch>
        </Platform>

        { /* Finally, catch all unmatched routes */ }
        <Route component={asyncComponent(importNotFound)} />
    </Switch>
);
