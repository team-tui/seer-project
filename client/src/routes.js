import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Main from './components/Main'
import Dashboard from './components/Dashboard'
import ScrollToTop from './components/ScrollTop'

export default props => (
    <HashRouter>
        <ScrollToTop>
            <Switch>
                <Route exact path='/' component={Main} />
                <Route exact path='/dashboard' component={Dashboard} />
            </Switch>
        </ScrollToTop>
    </HashRouter>
)