import React from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncComponent from './components/AsyncComponent';
import AppliedRoute from './components/AppliedRoute';
import Platform from './containers/Platform';

const importHome = () => import('./containers/Home');
const importLicitacoes = () => import('./containers/Licitacoes');
const importLicitacao = () => import('./containers/Licitacao');
const importNotFound = () => import('./containers/NotFound');

export default ({ childProps }) => (
    <Switch>
        <Platform>
                <Switch>
                    <AppliedRoute path="/" exact component={asyncComponent(importHome)} props={childProps} />
                    <AppliedRoute path="/licitacoes" exact component={asyncComponent(importLicitacoes)}/>
                    <AppliedRoute path="/licitacoes/:id" exact component={asyncComponent(importLicitacao)}/>
                    <Route component={asyncComponent(importNotFound)} />
                </Switch>
        </Platform>

        { /* Finally, catch all unmatched routes */ }
        <Route component={asyncComponent(importNotFound)} />
    </Switch>
);
