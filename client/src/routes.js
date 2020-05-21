import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Main from './components/Main'
import Search from './components/Search'
import ScrollToTop from './components/ScrollTop'

export default props => (
    <HashRouter>
        <ScrollToTop>
            <Switch>
                <Route exact path='/' component={Main} />
                <Route exact path='/search' component={Search} />
            </Switch>
        </ScrollToTop>
    </HashRouter>
)